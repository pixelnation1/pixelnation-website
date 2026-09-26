import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { normalizeEmail, purchaseSourceId } from "@/lib/square/money";
import {
  calculateCommunityAwards,
  type CategoryCommunityMapping,
} from "@/lib/square/order-points";
import type { CatalogCategoryResolver } from "@/lib/square/catalog";
import type { Square } from "square";

export type QualifyingTotalRow = {
  communityId: string;
  communityName: string | null;
  qualifyingCents: number;
  points: number;
};

export type ProcessCompletedOrderResult = {
  outcome:
    | "awarded"
    | "no_qualifying"
    | "no_email"
    | "no_match"
    | "suspended"
    | "feature_disabled"
    | "already_awarded"
    | "ignored";
  orderId: string;
  awards: QualifyingTotalRow[];
  profileId: string | null;
  customerEmail: string | null;
  detail?: string;
};

async function loadActiveMappings(
  admin: SupabaseClient,
): Promise<Map<string, CategoryCommunityMapping>> {
  const { data, error } = await admin
    .from("square_community_mappings")
    .select("square_category_id, community_id, active")
    .eq("active", true);

  const map = new Map<string, CategoryCommunityMapping>();
  if (error || !data) return map;

  for (const row of data) {
    map.set(row.square_category_id, {
      squareCategoryId: row.square_category_id,
      communityId: row.community_id,
      active: row.active === true,
    });
  }
  return map;
}

async function communityNamesById(
  admin: SupabaseClient,
  communityIds: string[],
): Promise<Map<string, string>> {
  const names = new Map<string, string>();
  if (!communityIds.length) return names;
  const { data } = await admin
    .from("communities")
    .select("id, name")
    .in("id", communityIds);
  for (const row of data ?? []) {
    names.set(row.id, row.name);
  }
  return names;
}

export async function upsertUnmatchedPurchase(
  admin: SupabaseClient,
  input: {
    squareOrderId: string;
    squarePaymentId?: string | null;
    squareRefundId?: string | null;
    occurredAt?: string | null;
    customerEmail?: string | null;
    matchStatus:
      | "no_email"
      | "no_match"
      | "needs_review"
      | "feature_disabled"
      | "ignored";
    qualifyingTotals: QualifyingTotalRow[];
    detail?: string;
  },
): Promise<void> {
  const payload = {
    square_order_id: input.squareOrderId,
    square_payment_id: input.squarePaymentId ?? null,
    square_refund_id: input.squareRefundId ?? null,
    occurred_at: input.occurredAt ?? new Date().toISOString(),
    customer_email: input.customerEmail
      ? normalizeEmail(input.customerEmail)
      : null,
    match_status: input.matchStatus,
    qualifying_totals: input.qualifyingTotals,
    detail: input.detail ?? null,
  };

  if (input.squareRefundId) {
    const { data: existing } = await admin
      .from("square_unmatched_purchases")
      .select("id")
      .eq("square_refund_id", input.squareRefundId)
      .maybeSingle();
    if (existing) {
      await admin
        .from("square_unmatched_purchases")
        .update(payload)
        .eq("id", existing.id);
    } else {
      await admin.from("square_unmatched_purchases").insert(payload);
    }
    return;
  }

  const { data: existing } = await admin
    .from("square_unmatched_purchases")
    .select("id")
    .eq("square_order_id", input.squareOrderId)
    .is("square_refund_id", null)
    .maybeSingle();

  if (existing) {
    await admin
      .from("square_unmatched_purchases")
      .update(payload)
      .eq("id", existing.id);
  } else {
    await admin.from("square_unmatched_purchases").insert(payload);
  }
}

async function resolveCustomerEmail(
  client: {
    customers: {
      get: (args: {
        customerId: string;
      }) => Promise<{ customer?: { emailAddress?: string | null } | null }>;
    };
  },
  payment: Square.Payment,
  order: Square.Order,
): Promise<string | null> {
  const customerId =
    payment.customerId ??
    order.customerId ??
    order.tenders?.find((t) => t.customerId)?.customerId ??
    null;

  if (!customerId) return null;

  try {
    const response = await client.customers.get({ customerId });
    return normalizeEmail(response.customer?.emailAddress ?? null);
  } catch {
    return null;
  }
}

/**
 * Award Support Points for a COMPLETED paid Square order.
 * Idempotent via ledger unique (profile, community, purchase, source_id).
 */
export async function processCompletedSquareOrder(input: {
  admin: SupabaseClient;
  squareClient: {
    customers: {
      get: (args: {
        customerId: string;
      }) => Promise<{ customer?: { emailAddress?: string | null } | null }>;
    };
  };
  catalogResolver: CatalogCategoryResolver;
  order: Square.Order;
  payment: Square.Payment;
  awardsEnabled: boolean;
}): Promise<ProcessCompletedOrderResult> {
  const { admin, squareClient, catalogResolver, order, payment, awardsEnabled } =
    input;

  const orderId = order.id;
  if (!orderId) {
    return {
      outcome: "ignored",
      orderId: "",
      awards: [],
      profileId: null,
      customerEmail: null,
      detail: "missing_order_id",
    };
  }

  if (order.state && order.state !== "COMPLETED") {
    return {
      outcome: "ignored",
      orderId,
      awards: [],
      profileId: null,
      customerEmail: null,
      detail: `order_state_${order.state}`,
    };
  }

  const lineItems = order.lineItems ?? [];
  if (!lineItems.length) {
    return {
      outcome: "ignored",
      orderId,
      awards: [],
      profileId: null,
      customerEmail: null,
      detail: "no_line_items",
    };
  }

  const mappings = await loadActiveMappings(admin);
  const categoryByVariation = new Map<string, string | null>();

  for (const line of lineItems) {
    const catalogId = line.catalogObjectId ?? null;
    if (!catalogId || categoryByVariation.has(catalogId)) continue;
    const ref = await catalogResolver.resolve(
      catalogId,
      line.catalogVersion ?? null,
    );
    categoryByVariation.set(catalogId, ref?.categoryId ?? null);
  }

  const calculated = calculateCommunityAwards({
    lineItems,
    tenders: order.tenders ?? [],
    resolveCategoryId: (catalogObjectId) =>
      catalogObjectId
        ? (categoryByVariation.get(catalogObjectId) ?? null)
        : null,
    mappingsByCategoryId: mappings,
  });

  const communityIds = [...calculated.awards.keys()];
  const names = await communityNamesById(admin, communityIds);
  const awardRows: QualifyingTotalRow[] = [...calculated.awards.entries()].map(
    ([communityId, award]) => ({
      communityId,
      communityName: names.get(communityId) ?? null,
      qualifyingCents: award.qualifyingCents,
      points: award.points,
    }),
  );

  const customerEmail = await resolveCustomerEmail(
    squareClient,
    payment,
    order,
  );

  if (!awardsEnabled) {
    await upsertUnmatchedPurchase(admin, {
      squareOrderId: orderId,
      squarePaymentId: payment.id ?? null,
      occurredAt: payment.createdAt ?? order.createdAt ?? null,
      customerEmail,
      matchStatus: "feature_disabled",
      qualifyingTotals: awardRows,
      detail: "SQUARE_SUPPORT_POINTS_ENABLED is off",
    });
    return {
      outcome: "feature_disabled",
      orderId,
      awards: awardRows,
      profileId: null,
      customerEmail,
    };
  }

  if (awardRows.length === 0) {
    return {
      outcome: "no_qualifying",
      orderId,
      awards: [],
      profileId: null,
      customerEmail,
      detail: "no_mapped_qualifying_cents",
    };
  }

  if (!customerEmail) {
    await upsertUnmatchedPurchase(admin, {
      squareOrderId: orderId,
      squarePaymentId: payment.id ?? null,
      occurredAt: payment.createdAt ?? order.createdAt ?? null,
      customerEmail: null,
      matchStatus: "no_email",
      qualifyingTotals: awardRows,
      detail: "Square customer email missing",
    });
    return {
      outcome: "no_email",
      orderId,
      awards: awardRows,
      profileId: null,
      customerEmail: null,
    };
  }

  const { data: profileId, error: matchError } = await admin.rpc(
    "find_profile_id_by_auth_email",
    { p_email: customerEmail },
  );

  if (matchError || !profileId) {
    await upsertUnmatchedPurchase(admin, {
      squareOrderId: orderId,
      squarePaymentId: payment.id ?? null,
      occurredAt: payment.createdAt ?? order.createdAt ?? null,
      customerEmail,
      matchStatus: "no_match",
      qualifyingTotals: awardRows,
      detail: "No auth.users.email match",
    });
    return {
      outcome: "no_match",
      orderId,
      awards: awardRows,
      profileId: null,
      customerEmail,
    };
  }

  let awardedAny = false;
  let alreadyAll = true;

  for (const row of awardRows) {
    const { data: rpcData, error: rpcError } = await admin.rpc(
      "award_square_purchase_support_points",
      {
        p_profile_id: profileId,
        p_community_id: row.communityId,
        p_points: row.points,
        p_source_id: purchaseSourceId(orderId, row.communityId),
        p_square_order_id: orderId,
        p_qualifying_cents: row.qualifyingCents,
      },
    );

    if (rpcError) {
      throw rpcError;
    }

    const code =
      rpcData && typeof rpcData === "object" && "code" in rpcData
        ? String((rpcData as { code?: string }).code)
        : "";

    if (code === "suspended") {
      await upsertUnmatchedPurchase(admin, {
        squareOrderId: orderId,
        squarePaymentId: payment.id ?? null,
        occurredAt: payment.createdAt ?? order.createdAt ?? null,
        customerEmail,
        matchStatus: "needs_review",
        qualifyingTotals: awardRows,
        detail: "Matched profile is suspended",
      });
      return {
        outcome: "suspended",
        orderId,
        awards: awardRows,
        profileId,
        customerEmail,
      };
    }

    if (code === "awarded") {
      awardedAny = true;
      alreadyAll = false;
    } else if (code !== "already_awarded") {
      alreadyAll = false;
    }
  }

  return {
    outcome: awardedAny
      ? "awarded"
      : alreadyAll
        ? "already_awarded"
        : "awarded",
    orderId,
    awards: awardRows,
    profileId,
    customerEmail,
  };
}
