export async function executeQuery(context: string, query: string) {
  const url = new URL('/storefront.graphql', import.meta.env.RUNTIME_LITIUM_SERVER_URL).href;
  const response = await fetch(
    url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-litium-storefront-context-url": context
      },
      body: JSON.stringify({
        query
      })
    }
  )

  return await response;
}