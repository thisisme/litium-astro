import { defineMiddleware } from "astro:middleware";
import { executeQuery } from "./lib/ApiClient";

async function contentChecker() {
  const response = executeQuery("https://localhost:4321", `
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
    if (data.errors) {
      if (context.routePattern !== '/error') {
        context.locals.errors = data.errors;
        return next("/error")
      }
    }
    if (data.data) {
      return next(new Request(`${import.meta.env.RUNTIME_LITIUM_SERVER_URL}/${data.data.content.__typename}`, {
        headers: {
          "x-redirect-to": context.url.pathname
        }
      }));
    }
  }

  return next();
})
