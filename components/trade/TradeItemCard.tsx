"use client";

import Link from "next/link";
import { TradeProductImage } from "@/components/trade/TradeProductImage";
import { accessoryBadges, conditionBadges } from "@/lib/trade/badges";
import { formatCents, formatTradeDate } from "@/lib/trade/format";
import { BROKEN_MODE_MESSAGE } from "@/lib/trade/ui-config";
import type { PublicTradeItem } from "@/lib/trade/types";

type TradeItemCardProps = {
  item: PublicTradeItem;
  brokenMode?: boolean;
  priority?: boolean;
};

export function TradeItemCard({
  item,
  brokenMode = false,
  priority = false,
}: TradeItemCardProps) {
  const detailsHref = `/trade-values/${encodeURIComponent(item.slug)}`;
  const offerHref = `/sell-to-pixelnation?product=${encodeURIComponent(item.slug)}`;
  const accessories = accessoryBadges(item.requiredAccessories);
  const conditions = conditionBadges(item, brokenMode);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-card-border/80 bg-card shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-0.5 hover:border-accent-secondary/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
      <div className="relative aspect-[4/3] w-full bg-white">
        <TradeProductImage
          src={item.imageUrl}
          alt={item.name}
          itemId={item.id}
          priority={priority}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {item.brand} · {item.category}
        </p>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground">
          {item.name}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {[item.model, item.storage].filter(Boolean).join(" · ") || "Model verified in store"}
        </p>

        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Estimated Trade Value
          </p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-card-border bg-background/60 px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                Cash
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">
                {formatCents(item.displayCashCents)}
              </p>
            </div>
            <div className="rounded-xl border border-accent-secondary/50 bg-accent-secondary-muted px-3 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-accent-secondary">
                Store Credit
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-accent-secondary">
                {formatCents(item.displayStoreCreditCents)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {conditions.map((badge) => (
            <span
              key={badge.label}
              className={
                badge.tone === "repair"
                  ? "rounded-full bg-accent-muted px-2.5 py-1 text-xs font-medium text-accent"
                  : badge.tone === "warn"
                    ? "rounded-full border border-card-border px-2.5 py-1 text-xs font-medium text-muted"
                    : "rounded-full bg-accent-secondary-muted px-2.5 py-1 text-xs font-medium text-accent-secondary"
              }
            >
              {badge.tone === "repair" ? "🔧 " : "✔ "}
              {badge.label}
            </span>
          ))}
          {accessories.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-card-border/70 px-2.5 py-1 text-xs font-medium text-muted"
            >
              ✔ {badge}
            </span>
          ))}
        </div>

        {(item.acceptsNonworking || brokenMode) && (
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent-muted/60 px-3 py-2.5 text-sm font-medium leading-snug text-foreground">
            🔧 {brokenMode ? BROKEN_MODE_MESSAGE : item.nonworkingNote || BROKEN_MODE_MESSAGE}
          </p>
        )}

        <p className="mt-3 text-xs text-muted">
          Last updated {formatTradeDate(item.updatedAt)}
        </p>

        <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
          <Link
            href={detailsHref}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-background transition hover:bg-accent-hover"
          >
            View Details
          </Link>
          {item.repairHref ? (
            <Link
              href={item.repairHref}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-card-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent-secondary hover:text-accent-secondary"
            >
              Repair Instead
            </Link>
          ) : (
            <Link
              href={offerHref}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-card-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent-secondary hover:text-accent-secondary"
            >
              Get Final Offer
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
