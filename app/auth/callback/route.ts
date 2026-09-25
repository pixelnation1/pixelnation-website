import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import {
  getAuthContext,
  resolvePostAuthPath,
} from "@/lib/communities/auth";
import { getSafeInternalPath } from "@/lib/communities/redirect";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function loginErrorRedirect(origin: string, code: string) {
  const url = new URL("/login", origin);
  url.searchParams.set("error", code);
  return NextResponse.redirect(url);
}

/**
 * Exchange a magic-link code (or email OTP token_hash) for a session cookie.
 * Rejects unsafe next destinations.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = getSafeInternalPath(searchParams.get("next"), "/account");

  if (!code && !(tokenHash && type)) {
    return loginErrorRedirect(origin, "missing");
  }

  if (!isSupabaseBrowserConfigured()) {
    return loginErrorRedirect(origin, "session");
  }

  const supabase = await createSupabaseServerClient();

  let exchangeError: string | null = null;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) exchangeError = error.message;
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (error) exchangeError = error.message;
  }

  if (exchangeError) {
    // Do not expose raw Supabase errors or tokens to the browser.
    return loginErrorRedirect(origin, "invalid");
  }

  const ctx = await getAuthContext();
  if (!ctx) {
    return loginErrorRedirect(origin, "session");
  }

  const destination = resolvePostAuthPath(ctx, next);
  return NextResponse.redirect(new URL(destination, origin));
}
