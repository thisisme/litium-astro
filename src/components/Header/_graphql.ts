export const query = `
  query GetPrimaryNavigationContent {
    channel {
      ... on DefaultChannelFieldTemplateChannel {
        id
        website {
          ... on AcceleratorWebsiteWebsite {
            id
            blocks {
              primaryNavigation {
                ... on PrimaryNavigationLinkBlock {
                  systemId
                  fields {
                    navigationLink {
                      ...Link
                    }
                  }
                  children {
                    ... on PrimaryNavigationColumnBlock {
                      systemId
                      children {
                        ...NavigationLinksBlock
                        ...NavigationCategoryBlock
                        ...NavigationBannerBlock
                      }
                    }
                  }
                }
                ... on SecondaryNavigationLinkBlock {
                  systemId
                  fields {
                    navigationLink {
                      ...Link
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fragment Link on LinkFieldDefinition {
    url
    text
  }

  fragment NavigationLinksBlock on NavigationLinksBlock {
    systemId
    fields {
      navigationLinksHeader {
        ...Link
      }
      navigationLinks {
        navigationLink {
          ...Link
        }
      }
    }
  }

  fragment NavigationCategoryBlock on PrimaryNavigationCategoriesBlock {
    systemId
    fields {
      categoryLink {
        item {
          id
          url
          name
          children {
            nodes {
              name
              url
              id
            }
          }
        }
      }
    }
  }

  fragment NavigationBannerBlock on PrimaryNavigationBannerBlock {
    systemId
    fields {
      navigationLink {
        ...Link
      }
      blockImagePointer {
        item(max: { height: 350, width: 350 }) {
          ...Image
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