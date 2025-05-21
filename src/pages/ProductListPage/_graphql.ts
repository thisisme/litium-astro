export const query = `
  query GetProductListPage {
    content {
      ... on ProductListPage {
        ...Metadata
        id
        name
        blocks {
          main {
            ...BannerBlock
          }
        }
        parents(reverse: true) {
          nodes {
            ... on ICategoryItem {
              name
              url
              id
            }
            ... on IPageItem {
              name
              url
              id
            }
          }
        }
        fields {
          productList {
            id
          }
        }
      }
    }
  }

  fragment Metadata on IContentItem {
    metadata {
      links {
        href
        attributes {
          name
          value
        }
      }
      tags {
        content
        name
      }
      title
    }
  }

  fragment BannerBlock on BannerBlock {
    fields {
      _name
      banners {
        linkText
        actionText
        blockImagePointer {
          item(max: { height: 800, width: 1600 }) {
            ...Image
          }
        }
        bannerLinkToCategory {
          item {
            url
            id
          }
        }
        bannerLinkToPage {
          item {
            url
            id
          }
        }
        bannerLinkToProduct {
          item {
            id
            ... on ProductWithVariantsProduct {
              url
            }
            ... on ProductWithVariantsListProduct {
              url
            }
            ... on ProductWithVariantsFurnitureProduct {
              url
            }
          }
        }
      }
    }
  }

  fragment Image on IImageItem {
    dimension {
      height
      width
    }
    url
    alt
  }
`;