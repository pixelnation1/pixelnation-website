import { isValidEmailFormat } from "@/lib/communities/display-name";
import {
  getAppOrigin,
  getSafeInternalPath,
} from "@/lib/communities/redirect";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/trade/rate-limit";

const SUCCESS_MESSAGE =
  "Check your email. We sent you a secure PixelNation sign-in link.";

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return ip;
}

/**
 * Request a magic-link email. Always returns the same success shape when the
 * request is well-formed so we do not leak whether an email has an account.
 */
export async function POST(request: Request) {
  if (!isSupabaseBrowserConfigured()) {
    return Response.json(
      {
        error:
          "Sign-in is temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }

  let body: { email?: string; next?: string };
  try {
    body = (await request.json()) as { email?: string; next?: string };
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !isValidEmailFormat(email)) {
    return Response.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const next = getSafeInternalPath(body.next, "/account");
  const ip = clientKey(request);

  // Soft limits: generous per-IP for shared store Wi-Fi; tighter per-email.
  const emailLimit = checkRateLimit(
    `communities-magic-link:email:${email}`,
    5,
    15 * 60 * 1000,
  );
  const ipLimit = checkRateLimit(
    `communities-magic-link:ip:${ip}`,
    40,
    15 * 60 * 1000,
  );

  if (!emailLimit.ok || !ipLimit.ok) {
    const retryAfter = Math.max(
      emailLimit.retryAfterSeconds,
      ipLimit.retryAfterSeconds,
    );
    return Response.json(
      {
        error:
          "Too many sign-in requests. Please wait a few minutes and try again.",
        retryAfterSeconds: retryAfter,
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter || 60) },
      },
    );
  }

  const origin = getAppOrigin(request);
  const emailRedirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}`;

  try {
    const supabase = await createSupabaseServerClient();
    // Intentionally ignore detailed Supabase errors to avoid account enumeration.
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo,
        shouldCreateUser: true,
      },
    });
  } catch {
    // Still return success messaging — do not leak delivery/account state.
  }

  return Response.json({ ok: true, message: SUCCESS_MESSAGE });
}
