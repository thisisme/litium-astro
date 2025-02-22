export interface Image {
  url: string;
  dimension: {
    height?: number;
    width?: number;
    sizes?: string;
  }
  alt?: string;
}