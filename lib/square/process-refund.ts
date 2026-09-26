import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Square } from "square";
import type { CatalogCategoryResolver } from "@/lib/square/catalog";
import {
  lineItemQualifyingCents,
  type CategoryCommunityMapping,
} from "@/lib/square/order-points";
import { centsToSupportPoints, refundSourceId } from "@/lib/square/money";
import { upsertUnmatchedPurchase } from "@/lib/square/process-order";

export type ProcessRefundResult = {
  outcome:
    | "reversed"
    | "already_reversed"
    | "needs_review"
    | "no_prior_award"
    | "feature_disabled"
    | "ignored";
  orderId: string | null;
  refundId: string;
  detail?: string;
};

function moneyCents(
  amount: bigint | number | string | null | undefined,
): number {
  if (amount == null) return 0;
  if (typeof amount === "bigint") return Number(amount);
  if (typeof amount === "string") return Number.parseInt(amount, 10) || 0;
  return Math.trunc(amount) || 0;
}

async function loadActiveMappings(
  admin: SupabaseClient,
): Promise<Map<string, CategoryCommunityMapping>> {
  const { data } = await admin
    .from("square_community_mappings")
    .select("square_category_id, community_id, active")
    .eq("active", true);
  const map = new Map<string, CategoryCommunityMapping>();
  for (const row of data ?? []) {
    map.set(row.square_category_id, {
      squareCategoryId: row.square_category_id,
      communityId: row.community_id,
      active: row.active === true,
    });
  }
  return map;
}

type PriorAward = {
  community_id: string;
  profile_id: string;
  points_awarded: number;
  qualifying_cents: number;
};

async function loadPriorAwards(
  admin: SupabaseClient,
  orderId: string,
): Promise<PriorAward[]> {
  const { data } = await admin
    .from("square_order_community_awards")
    .select("community_id, profile_id, points_awarded, qualifying_cents")
    .eq("square_order_id", orderId);
  return (data as PriorAward[] | null) ?? [];
}

function isFullPaymentRefund(
  payment: Square.Payment,
  refund: Square.PaymentRefund,
): boolean {
  const paymentAmount = moneyCents(payment.amountMoney?.amount);
  const tip = moneyCents(payment.tipMoney?.amount);
  const base = Math.max(0, paymentAmount); // amount_money typically excludes tip
  const refunded = moneyCents(payment.refundedMoney?.amount);
  const thisRefund = moneyCents(refund.amountMoney?.amount);
  // After this refund completes, refunded_money should include it; also accept
  // this refund alone covering the full non-tip payment.
  if (base <= 0) return false;
  if (thisRefund >= base) return true;
  if (refunded >= base) return true;
  // Tip-only nuance: ignore tip for points; full merchandise refund ≈ base.
  void tip;
  return false;
}

/**
 * Reverse Support Points for a COMPLETED Square refund.
 * Full refund → reverse prior awards. Itemized return → reverse mapped
 * communities when identifiable. Ambiguous partial → needs_review, no auto reverse.
 */
export async function processCompletedSquareRefund(input: {
  admin: SupabaseClient;
  catalogResolver: CatalogCategoryResolver;
  refund: Square.PaymentRefund;
  payment: Square.Payment;
  originalOrder: Square.Order | null;
  refundOrder: Square.Order | null;
  awardsEnabled: boolean;
}): Promise<ProcessRefundResult> {
  const {
    admin,
    catalogResolver,
    refund,
    payment,
    originalOrder,
    refundOrder,
    awardsEnabled,
  } = input;

  const refundId = refund.id;
  if (!refundId) {
    return {
      outcome: "ignored",
      orderId: null,
      refundId: "",
      detail: "missing_refund_id",
    };
  }

  const status = (refund.status ?? "").toUpperCase();
  if (status && status !== "COMPLETED" && status !== "APPROVED") {
    return {
      outcome: "ignored",
      orderId: payment.orderId ?? null,
      refundId,
      detail: `refund_status_${status}`,
    };
  }

  const orderId = payment.orderId ?? originalOrder?.id ?? null;
  if (!orderId) {
    await upsertUnmatchedPurchase(admin, {
      squareOrderId: `unknown-refund-${refundId}`,
      squarePaymentId: payment.id ?? null,
      squareRefundId: refundId,
      matchStatus: "needs_review",
      qualifyingTotals: [],
      detail: "Refund missing original order id",
    });
    return {
      outcome: "needs_review",
      orderId: null,
      refundId,
      detail: "missing_order_id",
    };
  }

  if (!awardsEnabled) {
    await upsertUnmatchedPurchase(admin, {
      squareOrderId: orderId,
      squarePaymentId: payment.id ?? null,
      squareRefundId: refundId,
      matchStatus: "feature_disabled",
      qualifyingTotals: [],
      detail: "SQUARE_SUPPORT_POINTS_ENABLED is off",
    });
    return {
      outcome: "feature_disabled",
      orderId,
      refundId,
    };
  }

  const prior = await loadPriorAwards(admin, orderId);
  if (!prior.length) {
    return {
      outcome: "no_prior_award",
      orderId,
      refundId,
      detail: "no_purchase_awards_for_order",
    };
  }

  // Prefer itemized returns from refund order or original order returns.
  const returnLineItems =
    refundOrder?.returns?.flatMap((r) => r.returnLineItems ?? []) ??
    originalOrder?.returns?.flatMap((r) => r.returnLineItems ?? []) ??
    [];

  const reverseByCommunity = new Map<string, number>();

  if (returnLineItems.length > 0 && originalOrder?.lineItems?.length) {
    const originalByUid = new Map(
      (originalOrder.lineItems ?? [])
        .filter((l) => l.uid)
        .map((l) => [l.uid as string, l]),
    );
    const mappings = await loadActiveMappings(admin);
    const categoryByVariation = new Map<string, string | null>();

    const syntheticLines = [];
    for (const ret of returnLineItems) {
      const sourceUid = ret.sourceLineItemUid ?? null;
      const source = sourceUid ? originalByUid.get(sourceUid) : null;
      const catalogId =
        ret.catalogObjectId ?? source?.catalogObjectId ?? null;
      if (catalogId && !categoryByVariation.has(catalogId)) {
        const ref = await catalogResolver.resolve(
          catalogId,
          ret.catalogVersion ?? source?.catalogVersion ?? null,
        );
        categoryByVariation.set(catalogId, ref?.categoryId ?? null);
      }

      // Build a line-like object for qualifying cents from the return row.
      syntheticLines.push({
        uid: ret.uid,
        catalogObjectId: catalogId,
        itemType: ret.itemType ?? source?.itemType ?? "ITEM",
        totalMoney: ret.totalMoney,
        totalTaxMoney: ret.totalTaxMoney,
        totalServiceChargeMoney: null,
        grossSalesMoney: ret.grossReturnMoney,
      });
    }

    // If any return line cannot be attributed to a mapped community and has
    // positive qualifying cents, treat as ambiguous.
    let ambiguous = false;
    const centsByCommunity = new Map<string, number>();

    for (const line of syntheticLines) {
      const cents = lineItemQualifyingCents(line);
      if (cents <= 0) continue;
      const categoryId = line.catalogObjectId
        ? categoryByVariation.get(line.catalogObjectId)
        : null;
      const mapping = categoryId ? mappings.get(categoryId) : null;
      if (!mapping || !mapping.active) {
        // Unmapped return lines don't reverse points (they never earned any).
        continue;
      }
      if (!prior.some((p) => p.community_id === mapping.communityId)) {
        ambiguous = true;
        break;
      }
      centsByCommunity.set(
        mapping.communityId,
        (centsByCommunity.get(mapping.communityId) ?? 0) + cents,
      );
    }

    if (ambiguous) {
      await upsertUnmatchedPurchase(admin, {
        squareOrderId: orderId,
        squarePaymentId: payment.id ?? null,
        squareRefundId: refundId,
        matchStatus: "needs_review",
        qualifyingTotals: prior.map((p) => ({
          communityId: p.community_id,
          communityName: null,
          qualifyingCents: p.qualifying_cents,
          points: p.points_awarded,
        })),
        detail: "Partial refund return lines could not be attributed confidently",
      });
      return {
        outcome: "needs_review",
        orderId,
        refundId,
        detail: "ambiguous_return_lines",
      };
    }

    for (const [communityId, cents] of centsByCommunity) {
      const points = centsToSupportPoints(cents);
      if (points > 0) reverseByCommunity.set(communityId, points);
    }

    // If itemized returns produced no community points but refund is not full,
    // and prior awards exist, needs review rather than guessing.
    if (
      reverseByCommunity.size === 0 &&
      !isFullPaymentRefund(payment, refund)
    ) {
      await upsertUnmatchedPurchase(admin, {
        squareOrderId: orderId,
        squarePaymentId: payment.id ?? null,
        squareRefundId: refundId,
        matchStatus: "needs_review",
        qualifyingTotals: prior.map((p) => ({
          communityId: p.community_id,
          communityName: null,
          qualifyingCents: p.qualifying_cents,
          points: p.points_awarded,
        })),
        detail: "Partial refund without attributable mapped return cents",
      });
      return {
        outcome: "needs_review",
        orderId,
        refundId,
        detail: "partial_unattributable",
      };
    }
  } else if (isFullPaymentRefund(payment, refund)) {
    for (const award of prior) {
      reverseByCommunity.set(award.community_id, award.points_awarded);
    }
  } else {
    await upsertUnmatchedPurchase(admin, {
      squareOrderId: orderId,
      squarePaymentId: payment.id ?? null,
      squareRefundId: refundId,
      matchStatus: "needs_review",
      qualifyingTotals: prior.map((p) => ({
        communityId: p.community_id,
        communityName: null,
        qualifyingCents: p.qualifying_cents,
        points: p.points_awarded,
      })),
      detail:
        "Partial refund without itemized return line data — no automatic reversal",
    });
    return {
      outcome: "needs_review",
      orderId,
      refundId,
      detail: "ambiguous_partial_refund",
    };
  }

  // Cap reversal at previously awarded points per community.
  const priorByCommunity = new Map(
    prior.map((p) => [p.community_id, p] as const),
  );

  let reversedAny = false;
  let alreadyAll = true;

  for (const [communityId, points] of reverseByCommunity) {
    const award = priorByCommunity.get(communityId);
    if (!award) continue;
    const reversePoints = Math.min(points, award.points_awarded);
    if (reversePoints <= 0) continue;

    const { data: rpcData, error } = await admin.rpc(
      "reverse_square_purchase_support_points",
      {
        p_profile_id: award.profile_id,
        p_community_id: communityId,
        p_points: reversePoints,
        p_source_id: refundSourceId(refundId, communityId),
        p_square_order_id: orderId,
        p_square_refund_id: refundId,
      },
    );

    if (error) throw error;

    const code =
      rpcData && typeof rpcData === "object" && "code" in rpcData
        ? String((rpcData as { code?: string }).code)
        : "";

    if (code === "reversed") {
      reversedAny = true;
      alreadyAll = false;
    } else if (code !== "already_reversed") {
      alreadyAll = false;
    }
  }

  if (!reversedAny && alreadyAll && reverseByCommunity.size > 0) {
    return { outcome: "already_reversed", orderId, refundId };
  }

  if (!reversedAny && reverseByCommunity.size === 0) {
    return {
      outcome: "no_prior_award",
      orderId,
      refundId,
      detail: "nothing_to_reverse",
    };
  }

  return {
    outcome: reversedAny ? "reversed" : "already_reversed",
    orderId,
    refundId,
  };
}
