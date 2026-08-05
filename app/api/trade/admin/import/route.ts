import { requireTradeAdmin } from "@/lib/trade/auth";
import { csvToTradeItems } from "@/lib/trade/csv";
import { readTradeItems, replaceAllTradeItems } from "@/lib/trade/store";

export async function POST(request: Request) {
  if (!(await requireTradeAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { csv?: string; mode?: "replace" | "merge" };
  try {
    body = (await request.json()) as { csv?: string; mode?: "replace" | "merge" };
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.csv?.trim()) {
    return Response.json({ error: "CSV content is required." }, { status: 400 });
  }

  try {
    const imported = csvToTradeItems(body.csv);
    if (body.mode === "merge") {
      const existing = await readTradeItems();
      const byId = new Map(existing.map((item) => [item.id, item]));
      for (const item of imported) {
        byId.set(item.id, item);
      }
      const merged = [...byId.values()];
      await replaceAllTradeItems(merged);
      return Response.json({ ok: true, count: imported.length, total: merged.length });
    }

    await replaceAllTradeItems(imported);
    return Response.json({ ok: true, count: imported.length, total: imported.length });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to import CSV.",
      },
      { status: 400 },
    );
  }
}
