import type { PublicTradeItem, TradeItem, TradeSettings } from "@/lib/trade/types";

export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatTradeDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function resolveStoreCreditCents(
  item: Pick<TradeItem, "cashValueCents" | "storeCreditValueCents">,
  settings: TradeSettings,
): number {
  if (item.storeCreditValueCents != null) {
    return item.storeCreditValueCents;
  }
  return Math.round(item.cashValueCents * settings.storeCreditMultiplier);
}

export function toPublicTradeItem(
  item: TradeItem,
  settings: TradeSettings,
): PublicTradeItem {
  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    brand: item.brand,
    category: item.category,
    model: item.model,
    storage: item.storage,
    imageUrl: item.imageUrl,
    cashValueCents: item.cashValueCents,
    storeCreditValueCents: item.storeCreditValueCents,
    requiredAccessories: item.requiredAccessories,
    conditionNote: item.conditionNote,
    acceptsNonworking: item.acceptsNonworking,
    nonworkingNote: item.nonworkingNote,
    featured: item.featured,
    active: item.active,
    sortOrder: item.sortOrder,
    isSample: item.isSample,
    repairHref: item.repairHref,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    displayCashCents: item.cashValueCents,
    displayStoreCreditCents: resolveStoreCreditCents(item, settings),
  };
}

export function parseDollarsToCents(value: string | number): number {
  if (typeof value === "number") {
    return Math.round(value * 100);
  }
  const cleaned = value.replace(/[^0-9.]/g, "");
  if (!cleaned) return 0;
  return Math.round(Number.parseFloat(cleaned) * 100);
}
