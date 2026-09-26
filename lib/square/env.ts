import "server-only";

/**
 * Server-only Square Support Points configuration.
 * Never expose tokens or webhook keys via NEXT_PUBLIC_*.
 */

export function isSquareSupportPointsEnabled(): boolean {
  const raw = process.env.SQUARE_SUPPORT_POINTS_ENABLED?.trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes" || raw === "on";
}

export function getSquareAccessToken(): string | null {
  const value = process.env.SQUARE_ACCESS_TOKEN?.trim();
  return value || null;
}

export function getSquareLocationId(): string | null {
  const value = process.env.SQUARE_LOCATION_ID?.trim();
  return value || null;
}

export function getSquareWebhookSignatureKey(): string | null {
  const value = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY?.trim();
  return value || null;
}

/**
 * Exact notification URL registered in Square Dashboard.
 * Defaults to production webhook path when unset.
 */
export function getSquareWebhookNotificationUrl(): string {
  const configured = process.env.SQUARE_WEBHOOK_NOTIFICATION_URL?.trim();
  if (configured) return configured;
  return "https://www.pixelnation.co/api/square/webhook";
}

/** sandbox | production — defaults to production (safe). */
export function getSquareEnvironmentName(): "sandbox" | "production" {
  const raw = process.env.SQUARE_ENVIRONMENT?.trim().toLowerCase();
  if (raw === "sandbox") return "sandbox";
  return "production";
}
