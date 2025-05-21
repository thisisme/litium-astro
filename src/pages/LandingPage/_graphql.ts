export const query = `
  query GetLandingPage {
    content {
      ... on LandingPage {
        ...Metadata
        id
        blocks {
          main {
            ...AllBlockTypes
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
	fragment AllBlockTypes on IBlock {
    __typename
    ... on IBlockItem {
      systemId
    }

    ...BannerBlock
    ...ProductsBlock
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
	fragment ProductsBlock on ProductsBlock {
    fields {
      title
      numberOfProducts
      sorting {
        value
      }
      category {
        id
      }
      productList {
        id
      }
    }
  }
`;
