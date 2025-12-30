import { graphql } from "graphql";

const PageQuery = graphql(`
  query Page($path: String!) {
    route(path: $path) {
      item {
        __typename
        ... on Product {
          id
          name {
            value
          }
        }
        ... on Category {
          id
          name {
            value
          }
        }
      }
    }
  }
`);

export async function fetchPage(slug: string | undefined) {
  const path = slug ? `/${slug}` : "/";
  const API_URL = import.meta.env.LITIUM_GRAPHQL_URL;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query: PageQuery,
      variable: { path },
    }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error(result.errors);
    return null;
  }

  return result.data?.route?.item;
}
