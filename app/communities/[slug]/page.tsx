import Link from "next/link";
import { notFound } from "next/navigation";
import {
  HowPointsWork,
  PrizeBreakdown,
  TopSupportersStandingsList,
  TopSupportersRules,
} from "@/components/communities/TopSupporters";
import { Button } from "@/components/ui/Button";
import { getAuthContext } from "@/lib/communities/auth";
import { fetchCommunityBySlug } from "@/lib/communities/communities";
import { fetchLeaderboardForPeriod } from "@/lib/communities/leaderboard";
import { getDefaultCheckInLocationCode } from "@/lib/communities/locations";
import { getPrizeStructureForSlug } from "@/lib/communities/prizes";
import {
  fetchPublicCompetitionPeriod,
  getCompetitionPhase,
} from "@/lib/communities/reward-periods";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

const INDEXABLE_SLUGS = [
  "pokemon",
  "magic-the-gathering",
  "one-piece",
] as const;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const prize = getPrizeStructureForSlug(slug);
  const name = prize?.communityName ?? slug;

  return createPageMetadata({
    title: `${name} Top Supporters | PixelNation Communities | Emporia, Kansas`,
    description: `Follow ${name} Top Supporters standings at PixelNation in Emporia, Kansas. Check in when you play, earn Support Points, and climb the board.`,
    path: `/communities/${slug}`,
    titleAbsolute: true,
    keywords: [
      `${name} Emporia`,
      "PixelNation Top Supporters",
      "Support Points",
      "gaming community Emporia KS",
    ],
  });
}

export function generateStaticParams() {
  return INDEXABLE_SLUGS.map((slug) => ({ slug }));
}

export default async function CommunityTopSupportersPage({ params }: PageProps) {
  const { slug } = await params;

  if (!INDEXABLE_SLUGS.includes(slug as (typeof INDEXABLE_SLUGS)[number])) {
    notFound();
  }

  const checkInHref = `/communities/check-in?location=${getDefaultCheckInLocationCode()}`;
  const ctx = await getAuthContext();
  const accountHref = ctx
    ? "/account"
    : `/login?next=${encodeURIComponent("/account")}`;

  const prize = getPrizeStructureForSlug(slug);
  if (!prize) notFound();

  let communityName = prize.communityName;
  let periodName = "October 2026";
  let phase: "upcoming" | "active" | "ended" = "upcoming";
  let rows: Awaited<ReturnType<typeof fetchLeaderboardForPeriod>> = [];

  if (isSupabaseBrowserConfigured()) {
    const [community, period] = await Promise.all([
      fetchCommunityBySlug(slug),
      fetchPublicCompetitionPeriod(),
    ]);

    if (!community || !community.topSupportersEnabled) {
      notFound();
    }
    communityName = community.name;

    if (period) {
      periodName = period.name;
      phase = getCompetitionPhase(period);
      rows = await fetchLeaderboardForPeriod(period.id, {
        communitySlug: slug,
        limit: 25,
      });
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,221,248,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(244,197,66,0.1),_transparent_45%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
          PixelNation Top Supporters
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {communityName.toUpperCase()}
        </h1>
        <p className="mt-3 text-base text-muted">
          {periodName}
          {phase === "upcoming" ? " · Starts October 1" : null}
          {phase === "active" ? " · Live standings" : null}
          {phase === "ended" ? " · Period ended" : null}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={checkInHref}>CHECK IN</Button>
          <Button href={accountHref} variant="secondary">
            VIEW MY ACCOUNT
          </Button>
        </div>

        <div className="mt-10">
          <PrizeBreakdown structure={prize} />
        </div>

        <section className="mt-12" aria-labelledby="standings-heading">
          <h2
            id="standings-heading"
            className="text-xl font-semibold text-foreground"
          >
            Standings
          </h2>
          <p className="mt-2 text-sm text-muted">
            Qualifying Support Points earned during {periodName}. Top 25 shown.
          </p>
          <div className="mt-5">
            <TopSupportersStandingsList rows={rows} phase={phase} />
          </div>
        </section>

        <div className="mt-12 space-y-10">
          <HowPointsWork />
          <TopSupportersRules />
        </div>

        <p className="mt-10 text-sm">
          <Link
            href="/communities"
            className="font-semibold text-accent-secondary hover:underline"
          >
            ← All PixelNation Communities
          </Link>
        </p>
      </div>
    </div>
  );
}
