import { requireTradeAdmin } from "@/lib/trade/auth";
import { slugify } from "@/lib/trade/format";
import {
  getTradeSnapshot,
  replaceAllTradeItems,
  upsertTradeItem,
} from "@/lib/trade/store";
import type { TradeItem } from "@/lib/trade/types";

function sanitizeImageUrl(value?: string | null): string {
  const trimmed = value?.trim() || "";
  if (!trimmed || trimmed.includes("pixellogo")) return "";
  if (trimmed.startsWith("/images/")) {
    if (!/\.(webp|png|jpe?g|avif|svg)$/i.test(trimmed)) return "";
    return trimmed;
  }
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:") return "";
    if (!/\.(webp|png|jpe?g|avif)$/i.test(url.pathname)) return "";
    return url.toString();
  } catch {
    return "";
  }
}

export async function GET() {
  if (!(await requireTradeAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const snapshot = await getTradeSnapshot();
  return Response.json(snapshot);
}

export async function POST(request: Request) {
  if (!(await requireTradeAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<TradeItem> & { action?: string; ids?: string[] };
  try {
    body = (await request.json()) as Partial<TradeItem> & {
      action?: string;
      ids?: string[];
    };
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { items } = await getTradeSnapshot();
  const now = new Date().toISOString();

  if (body.action === "bulk-archive" || body.action === "bulk-activate") {
    const ids = new Set(body.ids || []);
    const next = items.map((item) =>
      ids.has(item.id)
        ? {
            ...item,
            active: body.action === "bulk-activate",
            updatedAt: now,
          }
        : item,
    );
    await replaceAllTradeItems(next);
    return Response.json({ ok: true, items: next });
  }

  if (!body.name?.trim()) {
    return Response.json({ error: "Product name is required." }, { status: 400 });
  }

  const item: TradeItem = {
    id: body.id?.trim() || `item-${Date.now()}`,
    slug: body.slug?.trim() || slugify(body.name),
    name: body.name.trim(),
    brand: body.brand?.trim() || "Unknown",
    category: body.category?.trim() || "Other Electronics",
    model: body.model?.trim() || "",
    storage: body.storage?.trim() || "",
    imageUrl: sanitizeImageUrl(body.imageUrl),
    cashValueCents: Number(body.cashValueCents) || 0,
    storeCreditValueCents:
      body.storeCreditValueCents == null ? null : Number(body.storeCreditValueCents),
    requiredAccessories: body.requiredAccessories?.trim() || "",
    conditionNote:
      body.conditionNote?.trim() ||
      "Fully functional and in good cosmetic condition",
    acceptsNonworking: Boolean(body.acceptsNonworking),
    nonworkingNote:
      body.nonworkingNote?.trim() ||
      "PixelNation may still make an offer after inspection.",
    featured: Boolean(body.featured),
    active: body.active !== false,
    sortOrder: Number(body.sortOrder) || 100,
    isSample: Boolean(body.isSample),
    repairHref: body.repairHref?.trim() || null,
    internalNotes: body.internalNotes?.trim() || "",
    createdAt: body.createdAt || now,
    updatedAt: now,
  };

  const next = await upsertTradeItem(item);
  return Response.json({ ok: true, item, items: next });
}
