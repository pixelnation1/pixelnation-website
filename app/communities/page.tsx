import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  fetchActiveCommunities,
} from "@/lib/communities/communities";
import { getDefaultCheckInLocationCode } from "@/lib/communities/locations";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "PixelNation Communities | Local Game Play Tracking",
  description:
    "PixelNation Communities tracks what local players are playing in Emporia so we can plan inventory, events, organized play, and community support.",
  path: "/communities",
  keywords: [
    "PixelNation Communities",
    "game store Emporia KS",
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
          We track what local players are playing so PixelNation can decide
          inventory, events, organized play, and how we support each community
          in the store.
        </p>

        <div className="mt-8">
          <Button href={checkInHref}>CHECK IN</Button>
        </div>

        <section className="mt-14" aria-labelledby="active-communities-heading">
          <h2
            id="active-communities-heading"
            className="text-xl font-semibold text-foreground"
          >
            Active communities
          </h2>
          <p className="mt-2 text-sm text-muted">
            Check in when you play — it helps us see what Emporia is into right
            now.
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
