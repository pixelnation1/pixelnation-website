import {
  DISPLAY_NAME_MAX_LENGTH,
  DISPLAY_NAME_MIN_LENGTH,
} from "@/lib/communities/constants";

export type DisplayNameResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

/**
 * Normalize and validate a public display name.
 * Matches profiles_display_name_len (1–40) after trim.
 * Renders as plain text only — reject control characters and markup-like input.
 */
export function normalizeDisplayName(raw: unknown): DisplayNameResult {
  if (typeof raw !== "string") {
    return { ok: false, error: "Display name is required." };
  }

  const trimmed = raw.trim().replace(/\s+/g, " ");

  if (!trimmed) {
    return { ok: false, error: "Display name cannot be empty." };
  }

  if (
    trimmed.length < DISPLAY_NAME_MIN_LENGTH ||
    trimmed.length > DISPLAY_NAME_MAX_LENGTH
  ) {
    return {
      ok: false,
      error: `Display name must be between ${DISPLAY_NAME_MIN_LENGTH} and ${DISPLAY_NAME_MAX_LENGTH} characters.`,
    };
  }

  // Control characters (incl. C1) and null bytes
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return {
      ok: false,
      error: "Display name contains invalid characters.",
    };
  }

  // Obvious markup / injection shapes — names are always escaped as text in UI
  if (/[<>{}`]/.test(trimmed) || /&[#a-zA-Z0-9]+;/.test(trimmed)) {
    return {
      ok: false,
      error: "Display name cannot include markup or special symbols like < > { }.",
    };
  }

  return { ok: true, value: trimmed };
}

export function isValidEmailFormat(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed || trimmed.length > 254) return false;
  // Practical email shape check; Supabase does final validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}
