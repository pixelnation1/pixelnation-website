/**
 * Allow only same-origin relative paths for post-auth redirects.
 * Blocks open redirects such as ?next=https://evil.example or //evil.example.
 */
export function getSafeInternalPath(
  next: string | null | undefined,
  fallback = "/account",
): string {
  if (!next || typeof next !== "string") return fallback;

  const candidate = next.trim();
  if (!candidate) return fallback;

  // Must be a root-relative path, not protocol-relative
  if (!candidate.startsWith("/") || candidate.startsWith("//")) {
    return fallback;
  }

  // Reject backslashes and userinfo tricks
  if (candidate.includes("\\") || candidate.includes("@")) {
    return fallback;
  }

  // Reject absolute URLs smuggled into the string
  if (candidate.includes("://")) {
    return fallback;
  }

  let decoded: string;
  try {
    decoded = decodeURIComponent(candidate);
  } catch {
    return fallback;
  }

  if (
    decoded.startsWith("//") ||
    decoded.includes("://") ||
    /^[a-z][a-z0-9+.-]*:/i.test(decoded)
  ) {
    return fallback;
  }

  // Keep path-only (optional query/hash OK if still relative)
  return candidate;
}

/** Build an absolute app origin for magic-link redirectTo URLs. */
export function getAppOrigin(request: Request): string {
  const url = new URL(request.url);

  // Local dev always uses the request origin (e.g. http://localhost:3000).
  if (process.env.NODE_ENV === "development") {
    return url.origin;
  }

  // Prefer the canonical production site URL so magic-link redirects stay on
  // https://www.pixelnation.co even when the request hit the apex host.
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (configured) return configured;

  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProto =
    request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return url.origin;
}
