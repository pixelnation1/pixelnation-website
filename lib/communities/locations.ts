/**
 * Public check-in location allowlist (V1).
 *
 * QR target (no secrets): /communities/check-in?location=store
 * Future: short-lived in-store tokens can be validated here without
 * changing the page or check_ins.location_id column (text).
 */
export type CheckInLocation = {
  /** Stored in check_ins.location_id */
  id: string;
  /** Public query-string code, e.g. ?location=store */
  code: string;
  label: string;
};

const LOCATIONS: readonly CheckInLocation[] = [
  {
    id: "store",
    code: "store",
    label: "PixelNation Emporia",
  },
] as const;

const BY_CODE = new Map(LOCATIONS.map((loc) => [loc.code, loc]));

export function resolveCheckInLocation(
  code: string | null | undefined,
): CheckInLocation | null {
  if (!code || typeof code !== "string") return null;
  const normalized = code.trim().toLowerCase();
  if (!normalized) return null;
  return BY_CODE.get(normalized) ?? null;
}

export function getDefaultCheckInLocationCode(): string {
  return "store";
}
