import type {
  PublicTradeItem,
  TradeFilterState,
  TradeItem,
  TradeSettings,
} from "@/lib/trade/types";
import { toPublicTradeItem } from "@/lib/trade/format";

export function getUniqueBrands(items: TradeItem[]): string[] {
  return [...new Set(items.map((item) => item.brand).filter(Boolean))].sort(
    (a, b) => a.localeCompare(b),
  );
}

export function filterAndSortTradeItems(
  items: TradeItem[],
  settings: TradeSettings,
  filters: TradeFilterState,
): PublicTradeItem[] {
  const query = filters.query.trim().toLowerCase();

  let result = items.map((item) => toPublicTradeItem(item, settings));

  if (query) {
    result = result.filter((item) => {
      const haystack = [
        item.name,
        item.brand,
        item.category,
        item.model,
        item.storage,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }

  if (filters.category && filters.category !== "all") {
    result = result.filter((item) => item.category === filters.category);
  }

  if (filters.brand && filters.brand !== "all") {
    result = result.filter((item) => item.brand === filters.brand);
  }

  if (filters.workingFilter === "working-only") {
    result = result.filter((item) => !item.acceptsNonworking);
  } else if (filters.workingFilter === "accepts-nonworking") {
    result = result.filter((item) => item.acceptsNonworking);
  }

  result = [...result].sort((a, b) => {
    switch (filters.sort) {
      case "cash-desc":
        return b.displayCashCents - a.displayCashCents;
      case "credit-desc":
        return b.displayStoreCreditCents - a.displayStoreCreditCents;
      case "updated-desc":
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      case "name-asc":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return result;
}
