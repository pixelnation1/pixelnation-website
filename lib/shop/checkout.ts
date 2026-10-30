import 'server-only';

export type BuyingOption = { label: string; url: string; detail: string };
// Only verified Square-hosted checkout links may be exposed. No arbitrary redirects.
export function safeSquareLink(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    if (!['square.link', 'checkout.square.site'].includes(url.hostname)) return null;
    return url.href;
  } catch { return null; }
}
export function getBuyingOptions(slug: string): BuyingOption[] {
  if (process.env.SQUARE_SHOP_ENABLED !== 'true') return [];
  try {
    const config = JSON.parse(process.env.SQUARE_SHOP_LINKS_JSON || '{}');
    const entry = config[slug];
    if (!entry || typeof entry !== 'object') return [];
    const options: BuyingOption[] = [];
    for (const [key, label, detail] of [
      ['readyShipping', 'Ship a ready-made box', 'Shipping cost and available stock are confirmed at Square checkout.'],
      ['readyPickup', 'Pick up a ready-made box', 'Please wait for your ready-for-pickup notification.'],
      ['madeShipping', 'Made to order · ship to me', 'Allow 3–5 days for production, plus shipping transit time.'],
      ['madePickup', 'Made to order · store pickup', 'Allow 3–5 days for production. We’ll notify you when it’s ready.'],
    ]) {
      const url = safeSquareLink(entry[key]);
      if (url) options.push({ label, detail, url });
    }
    return options;
  } catch { return []; }
}
