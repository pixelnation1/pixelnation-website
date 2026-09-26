import Link from "next/link";
import {
  HowPointsWork,
  TopSupportersPreviewCard,
  TopSupportersRules,
} from "@/components/communities/TopSupporters";
import { Button } from "@/components/ui/Button";
import { getAuthContext } from "@/lib/communities/auth";
import { fetchActiveCommunities } from "@/lib/communities/communities";
import { fetchLeaderboardForPeriod } from "@/lib/communities/leaderboard";
import { getDefaultCheckInLocationCode } from "@/lib/communities/locations";
import {
  formatStoreCredit,
  getPrizeStructureForSlug,
  TOTAL_MONTHLY_PRIZE_POOL,
  TOP_SUPPORTERS_PRIZE_STRUCTURES,
} from "@/lib/communities/prizes";
import {
  fetchPublicCompetitionPeriod,
  getCompetitionPhase,
} from "@/lib/communities/reward-periods";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isSupabaseBrowserConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "PixelNation Communities & Top Supporters | Emporia, Kansas",
  description:
    "Join PixelNation gaming communities in Emporia, Kansas. Check in when you play, earn Support Points, and follow the Pokémon, Magic: The Gathering, and One Piece Top Supporters standings.",
  path: "/communities",
  titleAbsolute: true,
  keywords: [
    "PixelNation Communities",
    "Top Supporters Emporia",
    "gaming communities Emporia KS",
    "TCG community Emporia",
    "Support Points PixelNation",
  ],
});

const FALLBACK_OTHER = [
  "Riftbound",
  "Gundam",
  "Lorcana",
  "Yu-Gi-Oh!",
  "CookieRun",
  "Warhammer",
] as const;

const PRIZE_CARD_ORDER = [
  "one-piece",
  "magic-the-gathering",
  "pokemon",
] as const;

export default async function CommunitiesLandingPage() {
  const checkInHref = `/communities/check-in?location=${getDefaultCheckInLocationCode()}`;
  const ctx = await getAuthContext();
  const accountHref = ctx
    ? "/account"
    : `/login?next=${encodeURIComponent("/account")}`;

  let prizeCommunities: { name: string; slug: string }[] =
    TOP_SUPPORTERS_PRIZE_STRUCTURES.map((p) => ({
      name: p.communityName,
      slug: p.communitySlug,
    }));
  let otherCommunities: { name: string; slug: string }[] = FALLBACK_OTHER.map(
    (name) => ({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    }),
  );
  let periodName = "October 2026";
  let phase: "upcoming" | "active" | "ended" = "upcoming";
  let standingsBySlug = new Map<
    string,
    Awaited<ReturnType<typeof fetchLeaderboardForPeriod>>
  >();

  if (isSupabaseBrowserConfigured()) {
    const [communities, period] = await Promise.all([
      fetchActiveCommunities(),
      fetchPublicCompetitionPeriod(),
    ]);

    if (communities.length > 0) {
      prizeCommunities = communities
        .filter((c) => c.topSupportersEnabled)
        .map((c) => ({ name: c.name, slug: c.slug }));
      otherCommunities = communities
        .filter((c) => !c.topSupportersEnabled)
        .map((c) => ({ name: c.name, slug: c.slug }));
    }

    if (period) {
      periodName = period.name;
      phase = getCompetitionPhase(period);
      const rows = await fetchLeaderboardForPeriod(period.id);
      standingsBySlug = new Map();
      for (const row of rows) {
        const list = standingsBySlug.get(row.communitySlug) ?? [];
        list.push(row);
        standingsBySlug.set(row.communitySlug, list);
      }
    }
  }

  prizeCommunities = [...prizeCommunities].sort((a, b) => {
    const ai = PRIZE_CARD_ORDER.indexOf(
      a.slug as (typeof PRIZE_CARD_ORDER)[number],
    );
    const bi = PRIZE_CARD_ORDER.indexOf(
      b.slug as (typeof PRIZE_CARD_ORDER)[number],
    );
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

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
          Play here. Support your game. Help shape what PixelNation does next.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Check in, earn Support Points, climb Top Supporters.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={checkInHref}>CHECK IN</Button>
          <Button href={accountHref} variant="secondary">
            MY ACCOUNT
          </Button>
        </div>

        <section className="mt-16" aria-labelledby="top-supporters-heading">
          <h2
            id="top-supporters-heading"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            PIXELNATION TOP SUPPORTERS
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Support Points measure activity per community. Players earn points
            through qualifying activity. The most points during a reward period
            become Top Supporters. Check-ins award +5. Qualifying in-store
            purchases earn 1 Support Point per dollar for the matching community
            when enabled for a mapped category and PixelNation account email.
          </p>

          <div className="mt-6 rounded-2xl border border-accent/50 bg-gradient-to-br from-accent-muted to-card p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Prize pool
            </p>
            <p className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              {formatStoreCredit(TOTAL_MONTHLY_PRIZE_POOL)} MONTHLY STORE CREDIT
              PRIZE POOL
            </p>
            <ul className="mt-4 space-y-3 text-sm text-foreground">
              {TOP_SUPPORTERS_PRIZE_STRUCTURES.map((structure) => (
                <li key={structure.communitySlug}>
                  <span className="font-semibold">
                    {structure.communityName.toUpperCase()}{" "}
                    {formatStoreCredit(structure.poolTotal)}
                  </span>
                  <span className="text-muted">
                    :{" "}
                    {structure.ranks
                      .map((r) => {
                        const place =
                          r.rank === 1
                            ? "1st"
                            : r.rank === 2
                              ? "2nd"
                              : r.rank === 3
                                ? "3rd"
                                : `${r.rank}th`;
                        return `${place} ${formatStoreCredit(r.amount)}`;
                      })
                      .join(", ")}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              Planned rank prizes in PixelNation store credit. Ties are not
              auto-paid. Month-end winner freezing comes later.
            </p>
          </div>

          <div className="mt-10 grid gap-5">
            {prizeCommunities.map((community) => {
              const prize = getPrizeStructureForSlug(community.slug);
              const rows = standingsBySlug.get(community.slug) ?? [];
              return (
                <TopSupportersPreviewCard
                  key={community.slug}
                  communityName={community.name}
                  communitySlug={community.slug}
                  rows={rows}
                  periodLabel={periodName}
                  phase={phase}
                  prizePool={prize?.poolTotal ?? null}
                />
              );
            })}
          </div>
        </section>

        <div className="mt-14 space-y-12">
          <HowPointsWork />
          <TopSupportersRules />
        </div>

        <section
          className="mt-16"
          aria-labelledby="more-communities-heading"
        >
          <h2
            id="more-communities-heading"
            className="text-xl font-semibold text-foreground"
          >
            MORE PIXELNATION COMMUNITIES
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            These communities are tracked when you check in. They may later get
            events, inventory focus, organized play, and future Top Supporters —
            prizes are not part of the current program for these games.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {otherCommunities.map((community) => (
              <li
                key={community.slug}
                className="flex min-h-12 items-center rounded-xl border border-card-border bg-card/70 px-4 py-3 text-base font-medium text-foreground"
              >
                {community.name}
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
