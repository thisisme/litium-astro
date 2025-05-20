import type { ContentFieldType } from "./content";
import type { PointerMediaImageItem } from "./pointers";

export interface BlocksType {
  [key: string]: Block[];
}

export interface Block {
  __typename: string;
  fields: ContentFieldType;
  systemId: string;
  children?: Block[];

  /**
   * Flag to indicate if block gets high priority and preload.
   * The purpose is to set its images high priority and preload.
   * Block implementation should pass it to Images that should preload.
   */
  priority?: boolean;
}

export interface BannerType {
  linkText: string;
  actionText: string;
  blockImagePointer?: PointerMediaImageItem;
  bannerLinkToCategory?: any[];
  bannerLinkToPage?: any[];
  bannerLinkToProduct?: any[];
}

export interface BannerField extends ContentFieldType {
  banners: BannerType[];
}
