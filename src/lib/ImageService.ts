import type { Image } from "../models/Image";

export function getAbsoluteImageUrl(
  image: Image | null,
  baseUrl?: string
): string {
  if (!image?.url) {
    return '';
  }
  const base = baseUrl ?? (import.meta.env.RUNTIME_IMAGE_SERVER_URL || import.meta.env.RUNTIME_LITIUM_SERVER_URL);

  return new URL(image.url, base).href;
}
