import Link from "next/link";
import { notFound } from "next/navigation";
import { TradeItemCard } from "@/components/trade/TradeItemCard";
import { TradeProductImage } from "@/components/trade/TradeProductImage";
import { accessoryBadges, conditionBadges } from "@/lib/trade/badges";
import { BROKEN_DEVICE_EXAMPLES, TRUST_BADGES } from "@/lib/trade/ui-config";
import { formatCents, formatTradeDate, toPublicTradeItem } from "@/lib/trade/format";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getPublicTradeItems } from "@/lib/trade/store";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { items, settings } = await getPublicTradeItems();
  const item = items.find((row) => row.slug === slug);
  if (!item) {
    return createPageMetadata({
      title: "Trade Value Not Found | PixelNation",
      description: "This trade value listing could not be found.",
      path: `/trade-values/${slug}`,
      noIndex: true,
      titleAbsolute: true,
    });
  }

  const pub = toPublicTradeItem(item, settings);
  return createPageMetadata({
    title: `${item.name} Trade Value | PixelNation Emporia KS`,
    description: `Estimated cash ${formatCents(pub.displayCashCents)} or store credit ${formatCents(pub.displayStoreCreditCents)} for ${item.name}. Final offer after in-store inspection in Emporia, Kansas.`,
    path: `/trade-values/${item.slug}`,
    titleAbsolute: true,
  });
}

export default async function TradeValueDetailPage({ params }: Props) {
  const { slug } = await params;
  const { items, settings } = await getPublicTradeItems();
  const match = items.find((row) => row.slug === slug);
  if (!match) notFound();

  const item = toPublicTradeItem(match, settings);
  const accessories = accessoryBadges(item.requiredAccessories);
  const conditions = conditionBadges(item, false);
  const related = items
    .filter((row) => row.id !== item.id && row.category === item.category)
    .slice(0, 3)
    .map((row) => toPublicTradeItem(row, settings));
  const offerHref = `/sell-to-pixelnation?product=${encodeURIComponent(item.slug)}`;

  return (
    <article className="pb-16">
      <div className="border-b border-card-border/70 bg-gradient-to-b from-accent-muted/50 to-background">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:py-12">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-card-border bg-white shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
            <TradeProductImage
              src={item.imageUrl}
              alt={item.name}
              itemId={item.id}
              priority
              className="object-contain object-center p-8"
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </div>

          <div>
            <nav className="text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/trade-values" className="hover:text-accent">
                Trade Values
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{item.name}</span>
            </nav>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {item.brand} · {item.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {item.name}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {[item.model, item.storage].filter(Boolean).join(" · ") || "Verified in store"}
            </p>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Estimated Trade Value
              </p>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-card-border bg-card px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Cash
                  </p>
                  <p className="mt-1 text-3xl font-bold tabular-nums">
                    {formatCents(item.displayCashCents)}
                  </p>
                </div>
                <div className="rounded-2xl border border-accent-secondary/50 bg-accent-secondary-muted px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
                    Store Credit
                  </p>
                  <p className="mt-1 text-3xl font-bold tabular-nums text-accent-secondary">
                    {formatCents(item.displayStoreCreditCents)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {conditions.map((badge) => (
                <span
                  key={badge.label}
                  className={
                    badge.tone === "repair"
                      ? "rounded-full bg-accent-muted px-3 py-1.5 text-xs font-medium text-accent"
                      : "rounded-full bg-accent-secondary-muted px-3 py-1.5 text-xs font-medium text-accent-secondary"
                  }
                >
                  {badge.tone === "repair" ? "🔧 " : "✔ "}
                  {badge.label}
                </span>
              ))}
              {accessories.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-card-border px-3 py-1.5 text-xs font-medium text-muted"
                >
                  ✔ {badge}
                </span>
              ))}
            </div>

            <p className="mt-4 text-sm text-muted">
              Last updated {formatTradeDate(item.updatedAt)} · Estimates only — final offer after
              inspection.
            </p>

            <div className="cta-group mt-6">
              <Link
                href={offerHref}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-background hover:bg-accent-hover"
              >
                Bring It In Today
              </Link>
              {item.repairHref ? (
                <Link
                  href={item.repairHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-card-border px-5 py-3 text-sm font-semibold hover:border-accent-secondary"
                >
                  Repair Instead
                </Link>
              ) : null}
              <a
                href={SITE.phoneHref}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-card-border px-5 py-3 text-sm font-semibold hover:border-accent-secondary"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 pt-10 lg:grid-cols-3">
        <section className="rounded-2xl border border-card-border bg-card p-5 lg:col-span-1">
          <h2 className="text-lg font-bold">Condition Expectations</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.conditionNote}</p>
          <p className="mt-4 text-xs text-muted">
            Listed values generally assume a fully functional item in good condition unless noted.
          </p>
        </section>

        <section className="rounded-2xl border border-card-border bg-card p-5 lg:col-span-1">
          <h2 className="text-lg font-bold">Required Accessories</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {item.requiredAccessories || "Bring every cable, controller, dock, and charger you have."}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {(accessories.length ? accessories : ["Bring all original accessories"]).map((badge) => (
              <li key={badge} className="flex gap-2">
                <span className="text-accent-secondary">✔</span>
                <span>{badge}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-accent/40 bg-accent-muted/40 p-5 lg:col-span-1">
          <h2 className="text-lg font-bold">Common Accepted Problems</h2>
          {item.acceptsNonworking ? (
            <>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.nonworkingNote ||
                  "PixelNation may still make an offer because we repair electronics."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {BROKEN_DEVICE_EXAMPLES.slice(0, 6).map((example) => (
                  <span
                    key={example}
                    className="rounded-full border border-card-border/70 bg-background/40 px-2.5 py-1 text-xs"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Working condition is preferred for this listing. Ask in store if your unit has issues.
            </p>
          )}
        </section>
      </div>

      <div className="mx-auto mt-6 grid max-w-6xl gap-6 px-4 md:grid-cols-2">
        <section className="rounded-2xl border border-card-border bg-card p-5">
          <h2 className="text-lg font-bold">Inspection Time</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Many evaluations are completed during your visit. Timing depends on the device, testing
            needed, and how busy the shop is. No appointment is required, but calling ahead can help
            during peak hours.
          </p>
        </section>
        <section className="rounded-2xl border border-card-border bg-card p-5">
          <h2 className="text-lg font-bold">Why PixelNation</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {TRUST_BADGES.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-card-border px-3 py-1.5 text-xs text-muted"
              >
                ✓ {badge}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 pt-12">
          <h2 className="text-2xl font-bold tracking-tight">Related Products</h2>
          <p className="mt-1 text-sm text-muted">More {item.category} trade estimates</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((relatedItem) => (
              <TradeItemCard key={relatedItem.id} item={relatedItem} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
