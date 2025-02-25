export const query = `
  query GetPrimaryNavigationContent {
    channel {
      ... on DefaultChannelFieldTemplateChannel {
        id
        website {
          ... on AcceleratorWebsiteWebsite {
            id
            blocks {
              footer {
                ... on FooterColumnBlock {
                  systemId
                  children {
                    ...NavigationLinksBlock
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

  fragment Image on IImageItem {
    dimension {
      height
      width
    }
    url
    alt
  }
`;