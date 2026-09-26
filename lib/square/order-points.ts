import {
  aggregateCommunityPoints,
  moneyAmountToCents,
} from "@/lib/square/money";

/** Minimal line-item shape used by pure calculation (fixture-friendly). */
export type SquareLineItemLike = {
  uid?: string | null;
  catalogObjectId?: string | null;
  itemType?: string | null;
  totalMoney?: { amount?: bigint | number | string | null } | null;
  totalTaxMoney?: { amount?: bigint | number | string | null } | null;
  totalDiscountMoney?: { amount?: bigint | number | string | null } | null;
  grossSalesMoney?: { amount?: bigint | number | string | null } | null;
  totalServiceChargeMoney?: { amount?: bigint | number | string | null } | null;
};

export type SquareTenderLike = {
  type?: string | null;
  amountMoney?: { amount?: bigint | number | string | null } | null;
  tipMoney?: { amount?: bigint | number | string | null } | null;
};

export type CategoryCommunityMapping = {
  squareCategoryId: string;
  communityId: string;
  active: boolean;
};

export type LineCategoryResolver = (
  catalogObjectId: string | null | undefined,
) => string | null;

/**
 * Qualifying line cents = after line discounts, excluding tax and service charge.
 * Prefer total_money - total_tax_money - total_service_charge_money.
 * Gift-card activations/reloads earn 0.
 */
export function lineItemQualifyingCents(line: SquareLineItemLike): number {
  const itemType = (line.itemType ?? "ITEM").toUpperCase();
  if (itemType === "GIFT_CARD") return 0;

  const total = moneyAmountToCents(line.totalMoney?.amount);
  const tax = moneyAmountToCents(line.totalTaxMoney?.amount);
  const service = moneyAmountToCents(line.totalServiceChargeMoney?.amount);
  return Math.max(0, total - tax - service);
}

const NON_QUALIFYING_TENDER_TYPES = new Set([
  "SQUARE_GIFT_CARD",
  "SQUARE_ACCOUNT",
]);

/**
 * Fraction of tender (excluding tip) that is eligible for Support Points.
 * Gift card / Square Account tenders do not earn points. OTHER store-credit
 * tenders are not reliably identifiable — documented limitation.
 */
export function eligibleTenderFraction(tenders: SquareTenderLike[]): number {
  if (!tenders.length) return 1;

  let eligible = 0;
  let excluded = 0;

  for (const tender of tenders) {
    const total = moneyAmountToCents(tender.amountMoney?.amount);
    const tip = moneyAmountToCents(tender.tipMoney?.amount);
    const body = Math.max(0, total - tip);
    const type = (tender.type ?? "").toUpperCase();
    if (NON_QUALIFYING_TENDER_TYPES.has(type)) {
      excluded += body;
    } else {
      eligible += body;
    }
  }

  const sum = eligible + excluded;
  if (sum <= 0) return 1;
  if (eligible <= 0) return 0;
  return eligible / sum;
}

/**
 * Aggregate qualifying cents by community from mapped line items.
 * Unmapped / inactive categories contribute 0.
 * Mixed carts split by community. Floor is applied once per community.
 */
export function calculateCommunityAwards(input: {
  lineItems: SquareLineItemLike[];
  tenders?: SquareTenderLike[];
  resolveCategoryId: LineCategoryResolver;
  mappingsByCategoryId: Map<string, CategoryCommunityMapping>;
}): {
  centsByCommunityId: Map<string, number>;
  awards: Map<string, { qualifyingCents: number; points: number }>;
  skippedUnmappedCents: number;
  skippedGiftCardCents: number;
} {
  const centsByCommunityId = new Map<string, number>();
  let skippedUnmappedCents = 0;
  let skippedGiftCardCents = 0;

  for (const line of input.lineItems) {
    const itemType = (line.itemType ?? "ITEM").toUpperCase();
    const cents = lineItemQualifyingCents(line);
    if (cents <= 0) continue;

    if (itemType === "GIFT_CARD") {
      skippedGiftCardCents += cents;
      continue;
    }

    const categoryId = input.resolveCategoryId(line.catalogObjectId);
    if (!categoryId) {
      skippedUnmappedCents += cents;
      continue;
    }

    const mapping = input.mappingsByCategoryId.get(categoryId);
    if (!mapping || !mapping.active) {
      skippedUnmappedCents += cents;
      continue;
    }

    centsByCommunityId.set(
      mapping.communityId,
      (centsByCommunityId.get(mapping.communityId) ?? 0) + cents,
    );
  }

  const fraction = eligibleTenderFraction(input.tenders ?? []);
  if (fraction < 1) {
    for (const [communityId, cents] of centsByCommunityId) {
      centsByCommunityId.set(communityId, Math.floor(cents * fraction));
    }
  }

  return {
    centsByCommunityId,
    awards: aggregateCommunityPoints(centsByCommunityId),
    skippedUnmappedCents,
    skippedGiftCardCents,
  };
}
