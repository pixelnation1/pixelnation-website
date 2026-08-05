import {
  createTradeAdminSession,
  isTradeAdminConfigured,
  verifyTradeAdminPassword,
} from "@/lib/trade/auth";
import { checkRateLimit } from "@/lib/trade/rate-limit";

export async function POST(request: Request) {
  if (!isTradeAdminConfigured()) {
    return Response.json(
      {
        error:
          "Trade admin is not configured. Set TRADE_ADMIN_PASSWORD in the environment.",
      },
      { status: 503 },
    );
  }

  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const limit = checkRateLimit(`trade-admin-login:${ip}`, 10, 15 * 60 * 1000);
  if (!limit.ok) {
    return Response.json({ error: "Too many login attempts." }, { status: 429 });
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.password || !verifyTradeAdminPassword(body.password)) {
    return Response.json({ error: "Invalid password." }, { status: 401 });
  }

  await createTradeAdminSession();
  return Response.json({ ok: true });
}
