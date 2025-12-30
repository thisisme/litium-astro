import { defineMiddleware } from "astro:middleware";
import { executeQuery } from "./lib/api-client";

async function contentChecker(url: string) {
  const response = executeQuery(url, `
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
  const response = await contentChecker(`${context.url.href}`);
  const data = await response.json();
  if (data) {
    if (data.errors) {
      if (context.routePattern !== '/error') {
        context.locals.errors = data.errors;
        return next("/error")
      }
    }
    context.locals.url = context.url.href;
    if (data.data) {
      console.debug("Redirect to template", data.data.content.__typename);
      return next(new Request(`${import.meta.env.RUNTIME_LITIUM_SERVER_URL}/${data.data.content.__typename}`, {
        headers: {
          "x-redirect-to": context.url.pathname
        }
      }));
    }
  }

  return next();
})
