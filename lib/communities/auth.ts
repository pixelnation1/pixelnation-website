import "server-only";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import {
  fetchOwnProfile,
  needsDisplayNameSetup,
} from "@/lib/communities/profile";
import { getSafeInternalPath } from "@/lib/communities/redirect";
import type { Profile } from "@/lib/communities/types";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthContext = {
  user: User;
  profile: Profile;
};

export type AuthFailureReason = "unauthenticated" | "suspended" | "forbidden";

export class AuthError extends Error {
  readonly reason: AuthFailureReason;

  constructor(reason: AuthFailureReason, message: string) {
    super(message);
    this.name = "AuthError";
    this.reason = reason;
  }
}

/** Session + profile from Supabase identity. Never trust browser-supplied roles. */
export async function getAuthContext(): Promise<AuthContext | null> {
  if (!isSupabaseBrowserConfigured()) return null;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const profile = await fetchOwnProfile(user.id);
  if (!profile) return null;

  return { user, profile };
}

export async function requireUser(): Promise<AuthContext> {
  const ctx = await getAuthContext();
  if (!ctx) {
    throw new AuthError("unauthenticated", "Sign in required.");
  }
  return ctx;
}

/**
 * Signed-in user with account_status = active.
 * Suspended sessions may remain; community participation must use this check.
 */
export async function requireActiveUser(): Promise<AuthContext> {
  const ctx = await requireUser();
  if (ctx.profile.accountStatus !== "active") {
    throw new AuthError(
      "suspended",
      "This account is currently unavailable for Community participation.",
    );
  }
  return ctx;
}

export async function requireStaff(): Promise<AuthContext> {
  const ctx = await requireActiveUser();
  if (ctx.profile.appRole !== "staff" && ctx.profile.appRole !== "admin") {
    throw new AuthError("forbidden", "Staff access required.");
  }
  return ctx;
}

export async function requireAdmin(): Promise<AuthContext> {
  const ctx = await requireActiveUser();
  if (ctx.profile.appRole !== "admin") {
    throw new AuthError("forbidden", "Admin access required.");
  }
  return ctx;
}

/** Reusable gate for future Community APIs (check-in, points, etc.). */
export function isCommunityParticipationAllowed(profile: Profile): boolean {
  return profile.accountStatus === "active";
}

/** Page helper: redirect unauthenticated visitors to login with safe next. */
export async function requireUserForPage(
  returnPath = "/account",
): Promise<AuthContext> {
  const ctx = await getAuthContext();
  if (!ctx) {
    const next = getSafeInternalPath(returnPath, "/account");
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }
  return ctx;
}

/** After auth: profile setup if needed, else safe destination. */
export function resolvePostAuthPath(
  ctx: AuthContext,
  requestedNext: string | null | undefined,
): string {
  const next = getSafeInternalPath(requestedNext, "/account");
  if (needsDisplayNameSetup(ctx.profile, ctx.user)) {
    return `/account/setup?next=${encodeURIComponent(next)}`;
  }
  return next;
}
