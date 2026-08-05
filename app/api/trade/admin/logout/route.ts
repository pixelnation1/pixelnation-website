import { clearTradeAdminSession } from "@/lib/trade/auth";

export async function POST() {
  await clearTradeAdminSession();
  return Response.json({ ok: true });
}
