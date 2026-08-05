import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { Section } from "@/components/Section";
import { TradeSearchPanel } from "@/components/trade/TradeSearchPanel";
import {
  CONDITION_LEVELS,
  HOW_TRADES_WORK,
  STORE_CREDIT_COPY,
  TRADE_FAQS,
  TRADE_VALUE_TERMS,
  TRADE_VALUES_METADATA,
} from "@/lib/trade/content";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getPublicTradeItems } from "@/lib/trade/store";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: TRADE_VALUES_METADATA.title,
  description: TRADE_VALUES_METADATA.description,
  path: TRADE_VALUES_METADATA.path,
  titleAbsolute: true,
  keywords: [...TRADE_VALUES_METADATA.keywords],
});

export default async function TradeValuesPage() {
  const { items, settings } = await getPublicTradeItems();

  return (
    <article>
      <TradeSearchPanel items={items} settings={settings} />

      {/* Secondary education — intentionally below the search app */}
      <div className="border-t border-card-border/70">
        <Section
          id="store-credit"
          title={STORE_CREDIT_COPY.title}
          subtitle={STORE_CREDIT_COPY.body}
        >
          <div className="cta-group">
            <Link
              href="/sell-to-pixelnation"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-background hover:bg-accent-hover"
            >
              Get Final Offer
            </Link>
            <Link
              href="/buy-sell-trade"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-card-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-accent-secondary"
            >
              Buy, Sell &amp; Trade overview
            </Link>
          </div>
        </Section>

        <Section
          id="how-trades-work"
          title="How It Works"
          subtitle="Find an estimate, bring it in, get inspected, choose cash or store credit."
          alt
        >
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_TRADES_WORK.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-card-border bg-card p-5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
              >
                <span className="text-sm font-bold text-accent">Step {index + 1}</span>
                <h3 className="mt-2 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="what-affects-offer"
          title="Trade Conditions"
          subtitle="Online values generally assume fully functional items in good condition unless noted."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {CONDITION_LEVELS.map((level) => (
              <div
                key={level.title}
                className="rounded-2xl border border-card-border bg-card p-5"
              >
                <h3 className="text-lg font-semibold text-foreground">{level.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {level.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-accent-secondary">✔</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="trade-faq" title="FAQ" alt>
          <FAQ items={[...TRADE_FAQS]} />
        </Section>

        <Section
          id="trade-value-terms"
          title="Trade Value Terms"
          subtitle="Please read before selling or trading."
        >
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted">
            {TRADE_VALUE_TERMS.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            Ready for a staff review?{" "}
            <Link href="/sell-to-pixelnation" className="text-accent-secondary hover:underline">
              Request a final offer
            </Link>{" "}
            or visit PixelNation in {SITE.address.region}.
          </p>
        </Section>
      </div>
    </article>
  );
}
