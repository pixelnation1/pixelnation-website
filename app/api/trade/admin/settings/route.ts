import { requireTradeAdmin } from "@/lib/trade/auth";
import { readTradeSettings, writeTradeSettings } from "@/lib/trade/store";
import type { TradeSettings } from "@/lib/trade/types";

export async function GET() {
  if (!(await requireTradeAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = await readTradeSettings();
  return Response.json(settings);
}

export async function PUT(request: Request) {
  if (!(await requireTradeAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<TradeSettings>;
  try {
    body = (await request.json()) as Partial<TradeSettings>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const current = await readTradeSettings();
  const next: TradeSettings = {
    storeCreditMultiplier:
      typeof body.storeCreditMultiplier === "number" && body.storeCreditMultiplier > 0
        ? body.storeCreditMultiplier
        : current.storeCreditMultiplier,
    showSampleDataBanner:
      typeof body.showSampleDataBanner === "boolean"
        ? body.showSampleDataBanner
        : current.showSampleDataBanner,
    publishSampleItems:
      typeof body.publishSampleItems === "boolean"
        ? body.publishSampleItems
        : current.publishSampleItems,
  };

  await writeTradeSettings(next);
  return Response.json({ ok: true, settings: next });
}
