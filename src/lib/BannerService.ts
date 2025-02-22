import type { BannerType } from "../components/Blocks/BannerBlock.astro";

export function getBannerUrl(banner: BannerType) {
  return banner.bannerLinkToCategory?.[0]?.item?.url ??
    banner.bannerLinkToPage?.[0]?.item?.url ??
    banner.bannerLinkToProduct?.[0]?.item?.url;
}