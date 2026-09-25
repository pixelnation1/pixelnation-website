import {
  AuthError,
  isCommunityParticipationAllowed,
  requireUser,
} from "@/lib/communities/auth";
import { needsDisplayNameSetup } from "@/lib/communities/profile";
import { resolveCheckInLocation } from "@/lib/communities/locations";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";
import { checkRateLimit } from "@/lib/trade/rate-limit";

type CheckInBody = {
  communitySlug?: unknown;
  locationCode?: unknown;
};

function normalizeSlug(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const slug = value.trim().toLowerCase();
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return slug;
}

function logCheckInFailure(
  event: string,
  details: Record<string, string | number | boolean | undefined>,
) {
  // Never log tokens, emails, service keys, or request bodies with PII.
  console.error(`[communities-check-in] ${event}`, details);
}

/**
 * Record a community check-in.
 * Browser may send communitySlug + locationCode only.
 * Identity, status, business_date, and points are never taken from the client.
 * Inserts use the service role after server validation (no client INSERT policy).
 */
export async function POST(request: Request) {
  if (!isSupabaseBrowserConfigured()) {
    logCheckInFailure("unavailable", { reason: "supabase_browser_env" });
    return Response.json(
      { error: "Check-in is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  let ctx;
  try {
    ctx = await requireUser();
  } catch (error) {
    if (error instanceof AuthError && error.reason === "unauthenticated") {
      return Response.json({ error: "Sign in required." }, { status: 401 });
    }
    logCheckInFailure("auth_error", {
      reason: error instanceof AuthError ? error.reason : "unknown",
    });
    return Response.json(
      { error: "Unable to complete check-in." },
      { status: 500 },
    );
  }

  if (needsDisplayNameSetup(ctx.profile, ctx.user)) {
    return Response.json(
      {
        error: "Finish setting up your display name before checking in.",
        code: "display_name_required",
      },
      { status: 403 },
    );
  }

  if (!isCommunityParticipationAllowed(ctx.profile)) {
    return Response.json(
      {
        error:
          "This account cannot check in right now. Please speak with PixelNation staff.",
        code: "suspended",
      },
      { status: 403 },
    );
  }

  // Per authenticated user only — do not key on shared store Wi-Fi IPs.
  // Light ceiling so a few same-day community check-ins stay allowed.
  const limit = checkRateLimit(
    `communities-check-in:user:${ctx.user.id}`,
    20,
    15 * 60 * 1000,
  );
  if (!limit.ok) {
    return Response.json(
      {
        error: "Too many check-in attempts. Please wait a moment and try again.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds || 60) },
      },
    );
  }

  let body: CheckInBody;
  try {
    body = (await request.json()) as CheckInBody;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Intentionally ignore profile_id, user_id, points, business_date,
  // account_status, role, created_at, and any other client-supplied fields.
  const communitySlug = normalizeSlug(body.communitySlug);
  if (!communitySlug) {
    return Response.json(
      { error: "Choose a community to check in." },
      { status: 400 },
    );
  }

  const locationCode =
    typeof body.locationCode === "string" ? body.locationCode : "";
  const location = resolveCheckInLocation(locationCode);
  if (!location) {
    return Response.json(
      {
        error:
          "This check-in location is not recognized. Scan the store QR again.",
        code: "invalid_location",
      },
      { status: 400 },
    );
  }

  let admin;
  try {
    admin = createSupabaseAdminClient();
  } catch {
    logCheckInFailure("admin_client_unavailable", {
      hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
    });
    return Response.json(
      { error: "Check-in is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const { data: community, error: communityError } = await admin
    .from("communities")
    .select("id, name, slug, active")
    .eq("slug", communitySlug)
    .maybeSingle();

  if (communityError) {
    logCheckInFailure("community_lookup_failed", {
      code: communityError.code,
      message: communityError.message,
    });
    return Response.json(
      { error: "Unable to complete check-in. Please try again." },
      { status: 500 },
    );
  }

  if (!community) {
    return Response.json(
      { error: "That community could not be found.", code: "invalid_community" },
      { status: 404 },
    );
  }

  if (!community.active) {
    return Response.json(
      {
        error: "That community is not accepting check-ins right now.",
        code: "inactive_community",
      },
      { status: 400 },
    );
  }

  // Do not set business_date or created_at — set_check_in_business_date owns them.
  // Do not write community_members or support_point_entries.
  // TODO: Before check-ins award Support Points, implement stronger in-store
  // presence verification (short-lived/rotating store session or staff-controlled
  // check). Do not build that mechanism in this phase.
  const { data: inserted, error: insertError } = await admin
    .from("check_ins")
    .insert({
      profile_id: ctx.profile.id,
      community_id: community.id,
      location_id: location.id,
    })
    .select("id, business_date, location_id")
    .single();

  if (insertError) {
    if (insertError.code === "23505") {
      return Response.json(
        {
          ok: false,
          code: "already_checked_in",
          error: "YOU'RE ALREADY CHECKED IN",
          message: `You're already checked in for ${community.name} today.`,
          communityName: community.name,
          communitySlug: community.slug,
        },
        { status: 409 },
      );
    }

    logCheckInFailure("insert_failed", {
      code: insertError.code,
      message: insertError.message,
      communitySlug: community.slug,
      locationId: location.id,
    });
    return Response.json(
      { error: "Unable to complete check-in. Please try again." },
      { status: 500 },
    );
  }

  return Response.json({
    ok: true,
    communityName: community.name,
    communitySlug: community.slug,
    businessDate: inserted.business_date,
    locationLabel: location.label,
  });
}
