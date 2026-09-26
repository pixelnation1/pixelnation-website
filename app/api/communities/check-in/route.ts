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

type RpcResult = {
  ok?: boolean;
  code?: string;
  communityName?: string;
  communitySlug?: string;
  businessDate?: string;
  pointsAwarded?: number;
  locationId?: string;
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

function asRpcResult(value: unknown): RpcResult | null {
  if (!value || typeof value !== "object") return null;
  return value as RpcResult;
}

/**
 * Record a community check-in and award +5 Support Points atomically.
 * Browser may send communitySlug + locationCode only.
 * Identity, status, business_date, points, profile_id, and created_by are
 * never taken from the client.
 *
 * Flow: session auth → validate display name / active / location / community →
 * service-role call to record_community_check_in_with_points(profile from
 * session, community id, location id). Points are hardcoded in Postgres.
 *
 * Phase 4: check-ins DO award +5 Support Points. Stronger rotating QR /
 * in-store presence verification remains future work before higher-value
 * awards. Do not build rotating QR in this phase.
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
  // account_status, role, created_by, created_at, and any other client fields.
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

  // Atomic: check_in + support_point_entries in one Postgres transaction.
  // Profile id comes from the validated session only (never the request body).
  const { data: rpcData, error: rpcError } = await admin.rpc(
    "record_community_check_in_with_points",
    {
      p_profile_id: ctx.profile.id,
      p_community_id: community.id,
      p_location_id: location.id,
    },
  );

  if (rpcError) {
    logCheckInFailure("rpc_failed", {
      code: rpcError.code,
      message: rpcError.message,
      communitySlug: community.slug,
      locationId: location.id,
    });
    return Response.json(
      { error: "Unable to complete check-in. Please try again." },
      { status: 500 },
    );
  }

  const result = asRpcResult(rpcData);
  if (!result) {
    logCheckInFailure("rpc_unexpected_shape", {
      communitySlug: community.slug,
    });
    return Response.json(
      { error: "Unable to complete check-in. Please try again." },
      { status: 500 },
    );
  }

  if (result.code === "already_checked_in") {
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

  if (result.code === "suspended") {
    return Response.json(
      {
        error:
          "This account cannot check in right now. Please speak with PixelNation staff.",
        code: "suspended",
      },
      { status: 403 },
    );
  }

  if (result.code === "inactive_community") {
    return Response.json(
      {
        error: "That community is not accepting check-ins right now.",
        code: "inactive_community",
      },
      { status: 400 },
    );
  }

  if (result.code === "invalid_community" || result.ok !== true) {
    logCheckInFailure("rpc_rejected", {
      code: result.code,
      communitySlug: community.slug,
    });
    return Response.json(
      { error: "Unable to complete check-in. Please try again." },
      { status: 500 },
    );
  }

  const pointsAwarded =
    typeof result.pointsAwarded === "number" ? result.pointsAwarded : 5;

  return Response.json({
    ok: true,
    communityName: community.name,
    communitySlug: community.slug,
    businessDate: result.businessDate,
    locationLabel: location.label,
    pointsAwarded,
  });
}
