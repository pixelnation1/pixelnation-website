import Link from "next/link";
import type { PublicLeaderboardRow } from "@/lib/communities/types";
import {
  formatStoreCredit,
  type CommunityPrizeStructure,
} from "@/lib/communities/prizes";

const EMPTY_BOARD =
  "No supporters on the board yet. Be the first to check in and earn Support Points.";

type PreviewCardProps = {
  communityName: string;
  communitySlug: string;
  rows: PublicLeaderboardRow[];
  periodLabel: string;
  phase: "upcoming" | "active" | "ended";
  prizePool: number | null;
};

export function TopSupportersPreviewCard({
  communityName,
  communitySlug,
  rows,
  periodLabel,
  phase,
  prizePool,
}: PreviewCardProps) {
  const top = rows[0] ?? null;

  return (
    <article className="flex flex-col rounded-2xl border border-card-border bg-card/80 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-secondary">
        Top Supporters
      </p>
      <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground">
        {communityName}
      </h3>
      {prizePool != null ? (
        <p className="mt-1 text-sm font-medium text-accent">
          {formatStoreCredit(prizePool)} prize pool
        </p>
      ) : null}
      <p className="mt-1 text-xs uppercase tracking-wide text-muted">
        {periodLabel}
        {phase === "upcoming" ? " · Starts October 1" : null}
      </p>

      <div className="mt-5 flex-1">
        {phase === "upcoming" && rows.length === 0 ? (
          <p className="text-sm leading-relaxed text-muted">
            Standings begin October 1. Check in now to earn lifetime Support
            Points — October competition points start when the period opens.
          </p>
        ) : top ? (
          <p className="text-base text-foreground">
            <span className="font-semibold text-accent">#{top.rank}</span>{" "}
            <span className="font-medium">{top.displayName}</span>{" "}
            <span className="text-muted">
              {top.points} pt{top.points === 1 ? "" : "s"}
            </span>
          </p>
        ) : (
          <p className="text-sm leading-relaxed text-muted">{EMPTY_BOARD}</p>
        )}

        {rows.length > 1 ? (
          <ol className="mt-3 space-y-1.5">
            {rows.slice(0, 5).map((row) => (
              <li
                key={`${row.communitySlug}-${row.rank}-${row.displayName}`}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <span className="text-foreground">
                  <span className="font-semibold text-muted">#{row.rank}</span>{" "}
                  {row.displayName}
                </span>
                <span className="shrink-0 text-muted">
                  {row.points} pt{row.points === 1 ? "" : "s"}
                </span>
              </li>
            ))}
          </ol>
        ) : null}
      </div>

      <Link
        href={`/communities/${communitySlug}`}
        className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-accent-secondary hover:underline"
      >
        VIEW FULL STANDINGS
      </Link>
    </article>
  );
}

type StandingsTableProps = {
  rows: PublicLeaderboardRow[];
  phase: "upcoming" | "active" | "ended";
  emptyHint?: string;
};

export function TopSupportersStandingsList({
  rows,
  phase,
  emptyHint,
}: StandingsTableProps) {
  if (rows.length === 0) {
    return (
      <p className="text-sm leading-relaxed text-muted">
        {phase === "upcoming"
          ? (emptyHint ??
            "Standings begin October 1. Be the first to check in once the period starts.")
          : EMPTY_BOARD}
      </p>
    );
  }

  return (
    <ol className="space-y-2">
      {rows.map((row) => (
        <li
          key={`${row.communitySlug}-${row.rank}-${row.displayName}`}
          className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-card-border/70 bg-card/60 px-4 py-3"
        >
          <span className="text-base text-foreground">
            <span className="font-semibold text-accent">#{row.rank}</span>{" "}
            <span className="font-medium">{row.displayName}</span>
          </span>
          <span className="shrink-0 text-sm font-semibold text-foreground">
            {row.points} pt{row.points === 1 ? "" : "s"}
          </span>
        </li>
      ))}
    </ol>
  );
}

type PrizeBreakdownProps = {
  structure: CommunityPrizeStructure;
};

export function PrizeBreakdown({ structure }: PrizeBreakdownProps) {
  return (
    <div className="rounded-2xl border border-accent/40 bg-accent-muted/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Planned rank prizes
      </p>
      <p className="mt-2 text-lg font-bold text-foreground">
        {structure.communityName} · {formatStoreCredit(structure.poolTotal)}
      </p>
      <p className="mt-1 text-sm text-muted">
        PixelNation store credit. Ties are not auto-paid. Month-end winner
        freezing comes later.
      </p>
      <ul className="mt-4 space-y-2">
        {structure.ranks.map((r) => (
          <li
            key={r.rank}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="text-foreground">
              {r.rank === 1
                ? "1st"
                : r.rank === 2
                  ? "2nd"
                  : r.rank === 3
                    ? "3rd"
                    : `${r.rank}th`}
            </span>
            <span className="font-semibold text-accent">
              {formatStoreCredit(r.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TopSupportersRules() {
  return (
    <section aria-labelledby="top-supporters-rules-heading">
      <h2
        id="top-supporters-rules-heading"
        className="text-lg font-semibold text-foreground"
      >
        Program rules
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
        <li>Support Points have no cash value.</li>
        <li>Prizes are PixelNation store credit.</li>
        <li>
          Store credit is non-transferable and cannot be redeemed for cash.
        </li>
        <li>Support Points cannot be transferred.</li>
        <li>
          Refunds or reversals may adjust points once purchase points exist.
        </li>
        <li>PixelNation may correct errors, abuse, or fraud.</li>
        <li>Employees are not eligible for Top Supporters prizes.</li>
        <li>PixelNation may modify or discontinue the program.</li>
        <li>
          Standings count qualifying Support Points earned during that reward
          period.
        </li>
      </ul>
    </section>
  );
}

export function HowPointsWork() {
  return (
    <section aria-labelledby="how-points-work-heading">
      <h2
        id="how-points-work-heading"
        className="text-lg font-semibold text-foreground"
      >
        How points work
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
        <p>
          Play at PixelNation, scan the store QR code, choose your game, and
          earn <span className="font-semibold text-foreground">+5</span> Support
          Points for that community.
        </p>
        <p>
          One qualifying check-in per community per day. Different games on the
          same day each earn their own +5 — for example, Magic and Pokémon can
          both count.
        </p>
        <p>
          Qualifying in-store purchases earn{" "}
          <span className="font-semibold text-foreground">1 Support Point per dollar</span>{" "}
          for the matching community when the purchase is tied to a mapped product
          category and a PixelNation account email. Mixed carts split by community.
        </p>
        <p>More ways to earn Support Points may be added over time.</p>
      </div>
    </section>
  );
}
