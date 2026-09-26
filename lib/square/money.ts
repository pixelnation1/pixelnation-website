/**
 * Pure money / email helpers for Square Support Points.
 * All currency math uses integer cents — never float dollars.
 */

export function normalizeEmail(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (!email || !email.includes("@")) return null;
  return email;
}

/** Convert Square Money.amount (bigint | number | string | null) to integer cents. */
export function moneyAmountToCents(
  amount: bigint | number | string | null | undefined,
): number {
  if (amount == null) return 0;
  if (typeof amount === "bigint") {
    if (amount > BigInt(Number.MAX_SAFE_INTEGER) || amount < BigInt(0)) {
      return amount < BigInt(0) ? 0 : Number.MAX_SAFE_INTEGER;
    }
    return Number(amount);
  }
  if (typeof amount === "string") {
    const parsed = Number.parseInt(amount, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }
  if (typeof amount === "number") {
    if (!Number.isFinite(amount) || amount <= 0) return 0;
    return Math.trunc(amount);
  }
  return 0;
}

/** $1.00 qualifying = 1 point. Floor remaining cents. */
export function centsToSupportPoints(cents: number): number {
  if (!Number.isFinite(cents) || cents <= 0) return 0;
  return Math.floor(cents / 100);
}

/**
 * Aggregate community cents then floor once per community.
 * Do not floor per line item.
 */
export function aggregateCommunityPoints(
  centsByCommunityId: ReadonlyMap<string, number> | Record<string, number>,
): Map<string, { qualifyingCents: number; points: number }> {
  const entries =
    centsByCommunityId instanceof Map
      ? centsByCommunityId.entries()
      : Object.entries(centsByCommunityId);

  const result = new Map<string, { qualifyingCents: number; points: number }>();
  for (const [communityId, cents] of entries) {
    const qualifyingCents = Math.max(0, Math.trunc(cents));
    const points = centsToSupportPoints(qualifyingCents);
    if (points <= 0) continue;
    result.set(communityId, { qualifyingCents, points });
  }
  return result;
}

/** Stable ledger source_id for a purchase award (fits existing unique index). */
export function purchaseSourceId(orderId: string, communityId: string): string {
  return `${orderId}:${communityId}`;
}

/** Stable ledger source_id for a refund reversal. */
export function refundSourceId(refundId: string, communityId: string): string {
  return `refund:${refundId}:${communityId}`;
}
