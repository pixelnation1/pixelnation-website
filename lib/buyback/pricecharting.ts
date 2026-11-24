import "server-only";

const priceFields = {
  Loose: ["loose-price", "retail-loose-buy"],
  "Complete in box": ["cib-price", "retail-cib-buy"],
  "Factory sealed": ["new-price", "retail-new-buy"],
} as const;

function parsePrice(value: unknown): number | null {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? value : null;
}

export async function lookupPriceCharting(identifier: string, kind: "upc" | "id") {
  const token = process.env.PRICECHARTING_API_TOKEN?.trim();
  if (!token) return { error: "Add a PriceCharting API token to enable live lookup." };

  const url = new URL("https://www.pricecharting.com/api/product");
  url.searchParams.set("t", token);
  url.searchParams.set(kind, identifier);
  try {
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!response.ok) return { error: "PriceCharting is unavailable. Try again or check your API subscription." };
    const data = await response.json();
    if (data?.status !== "success" || typeof data["product-name"] !== "string" || typeof data["console-name"] !== "string") {
      return { error: "No price guide match. Check the UPC or use the exact PriceCharting product ID." };
    }

    return {
      title: data["product-name"] as string,
      platform: data["console-name"] as string,
      prices: Object.entries(priceFields).map(([condition, [market, buy]]) => ({
        condition,
        market: parsePrice(data[market]),
        buy: parsePrice(data[buy]),
      })),
    };
  } catch {
    return { error: "PriceCharting did not respond. Try again shortly." };
  }
}
