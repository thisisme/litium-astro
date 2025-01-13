import { defineMiddleware, sequence } from "astro:middleware";
import { query } from "./lib/ApiClient";

async function contentChecker() {
  const response = query("https://localhost:3001", `
    query MiddlewareGetContent {
      channel {
        ...Id
      }
      content {
        __typename
        ...Id
        ... on Redirect {
          location
        }
  
        ... on AuthorizationError {
          query {
            channel {
              ... on DefaultChannelFieldTemplateChannel {
                id
                website {
                  ... on AcceleratorWebsiteWebsite {
                    id
                    fields {
                      loginPage {
                        item {
                          id
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
  
        ... on ForbiddenError {
          query {
            channel {
              ... on DefaultChannelFieldTemplateChannel {
                id
                website {
                  ... on AcceleratorWebsiteWebsite {
                    id
                    fields {
                      forbiddenPage {
                        item {
                          id
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
  
        ... on NotFoundError {
          query {
            channel {
              ... on DefaultChannelFieldTemplateChannel {
                id
                website {
                  ... on AcceleratorWebsiteWebsite {
                    id
                    fields {
                      pageNotFound {
                        item {
                          id
                          url
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
    }
    fragment Id on Node {
      id
    }
  `);
    return response;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await contentChecker();
  const data = await response.json();
  if (data) {
    return next(new Request(`https://localhost:3001/${data.data.content.__typename}`, {
      headers: {
        "x-redirect-to": context.url.pathname
      }
    }));
  }

  return next();
})
