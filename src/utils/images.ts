/** Site-wide placeholder images that must not be used as page heroes or card art. */
const GENERIC_FEATURED_IMAGES = new Set([
  '/images/2023/05/Koudschuim-matras.jpg',
  '/images/2022/11/Frame3.png',
]);

export function isGenericFeaturedImage(image?: string | null): boolean {
  if (!image) return true;
  return GENERIC_FEATURED_IMAGES.has(image);
}

/** Returns a hero image only when it is a real, page-specific asset. */
export function resolveHeroImage(image?: string | null): string | undefined {
  if (!image || isGenericFeaturedImage(image)) return undefined;
  return image;
}

/** Returns a card/listing image only when it is a real, page-specific asset. */
export function resolveCardImage(image?: string | null): string | undefined {
  return resolveHeroImage(image);
}

/** First markdown or HTML image URL found in page body content. */
export function extractFirstContentImage(content?: string | null): string | undefined {
  if (!content) return undefined;

  const markdown = content.match(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/);
  if (markdown?.[1] && !isGenericFeaturedImage(markdown[1])) {
    return markdown[1];
  }

  const html = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (html?.[1] && !isGenericFeaturedImage(html[1])) {
    return html[1];
  }

  return undefined;
}

/** Prefer a real featured image; otherwise use the first product image in the body. */
export function resolvePageCardImage(
  featuredImage?: string | null,
  content?: string | null,
): string | undefined {
  return resolveCardImage(featuredImage) ?? extractFirstContentImage(content);
}
