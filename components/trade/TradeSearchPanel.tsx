"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { TradeItemCard } from "@/components/trade/TradeItemCard";
import { filterAndSortTradeItems } from "@/lib/trade/filter";
import {
  BROKEN_DEVICE_EXAMPLES,
  BROKEN_MODE_MESSAGE,
  POPULAR_SEARCHES,
  TRADE_CATEGORY_BUTTONS,
  TRUST_BADGES,
} from "@/lib/trade/ui-config";
import type {
  PublicTradeItem,
  TradeFilterState,
  TradeItem,
  TradeSettings,
} from "@/lib/trade/types";
import { SITE } from "@/lib/site";

type ConditionMode = "working" | "broken";

type TradeSearchPanelProps = {
  items: TradeItem[];
  settings: TradeSettings;
  showSampleBanner?: boolean;
  sampleBannerText?: string;
};

export function TradeSearchPanel({
  items,
  settings,
  showSampleBanner = false,
  sampleBannerText,
}: TradeSearchPanelProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<TradeFilterState["sort"]>("cash-desc");
  const [conditionMode, setConditionMode] = useState<ConditionMode>("working");
  const deferredQuery = useDeferredValue(query);

  const filters: TradeFilterState = useMemo(
    () => ({
      query: deferredQuery,
      category,
      brand: "all",
      workingFilter: conditionMode === "broken" ? "accepts-nonworking" : "all",
      sort,
    }),
    [deferredQuery, category, conditionMode, sort],
  );

  const results = useMemo(
    () => filterAndSortTradeItems(items, settings, filters),
    [items, settings, filters],
  );

  const publicAll = useMemo(
    () =>
      filterAndSortTradeItems(items, settings, {
        query: "",
        category: "all",
        brand: "all",
        workingFilter: "all",
        sort: "updated-desc",
      }),
    [items, settings],
  );

  const recentlyUpdated = publicAll.slice(0, 4);
  const trending = useMemo(
    () =>
      [...publicAll]
        .sort((a, b) => b.displayStoreCreditCents - a.displayStoreCreditCents)
        .slice(0, 4),
    [publicAll],
  );
  const newestConsoles = useMemo(
    () =>
      publicAll
        .filter((item) =>
          ["PlayStation", "Xbox", "Nintendo", "Gaming Handhelds"].includes(
            String(item.category),
          ),
        )
        .slice(0, 4),
    [publicAll],
  );

  const hasActiveSearch =
    deferredQuery.trim().length > 0 || category !== "all" || conditionMode === "broken";

  function applyPopularSearch(term: string) {
    setQuery(term);
    setCategory("all");
    document.getElementById("trade-search")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function applyCategory(nextCategory: string) {
    setCategory((prev) => (prev === nextCategory ? "all" : nextCategory));
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="pb-8">
      {/* App hero / first screen */}
      <section
        id="trade-search"
        className="border-b border-card-border/70 bg-gradient-to-b from-accent-muted/80 via-background to-background px-4 pb-8 pt-6 sm:pt-8"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {SITE.address.region}
          </p>
          <h1 className="mt-2 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Know Your Trade Value
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
            Search estimated trade values for game consoles, handhelds, phones, computers,
            accessories, and more.
          </p>

          <div className="mt-6 rounded-3xl border border-card-border bg-card p-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:p-4">
            <label htmlFor="trade-query" className="sr-only">
              Search trade values
            </label>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden>
                  ⌕
                </span>
                <input
                  id="trade-query"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search PlayStation 5, Nintendo Switch, Steam Deck, iPhone, Xbox..."
                  autoComplete="off"
                  className="min-h-14 w-full rounded-2xl border border-card-border bg-background py-3 pl-11 pr-4 text-base text-foreground placeholder:text-muted/60 focus:border-accent-secondary focus:outline-none focus:ring-2 focus:ring-accent-secondary/30 sm:min-h-16 sm:text-lg"
                />
              </div>

              <div
                className="inline-flex min-h-14 w-full rounded-2xl border border-card-border bg-background p-1 sm:min-h-16 lg:w-auto"
                role="group"
                aria-label="Device condition mode"
              >
                <button
                  type="button"
                  onClick={() => setConditionMode("working")}
                  className={`min-h-12 flex-1 rounded-xl px-4 text-sm font-semibold transition lg:min-w-[7.5rem] ${
                    conditionMode === "working"
                      ? "bg-accent text-background"
                      : "text-muted hover:text-foreground"
                  }`}
                  aria-pressed={conditionMode === "working"}
                >
                  ○ Working
                </button>
                <button
                  type="button"
                  onClick={() => setConditionMode("broken")}
                  className={`min-h-12 flex-1 rounded-xl px-4 text-sm font-semibold transition lg:min-w-[9rem] ${
                    conditionMode === "broken"
                      ? "bg-accent text-background"
                      : "text-muted hover:text-foreground"
                  }`}
                  aria-pressed={conditionMode === "broken"}
                >
                  🔧 Broken / Needs Repair
                </button>
              </div>
            </div>

            {conditionMode === "broken" ? (
              <p className="mt-3 rounded-xl bg-accent-muted px-3 py-2 text-sm font-medium text-foreground">
                🔧 {BROKEN_MODE_MESSAGE}
              </p>
            ) : null}
          </div>

          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {TRUST_BADGES.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-card-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-muted"
              >
                ✓ {badge}
              </li>
            ))}
          </ul>

          {showSampleBanner && sampleBannerText ? (
            <p
              className="mx-auto mt-4 max-w-3xl rounded-xl border border-accent/40 bg-accent-muted px-4 py-3 text-center text-xs leading-relaxed text-foreground sm:text-sm"
              role="note"
            >
              {sampleBannerText}
            </p>
          ) : null}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 pt-8" aria-labelledby="trade-categories-heading">
        <h2 id="trade-categories-heading" className="text-lg font-bold tracking-tight sm:text-xl">
          Browse by category
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {TRADE_CATEGORY_BUTTONS.map((button) => {
            const active = category === button.category;
            return (
              <button
                key={button.category}
                type="button"
                onClick={() => applyCategory(button.category)}
                className={`flex min-h-[92px] flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 text-center transition ${
                  active
                    ? "border-accent-secondary bg-accent-secondary-muted text-foreground shadow-[0_8px_24px_rgba(56,221,248,0.15)]"
                    : "border-card-border bg-card text-muted hover:border-accent-secondary/60 hover:text-foreground"
                }`}
                aria-pressed={active}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-xs font-bold text-accent">
                  {button.icon}
                </span>
                <span className="text-sm font-semibold">{button.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Popular searches */}
      <section className="mx-auto max-w-6xl px-4 pt-8" aria-labelledby="popular-searches-heading">
        <h2 id="popular-searches-heading" className="text-lg font-bold tracking-tight sm:text-xl">
          Popular Searches
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => applyPopularSearch(term)}
              className="min-h-11 rounded-full border border-card-border bg-card px-4 py-2 text-sm font-medium text-muted transition hover:border-accent hover:text-accent"
            >
              {term}
            </button>
          ))}
        </div>
      </section>

      {/* Broken advantage strip */}
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <div className="overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-r from-accent-muted to-accent-secondary-muted p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            PixelNation Advantage
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">We Buy Broken Devices</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
            Traditional trade counters often want working systems only. PixelNation repairs
            electronics—so broken HDMI, water damage, dead batteries, and no-power devices may
            still get an offer.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {BROKEN_DEVICE_EXAMPLES.map((example) => (
              <span
                key={example}
                className="rounded-full border border-card-border/60 bg-background/40 px-3 py-1.5 text-xs font-medium text-foreground"
              >
                {example}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-foreground">
            We May Still Make You An Offer
          </p>
          <div className="cta-group mt-5">
            <button
              type="button"
              onClick={() => {
                setConditionMode("broken");
                document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-background hover:bg-accent-hover"
            >
              Show Broken-Friendly Values
            </button>
            <Link
              href="/sell-to-pixelnation"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-card-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:border-accent-secondary"
            >
              Get Final Offer
            </Link>
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="mx-auto max-w-6xl px-4 pt-10" aria-live="polite">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              {hasActiveSearch ? "Search results" : "Estimated trade values"}
            </h2>
            <p className="mt-1 text-sm text-muted">
              Showing{" "}
              <span className="font-semibold text-foreground">{results.length}</span>{" "}
              {results.length === 1 ? "item" : "items"}
              {category !== "all" ? ` in ${category}` : ""}
              {conditionMode === "broken" ? " that may accept nonworking units" : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="trade-sort" className="sr-only">
              Sort results
            </label>
            <select
              id="trade-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as TradeFilterState["sort"])}
              className="min-h-11 rounded-xl border border-card-border bg-card px-3 py-2 text-sm text-foreground focus:border-accent-secondary focus:outline-none"
            >
              <option value="cash-desc">Highest cash</option>
              <option value="credit-desc">Highest store credit</option>
              <option value="name-asc">Name A–Z</option>
              <option value="updated-desc">Recently updated</option>
            </select>
            {(query || category !== "all" || conditionMode === "broken") && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                  setConditionMode("working");
                  setSort("cash-desc");
                }}
                className="min-h-11 rounded-xl border border-card-border px-4 py-2 text-sm font-semibold text-muted hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {results.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-card-border bg-card p-8 text-center">
            <p className="text-lg font-semibold">No matching items</p>
            <p className="mt-2 text-sm text-muted">
              Try another search, or{" "}
              <Link href="/sell-to-pixelnation" className="text-accent-secondary hover:underline">
                request a final offer
              </Link>{" "}
              for an unlisted device.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((item: PublicTradeItem, index) => (
              <TradeItemCard
                key={item.id}
                item={item}
                brokenMode={conditionMode === "broken"}
                priority={index < 3}
              />
            ))}
          </div>
        )}
      </section>

      {/* Discovery rails */}
      {!hasActiveSearch ? (
        <>
          <DiscoveryRail
            id="trending"
            title="Trending Searches"
            subtitle="Higher store-credit estimates right now"
            items={trending}
          />
          <DiscoveryRail
            id="recently-updated"
            title="Recently Updated Trade Values"
            subtitle="Fresh estimates from the latest list updates"
            items={recentlyUpdated}
          />
          <DiscoveryRail
            id="newest-consoles"
            title="Newest Consoles & Handhelds"
            subtitle="Popular gaming systems customers ask about most"
            items={newestConsoles}
          />
        </>
      ) : null}

      {/* Compact conversion strip */}
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <div className="rounded-3xl border border-card-border bg-card p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Ready for a final number?</h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Bring it in today for a fast in-store evaluation, or start with a final-offer
              request. Estimates are not guaranteed.
            </p>
          </div>
          <div className="cta-group mt-5 sm:mt-0 sm:shrink-0">
            <Link
              href="/sell-to-pixelnation"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-background hover:bg-accent-hover"
            >
              Bring It In Today
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-card-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-accent-secondary"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function DiscoveryRail({
  id,
  title,
  subtitle,
  items,
}: {
  id: string;
  title: string;
  subtitle: string;
  items: PublicTradeItem[];
}) {
  if (items.length === 0) return null;
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 pt-10" aria-labelledby={`${id}-heading`}>
      <div className="mb-4">
        <h2 id={`${id}-heading`} className="text-xl font-bold tracking-tight sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <TradeItemCard key={`${id}-${item.id}`} item={item} />
        ))}
      </div>
    </section>
  );
}
