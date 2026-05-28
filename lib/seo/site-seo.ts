import { SITE } from "@/lib/site";

/** Preferred canonical origin (www). */
export const CANONICAL_ORIGIN = "https://www.pixelnation.co";

export const DEFAULT_OG_IMAGE = "/images/coverlogo.png";

export const SEO_DEFAULTS = {
  siteName: SITE.name,
  locale: "en_US",
  twitterHandle: "@pixelnation",
} as const;

export function buildCanonical(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${CANONICAL_ORIGIN}/`;
  return `${CANONICAL_ORIGIN}${normalized}`;
}

export function pathFromCanonical(canonical?: string): string | undefined {
  if (!canonical) return undefined;
  try {
    const url = new URL(canonical);
    return url.pathname || "/";
  } catch {
    return canonical.startsWith("/") ? canonical : undefined;
  }
}
