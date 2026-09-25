import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getAuthContext } from "@/lib/communities/auth";
import {
  fetchActiveCommunities,
} from "@/lib/communities/communities";
import { getDefaultCheckInLocationCode } from "@/lib/communities/locations";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Gaming Communities in Emporia, KS | PixelNation",
  description:
    "Join PixelNation gaming communities in Emporia, Kansas. Check in when you play Pokémon, Magic: The Gathering, One Piece, Lorcana, Yu-Gi-Oh!, Warhammer, and more.",
  path: "/communities",
  titleAbsolute: true,
  keywords: [
    "PixelNation Communities",
    "gaming communities Emporia KS",
    "TCG community Emporia",
    "local gaming check-in",
  ],
});

const FALLBACK_NAMES = [
  "Pokémon",
  "Magic: The Gathering",
  "One Piece",
  "Riftbound",
  "Gundam",
  "Lorcana",
  "Yu-Gi-Oh!",
  "CookieRun",
  "Warhammer",
] as const;

export default async function CommunitiesLandingPage() {
  const checkInHref = `/communities/check-in?location=${getDefaultCheckInLocationCode()}`;
  const ctx = await getAuthContext();
  const accountHref = ctx ? "/account" : `/login?next=${encodeURIComponent("/account")}`;

  let communityNames: string[] = [];
  if (isSupabaseBrowserConfigured()) {
    const communities = await fetchActiveCommunities();
    communityNames = communities.map((c) => c.name);
  }
  if (communityNames.length === 0) {
    communityNames = [...FALLBACK_NAMES];
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,221,248,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(244,197,66,0.1),_transparent_45%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-4 py-12 sm:py-16 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
          PixelNation Emporia
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          PIXELNATION COMMUNITIES
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Play what you love. Help shape what PixelNation becomes.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          We track real in-store play so PixelNation can decide products, events,
          organized play, and how we support each community going forward.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={checkInHref}>CHECK IN</Button>
          <Button href={accountHref} variant="secondary">
            MY ACCOUNT
          </Button>
        </div>

        <section className="mt-14" aria-labelledby="active-communities-heading">
          <h2
            id="active-communities-heading"
            className="text-xl font-semibold text-foreground"
          >
            Active communities
          </h2>
          <p className="mt-2 text-sm text-muted">
            Communities you can check into when you play at PixelNation Emporia.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {communityNames.map((name) => (
              <li
                key={name}
                className="flex min-h-12 items-center rounded-xl border border-card-border bg-card/70 px-4 py-3 text-base font-medium text-foreground"
              >
                {name}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="availability-heading">
          <h2
            id="availability-heading"
            className="text-xl font-semibold text-foreground"
          >
            Available now &amp; coming soon
          </h2>
          <ul className="mt-5 space-y-3">
            <li className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-accent-secondary/40 bg-accent-secondary-muted/40 px-4 py-3">
              <span className="text-base text-foreground">
                Check in when you play
              </span>
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                Available now
              </span>
            </li>
            <li className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-card-border/70 bg-card/60 px-4 py-3">
              <span className="text-base text-foreground">
                Track community activity
              </span>
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">
                Coming soon
              </span>
            </li>
            <li className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-card-border/70 bg-card/60 px-4 py-3">
              <span className="text-base text-foreground">
                Support communities
              </span>
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">
                Coming soon
              </span>
            </li>
            <li className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-card-border/70 bg-card/60 px-4 py-3">
              <span className="text-base text-foreground">Top Supporters</span>
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">
                Coming soon
              </span>
            </li>
          </ul>
        </section>

        <p className="mt-12 text-sm text-muted">
          Looking for events or open play? Visit our{" "}
          <Link
            href="/gaming-community"
            className="font-semibold text-accent-secondary hover:underline"
          >
            Gaming Community
          </Link>{" "}
          page or the{" "}
          <Link
            href="/events"
            className="font-semibold text-accent-secondary hover:underline"
          >
            events calendar
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
