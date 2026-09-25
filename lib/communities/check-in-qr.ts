import "server-only";
import QRCode from "qrcode";
import { CANONICAL_ORIGIN } from "@/lib/seo/site-seo";
import { getDefaultCheckInLocationCode } from "@/lib/communities/locations";

/**
 * Exact production check-in URL encoded by the store QR sign.
 * Must stay aligned with resolveCheckInLocation("store") and the check-in page.
 * No secrets, tokens, profile ids, or credentials — public URL only.
 */
export const STORE_CHECK_IN_PATH = `/communities/check-in?location=${getDefaultCheckInLocationCode()}`;

export const STORE_CHECK_IN_PRODUCTION_URL = `${CANONICAL_ORIGIN}${STORE_CHECK_IN_PATH}`;

function assertPublicCheckInUrl(url: string): asserts url is typeof STORE_CHECK_IN_PRODUCTION_URL {
  if (url !== STORE_CHECK_IN_PRODUCTION_URL) {
    throw new Error(
      "Check-in QR may only encode the public store check-in URL.",
    );
  }
  if (
    url.includes("token") ||
    url.includes("secret") ||
    url.includes("profile") ||
    url.includes("key=") ||
    url.includes("access_")
  ) {
    throw new Error("Check-in QR must not contain credentials or secrets.");
  }
}

export type CheckInQrAssets = {
  /** Payload asserted equal to STORE_CHECK_IN_PRODUCTION_URL before encoding. */
  url: typeof STORE_CHECK_IN_PRODUCTION_URL;
  svg: string;
  /** PNG data URL for optional download (same payload as SVG). */
  pngDataUrl: string;
};

/** Generate SVG + PNG for the store check-in QR. SVG is the primary printable asset. */
export async function generateStoreCheckInQrAssets(): Promise<CheckInQrAssets> {
  const url = STORE_CHECK_IN_PRODUCTION_URL;
  assertPublicCheckInUrl(url);

  const [svg, pngDataUrl] = await Promise.all([
    QRCode.toString(url, {
      type: "svg",
      errorCorrectionLevel: "M",
      margin: 2,
      width: 1024,
      color: {
        dark: "#041427",
        light: "#ffffff",
      },
    }),
    QRCode.toDataURL(url, {
      type: "image/png",
      errorCorrectionLevel: "M",
      margin: 2,
      width: 1024,
      color: {
        dark: "#041427",
        light: "#ffffff",
      },
    }),
  ]);

  if (!svg.includes("<svg")) {
    throw new Error("Check-in QR SVG generation failed.");
  }

  // Reject any pixelnation (or other app) URL accidentally embedded as text,
  // while allowing the SVG xmlns (http://www.w3.org/2000/svg).
  const embeddedUrls = svg.match(/https?:\/\/[^\s"'<>]+/g) ?? [];
  for (const match of embeddedUrls) {
    if (match.includes("w3.org")) continue;
    assertPublicCheckInUrl(match);
  }

  return { url, svg, pngDataUrl };
}
