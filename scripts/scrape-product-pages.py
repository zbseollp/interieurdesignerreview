#!/usr/bin/env python3
"""Scrape live product pages from interieurdesignerreview.nl into Astro MDX."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from pathlib import Path

from bs4 import BeautifulSoup
from markdownify import markdownify as md

ROOT = Path(__file__).resolve().parents[1]
PAGES_DIR = ROOT / "src/content/pages"
PUBLIC_IMAGES = ROOT / "public/images"
DATA_DIR = ROOT / "src/data"
SITE_URL = "https://interieurdesignerreview.nl"
DEFAULT_IMAGE = "/images/2023/05/Koudschuim-matras.jpg"
PLACEHOLDER_SNIPPET = "Welkom op interieurdesignerreview.nl"

DUTCH_MONTHS = {
    "jan": 1,
    "feb": 2,
    "mrt": 3,
    "mar": 3,
    "apr": 4,
    "mei": 5,
    "jun": 6,
    "jul": 7,
    "aug": 8,
    "sep": 9,
    "okt": 10,
    "nov": 11,
    "dec": 12,
}

SKIP_WIDGETS = {
    "elementor-widget-table-of-contents",
    "elementor-widget-author-box",
    "elementor-widget-spacer",
    "elementor-widget-divider",
}


def yaml_quote(value: str) -> str:
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def upload_to_local(url: str) -> str:
    if not url:
        return url
    clean = url.split("?")[0]
    if "/wp-content/uploads/" in clean:
        rel = clean.split("/wp-content/uploads/", 1)[1]
        return f"/images/{rel}"
    return clean


def rewrite_urls(content: str) -> str:
    content = re.sub(
        rf"https?://(?:www\.)?interieurdesignerreview\.nl/wp-content/uploads/([^\s\"')]+)",
        r"/images/\1",
        content,
    )
    content = re.sub(
        rf"{re.escape(SITE_URL)}/(?P<slug>[a-z0-9\-_/]+)/?",
        r"/\g<slug>/",
        content,
    )
    return content


def download_image(url: str, dest: Path) -> bool:
    if dest.exists() and dest.stat().st_size > 0:
        return True
    dest.parent.mkdir(parents=True, exist_ok=True)
    result = subprocess.run(
        ["curl", "-sfL", "--max-time", "45", url, "-o", str(dest)],
        capture_output=True,
        text=True,
    )
    return result.returncode == 0 and dest.exists() and dest.stat().st_size > 0


def fetch_html(slug: str) -> str | None:
    url = f"{SITE_URL}/{slug}/"
    result = subprocess.run(
        ["curl", "-sfL", "--max-time", "60", url],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0 or not result.stdout.strip():
        return None
    return result.stdout


def parse_dutch_date(text: str) -> str | None:
    match = re.search(
        r"(\d{1,2})\s+([a-z]{3,4})\.?\s+(\d{4})",
        text,
        re.I,
    )
    if not match:
        return None
    day, month_name, year = match.groups()
    month = DUTCH_MONTHS.get(month_name.lower()[:3])
    if not month:
        return None
    return f"{year}-{month:02d}-{int(day):02d}"


def widget_type(widget) -> str | None:
    for cls in widget.get("class", []):
        if cls.startswith("elementor-widget-") and cls != "elementor-widget":
            return cls
    return None


def should_stop(widget) -> bool:
    wtype = widget_type(widget)
    if wtype in SKIP_WIDGETS:
        return True
    text = widget.get_text(" ", strip=True)
    if text.startswith("Inhoudsopgave"):
        return True
    if text.startswith("Wat zegt de interieurdesigner"):
        return True
    return False


def widget_to_html(widget) -> str:
    wtype = widget_type(widget) or ""

    if wtype == "elementor-widget-heading":
        heading = widget.find(re.compile(r"^h[1-6]$"))
        if heading:
            return str(heading)
        return ""

    if wtype == "elementor-widget-text-editor":
        editor = widget.find(class_="elementor-widget-container")
        return editor.decode_contents() if editor else widget.decode_contents()

    if wtype == "elementor-widget-button":
        link = widget.find("a", href=True)
        if not link:
            return ""
        href = rewrite_urls(link["href"])
        label = link.get_text(" ", strip=True)
        return f'<p><a href="{href}">{label}</a></p>'

    if wtype == "elementor-widget-image":
        img = widget.find("img", src=True)
        if not img:
            return ""
        src = rewrite_urls(img["src"])
        alt = img.get("alt", "")
        return f'<p><img src="{src}" alt="{alt}" /></p>'

    return ""


def extract_page(html: str) -> dict | None:
    soup = BeautifulSoup(html, "html.parser")
    wp_page = soup.find(attrs={"data-elementor-type": "wp-page"})
    if not wp_page:
        return None

    meta_desc = soup.find("meta", attrs={"name": "description"})
    og_image = soup.find("meta", property="og:image")
    description = meta_desc["content"].strip() if meta_desc and meta_desc.get("content") else ""
    featured_image = upload_to_local(og_image["content"]) if og_image and og_image.get("content") else DEFAULT_IMAGE

    widgets = wp_page.find_all(class_=re.compile(r"elementor-widget-(heading|text-editor|button|image)"))
    html_parts: list[str] = []
    page_title = ""
    updated_date: str | None = None
    skip_first_h1 = True

    for widget in widgets:
        if should_stop(widget):
            break

        wtype = widget_type(widget)
        if wtype == "elementor-widget-heading":
            heading = widget.find(re.compile(r"^h[1-6]$"))
            if heading:
                level = int(heading.name[1])
                text = heading.get_text(" ", strip=True)
                if level == 1:
                    if not page_title:
                        page_title = text
                    if skip_first_h1:
                        skip_first_h1 = False
                        continue
                html_parts.append(str(heading))
            continue

        if wtype == "elementor-widget-text-editor":
            text = widget.get_text(" ", strip=True)
            if text.lower().startswith("laatst bijgewerkt"):
                updated_date = parse_dutch_date(text)
                html_parts.append(f"<p><em>{text}</em></p>")
                continue
            if text.lower().startswith("gepubliceerd op"):
                continue

        chunk = widget_to_html(widget)
        if chunk.strip():
            html_parts.append(chunk)

    if not page_title:
        h1 = soup.find("h1")
        page_title = h1.get_text(" ", strip=True) if h1 else ""

    body_html = rewrite_urls("\n".join(html_parts))
    body_md = md(body_html, heading_style="ATX", bullets="-", strip=["script", "style"])
    body_md = re.sub(r"\n{3,}", "\n\n", body_md).strip()
    body_md = body_md.replace("{", "\\{").replace("}", "\\}")

    if not page_title or not body_md:
        return None

    return {
        "title": page_title,
        "description": description[:500],
        "featuredImage": featured_image,
        "updatedDate": updated_date,
        "content": body_md,
    }


def is_placeholder(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    return DEFAULT_IMAGE in text or PLACEHOLDER_SNIPPET in text


def write_mdx(slug: str, data: dict) -> None:
    lines = [
        "---",
        f"title: {yaml_quote(data['title'])}",
        f"description: {yaml_quote(data['description'])}",
        f"featuredImage: {yaml_quote(data['featuredImage'])}",
    ]
    if data.get("updatedDate"):
        lines.append(f"updatedDate: {yaml_quote(data['updatedDate'])}")
    lines.extend(["---", "", data["content"], ""])
    (PAGES_DIR / f"{slug}.mdx").write_text("\n".join(lines), encoding="utf-8")


def update_pages_json(slug: str, data: dict) -> None:
    pages_path = DATA_DIR / "pages.json"
    pages = json.loads(pages_path.read_text(encoding="utf-8"))
    if slug not in pages:
        return
    pages[slug].update(
        {
            "title": data["title"],
            "description": data["description"],
            "featuredImage": data["featuredImage"],
            "content": data["content"],
        }
    )
    pages_path.write_text(json.dumps(pages, indent=2, ensure_ascii=False), encoding="utf-8")


def collect_image_urls(content: str, featured: str) -> set[str]:
    urls: set[str] = set()
    if featured.startswith("/images/"):
        urls.add(f"{SITE_URL}/wp-content/uploads/{featured.removeprefix('/images/')}")
    for match in re.findall(r"/images/([^\s\"')]+)", content):
        urls.add(f"{SITE_URL}/wp-content/uploads/{match}")
    return urls


def download_images(urls: set[str]) -> int:
    jobs = []
    for url in sorted(urls):
        rel = url.split("/wp-content/uploads/", 1)[1]
        jobs.append((url, PUBLIC_IMAGES / rel))

    success = 0
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = {pool.submit(download_image, url, dest): url for url, dest in jobs}
        for future in as_completed(futures):
            if future.result():
                success += 1
    return success


def scrape_slug(slug: str) -> tuple[str, bool, str]:
    html = fetch_html(slug)
    if not html:
        return slug, False, "fetch failed"

    data = extract_page(html)
    if not data:
        return slug, False, "parse failed"

    write_mdx(slug, data)
    update_pages_json(slug, data)
    image_urls = collect_image_urls(data["content"], data["featuredImage"])
    downloaded = download_images(image_urls)
    return slug, True, f"{len(data['content'])} chars, {downloaded} images"


def main() -> int:
    parser = argparse.ArgumentParser(description="Scrape live product pages into MDX")
    parser.add_argument("--slug", help="Scrape a single slug")
    parser.add_argument("--all", action="store_true", help="Scrape all placeholder product pages")
    parser.add_argument("--delay", type=float, default=0.3, help="Delay between requests in seconds")
    args = parser.parse_args()

    if args.slug:
        slugs = [args.slug]
    elif args.all:
        pages = json.loads((DATA_DIR / "pages.json").read_text(encoding="utf-8"))
        slugs = sorted(
            slug
            for slug, meta in pages.items()
            if meta.get("type") == "product" and is_placeholder(PAGES_DIR / f"{slug}.mdx")
        )
    else:
        parser.error("Provide --slug or --all")

    print(f"Scraping {len(slugs)} page(s)...")
    ok = 0
    failed: list[str] = []

    for index, slug in enumerate(slugs, start=1):
        slug, success, message = scrape_slug(slug)
        status = "OK" if success else "FAIL"
        print(f"[{index}/{len(slugs)}] {status} {slug}: {message}")
        if success:
            ok += 1
        else:
            failed.append(slug)
        if index < len(slugs):
            time.sleep(args.delay)

    print(f"Done: {ok}/{len(slugs)} succeeded")
    if failed:
        print("Failed:", ", ".join(failed[:20]), ("..." if len(failed) > 20 else ""))
    return 0 if not failed else 1


if __name__ == "__main__":
    sys.exit(main())
