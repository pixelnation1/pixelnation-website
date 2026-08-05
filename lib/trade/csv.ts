import { parseDollarsToCents, slugify } from "@/lib/trade/format";
import type { TradeItem } from "@/lib/trade/types";
import { TRADE_CATEGORIES } from "@/lib/trade/types";

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function tradeItemsToCsv(items: TradeItem[]): string {
  const headers = [
    "id",
    "slug",
    "name",
    "brand",
    "category",
    "model",
    "storage",
    "image_url",
    "cash_value_dollars",
    "store_credit_value_dollars",
    "required_accessories",
    "condition_note",
    "accepts_nonworking",
    "nonworking_note",
    "featured",
    "active",
    "sort_order",
    "is_sample",
    "repair_href",
    "internal_notes",
    "updated_at",
  ];

  const rows = items.map((item) =>
    [
      item.id,
      item.slug,
      item.name,
      item.brand,
      item.category,
      item.model,
      item.storage,
      item.imageUrl,
      (item.cashValueCents / 100).toFixed(2),
      item.storeCreditValueCents == null
        ? ""
        : (item.storeCreditValueCents / 100).toFixed(2),
      item.requiredAccessories,
      item.conditionNote,
      item.acceptsNonworking ? "true" : "false",
      item.nonworkingNote,
      item.featured ? "true" : "false",
      item.active ? "true" : "false",
      String(item.sortOrder),
      item.isSample ? "true" : "false",
      item.repairHref ?? "",
      item.internalNotes,
      item.updatedAt,
    ]
      .map((cell) => escapeCsv(String(cell)))
      .join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      cells.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current);
  return cells;
}

function truthy(value: string): boolean {
  return ["true", "1", "yes", "y"].includes(value.trim().toLowerCase());
}

export function csvToTradeItems(csv: string): TradeItem[] {
  const lines = csv
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0);

  if (lines.length < 2) {
    throw new Error("CSV must include a header row and at least one data row.");
  }

  const headers = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
  const now = new Date().toISOString();
  const items: TradeItem[] = [];

  for (let rowIndex = 1; rowIndex < lines.length; rowIndex += 1) {
    const cells = parseCsvLine(lines[rowIndex]);
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] ?? "";
    });

    const name = row.name?.trim();
    if (!name) continue;

    const category = row.category?.trim() || "Other Electronics";
    if (
      !TRADE_CATEGORIES.includes(category as (typeof TRADE_CATEGORIES)[number])
    ) {
      // Allow custom categories but prefer known list
    }

    const id =
      row.id?.trim() ||
      `imported-${slugify(name)}-${rowIndex}`;
    const slug = row.slug?.trim() || slugify(name);
    const cash = parseDollarsToCents(
      row.cash_value_dollars || row.cash_value || "0",
    );
    const creditRaw =
      row.store_credit_value_dollars || row.store_credit_value || "";
    const storeCredit =
      creditRaw.trim() === "" ? null : parseDollarsToCents(creditRaw);

    items.push({
      id,
      slug,
      name,
      brand: row.brand?.trim() || "Unknown",
      category,
      model: row.model?.trim() || "",
      storage: row.storage?.trim() || "",
      imageUrl: row.image_url?.trim() || "",
      cashValueCents: cash,
      storeCreditValueCents: storeCredit,
      requiredAccessories: row.required_accessories?.trim() || "",
      conditionNote:
        row.condition_note?.trim() ||
        "Fully functional and in good cosmetic condition",
      acceptsNonworking: truthy(row.accepts_nonworking || "true"),
      nonworkingNote:
        row.nonworking_note?.trim() ||
        "PixelNation may still make an offer after inspection.",
      featured: truthy(row.featured || "false"),
      active: row.active == null || row.active === "" ? true : truthy(row.active),
      sortOrder: Number.parseInt(row.sort_order || "100", 10) || 100,
      isSample: truthy(row.is_sample || "false"),
      repairHref: row.repair_href?.trim() || null,
      internalNotes: row.internal_notes?.trim() || "",
      createdAt: now,
      updatedAt: row.updated_at?.trim() || now,
    });
  }

  if (items.length === 0) {
    throw new Error("No valid trade items found in CSV.");
  }

  return items;
}
