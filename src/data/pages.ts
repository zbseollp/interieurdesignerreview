export interface PageData {
  slug: string;
  title: string;
  description: string;
  featuredImage: string;
  content: string;
  type: 'article' | 'product' | 'category' | 'page';
  url: string;
}

import pagesJson from './pages.json';
import slugsJson from './slugs.json';

export const pages = pagesJson as Record<string, PageData>;
export const allSiteSlugs = slugsJson as string[];

export function getPage(slug: string): PageData | undefined {
  return pages[slug];
}
