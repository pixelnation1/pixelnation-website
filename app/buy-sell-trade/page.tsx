import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { TcgPageStructuredData } from "@/components/tcg/TcgStructuredData";
import {
  BUY_SELL_ELIGIBLE_ITEMS,
  BUY_SELL_FAQS,
  BUY_SELL_POLICIES,
  BUY_SELL_TRADE_METADATA,
} from "@/lib/tcg/buy-sell-trade-page";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/site";
import type { BreadcrumbItem } from "@/lib/seo/types";

export const metadata = createPageMetadata({
  title: BUY_SELL_TRADE_METADATA.title,
  description: BUY_SELL_TRADE_METADATA.description,
  path: BUY_SELL_TRADE_METADATA.path,
  titleAbsolute: true,
  keywords: [
    "sell trading cards Emporia",
    "trade cards Kansas",
    "buy sell trade Emporia KS",
  ],
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Trading Cards", path: "/trading-cards" },
  { name: "Buy, Sell & Trade", path: "/buy-sell-trade" },
];

export default function BuySellTradePage() {
  return (
    <article>
      <TcgPageStructuredData
        breadcrumbs={breadcrumbs}
        faq={BUY_SELL_FAQS}
        pagePath="/buy-sell-trade"
        pageName="Buy, Sell & Trade"
        pageDescription={BUY_SELL_TRADE_METADATA.description}
        includeHobbyFocus
      />

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="buy-sell-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            {SITE.address.region}
          </p>
          <h1
            id="buy-sell-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Buy, Sell &amp; Trade
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            PixelNation plans to purchase and accept trades for eligible trading cards,
            collections, sealed products, video games, consoles, and gaming accessories
            as our Emporia location expands.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            We do not provide automatic online price quotes. Request a collection review
            and our team will evaluate eligible items.
          </p>
          <div className="cta-group mt-8">
            <Button href="/contact">Request a Collection Review</Button>
            <Button href={SITE.phoneHref} variant="secondary" external>
              Call {SITE.phone}
            </Button>
          </div>
        </div>
      </section>

      <Section
        id="eligible"
        title="Eligible items"
        subtitle="We may purchase or accept trades for products such as:"
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BUY_SELL_ELIGIBLE_ITEMS.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="policies"
        title="How evaluation works"
        subtitle="Clear expectations before you bring or ship a collection."
        alt
      >
        <ul className="max-w-3xl space-y-3">
          {BUY_SELL_POLICIES.map((policy) => (
            <li
              key={policy}
              className="flex gap-3 text-sm leading-relaxed text-muted"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden
              />
              {policy}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <FAQ items={BUY_SELL_FAQS} showHeading={false} />
      </Section>

      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16"
        aria-labelledby="buy-sell-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="buy-sell-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Ready for a collection review?
          </h2>
          <p className="mt-3 text-muted">
            Tell us what you have—trading cards, games, or consoles—and we will follow up.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Request a Collection Review</Button>
            <Button href="/trading-cards" variant="secondary">
              Back to Trading Cards
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
