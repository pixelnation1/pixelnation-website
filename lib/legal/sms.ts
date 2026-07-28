/** Exact SMS consent disclosure shown on customer forms and stored with opt-in records. */
export const SMS_CONSENT_DISCLOSURE =
  "I agree to receive text messages from PixelNation regarding repair updates, diagnostic results, appointments, order status, delivery notifications, pickup notices, and customer support. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for assistance. Consent is not a condition of purchase.";

export const SMS_CONSENT_SOURCE_CONTACT = "/contact";

/** Digits-only length for a standard U.S. phone number (optional leading 1). */
export function isValidUsPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return true;
  if (digits.length === 11 && digits.startsWith("1")) return true;
  return false;
}
