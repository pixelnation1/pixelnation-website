export const CONDITIONS = {
  Game: ["Loose", "Complete in box", "Factory sealed", "Damaged / untested"],
  Console: ["Working", "Powers on, HDMI damage", "Other fault / untested"],
  Accessory: ["Working", "Damaged / untested"],
} as const;

export type Category = keyof typeof CONDITIONS;
export type CatalogEntry = {
  id: string;
  category: Category;
  title: string;
  platform: string;
  edition: string;
  upc: string;
  condition: string;
  offer_cents: number;
  active: boolean;
};

export type QuoteItem = {
  category: Category;
  description: string;
  condition: string;
  estimate: number | null;
};

export type Quote = {
  token: string;
  created_at: string;
  name: string;
  email: string;
  items: QuoteItem[];
  notes: string;
  status: "Submitted" | "Received" | "Offer ready" | "Accepted" | "Declined" | "Paid";
  final_cents: number | null;
  offer_reason: string | null;
};

export const formatOffer = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

export const fieldClass = "w-full rounded-lg border border-white/20 bg-surface px-3 py-2 text-foreground";
export const buttonClass = "rounded-lg bg-accent px-4 py-2 font-semibold text-black hover:brightness-110 disabled:opacity-50";
export const panelClass = "rounded-xl border border-white/15 bg-surface p-5";

export type Resale = {
  quote_token: string;
  item_index: number;
  buy_cents: number;
  prep_cents: number;
  ebay_item_id: string | null;
  net_cents: number | null;
  sold_on: string | null;
};
