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
