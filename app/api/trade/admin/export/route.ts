import { requireTradeAdmin } from "@/lib/trade/auth";
import { tradeItemsToCsv } from "@/lib/trade/csv";
import { readTradeItems } from "@/lib/trade/store";

export async function GET() {
  if (!(await requireTradeAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await readTradeItems();
  const csv = tradeItemsToCsv(items);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="pixelnation-trade-values.csv"',
    },
  });
}
