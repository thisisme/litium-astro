export async function query(context: string, query: string) {
  const response = await fetch(
    `${import.meta.env.RUNTIME_LITIUM_SERVER_URL}/storefront.graphql`, {
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