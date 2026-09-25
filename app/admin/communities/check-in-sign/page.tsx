import Image from "next/image";
import { CheckInSignActions } from "@/components/communities/CheckInSignActions";
import {
  generateStoreCheckInQrAssets,
  STORE_CHECK_IN_PRODUCTION_URL,
} from "@/lib/communities/check-in-qr";
import { createPageMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Community Check-In Sign | PixelNation Staff",
  description:
    "Staff printable QR sign for PixelNation store community check-in.",
  path: "/admin/communities/check-in-sign",
  noIndex: true,
  titleAbsolute: true,
});

/**
 * Staff printable store check-in sign.
 * Unlisted / noindex — not in public nav or sitemap.
 * Intentionally not wired to trade-admin password auth (separate system).
 * Decide separately whether to add a staff gate.
 *
 * Uses divs (not header/footer) so print CSS can hide site chrome
 * without stripping sign branding and copy.
 */
export default async function CommunityCheckInSignPage() {
  const { svg, pngDataUrl, url } = await generateStoreCheckInQrAssets();

  if (url !== STORE_CHECK_IN_PRODUCTION_URL) {
    throw new Error("QR payload mismatch: refusing to render sign.");
  }

  return (
    <div className="check-in-sign-page bg-background text-foreground">
      <div className="check-in-sign-sheet mx-auto flex min-h-[100dvh] max-w-[8.5in] flex-col justify-between px-6 py-6 sm:px-10 sm:py-8">
        <div className="check-in-sign-brand text-center">
          <Image
            src="/images/pixellogo.png"
            alt="PixelNation"
            width={640}
            height={280}
            priority
            className="check-in-sign-logo mx-auto h-auto w-[min(58%,12.5rem)] sm:w-[min(50%,14rem)]"
          />
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.35em] text-accent-secondary sm:mt-3 sm:text-base">
            PIXELNATION
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-accent sm:mt-3 sm:text-4xl md:text-5xl">
            COMMUNITY CHECK IN
          </h1>
          <p className="mt-3 text-xl font-semibold tracking-wide text-foreground sm:mt-4 sm:text-2xl">
            PLAYING HERE TODAY?
          </p>
          <p className="mt-2 text-base font-medium uppercase tracking-[0.2em] text-muted sm:text-lg">
            SCAN TO CHECK IN
          </p>
        </div>

        <div className="check-in-sign-qr mx-auto my-6 w-full max-w-[4.75in] flex-shrink-0 rounded-2xl bg-white p-4 shadow-[0_0_0_1px_rgba(244,197,66,0.35)] sm:my-8 sm:p-5">
          <div
            className="check-in-sign-qr-inner aspect-square w-full [&_svg]:h-full [&_svg]:w-full"
            role="img"
            aria-label={`QR code linking to ${STORE_CHECK_IN_PRODUCTION_URL}`}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>

        <div className="check-in-sign-copy text-center">
          <p className="text-base font-semibold text-foreground sm:text-lg">
            Choose the game you&apos;re playing and check in.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
            Your activity helps PixelNation see which gaming communities are
            growing so we can support them with more products, events, and
            organized play.
          </p>
          <div className="mt-4 border-t border-card-border/60 pt-4 sm:mt-5 sm:pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-secondary">
              COMING SOON
            </p>
            <p className="mt-2 text-sm font-medium text-accent sm:text-base">
              Support Points + PixelNation Top Supporters
            </p>
          </div>
        </div>
      </div>

      <CheckInSignActions
        svg={svg}
        pngDataUrl={pngDataUrl}
        checkInUrl={STORE_CHECK_IN_PRODUCTION_URL}
      />
    </div>
  );
}
