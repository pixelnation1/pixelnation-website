import Link from "next/link";
import { FinalOfferForm } from "@/components/trade/FinalOfferForm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { SELL_TO_PIXELNATION_METADATA, TRADE_ESTIMATE_NOTICE } from "@/lib/trade/content";
import { createPageMetadata } from "@/lib/seo/metadata";
import { toPublicTradeItem } from "@/lib/trade/format";
import { getPublicTradeItems } from "@/lib/trade/store";
import { SITE } from "@/lib/site";
import type { BreadcrumbItem } from "@/lib/seo/types";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: SELL_TO_PIXELNATION_METADATA.title,
  description: SELL_TO_PIXELNATION_METADATA.description,
  path: SELL_TO_PIXELNATION_METADATA.path,
  titleAbsolute: true,
  keywords: [...SELL_TO_PIXELNATION_METADATA.keywords],
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Buy, Sell & Trade", path: "/buy-sell-trade" },
  { name: "Sell to PixelNation", path: "/sell-to-pixelnation" },
];

type Props = {
  searchParams: Promise<{ product?: string }>;
};

export default async function SellToPixelNationPage({ searchParams }: Props) {
  const { product } = await searchParams;
  const { items, settings } = await getPublicTradeItems();
  const matched = product
    ? items.find((item) => item.slug === product) ?? null
    : null;
  const prefill = matched ? toPublicTradeItem(matched, settings) : null;

  return (
    <article>
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16"
        aria-labelledby="sell-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            {SITE.address.region}
          </p>
          <h1
            id="sell-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Get a Final Offer
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Tell us about the item you want to sell or trade. PixelNation will review your
            request and confirm next steps. Online values remain estimates until inspection.
          </p>
          <p className="mt-6 max-w-3xl rounded-xl border border-card-border bg-card/70 p-4 text-sm leading-relaxed text-muted">
            {TRADE_ESTIMATE_NOTICE}
          </p>
          <div className="cta-group mt-8">
            <Button href="/trade-values" variant="secondary">
              Browse Trade Values
            </Button>
            <Button href="/buy-sell-trade" variant="outline">
              Buy, Sell &amp; Trade hub
            </Button>
          </div>
        </div>
      </section>

      <Section
        id="final-offer-form"
        title="Final offer request"
        subtitle="Required fields help us prepare for inspection. Photos are optional."
      >
        <div className="mx-auto max-w-2xl rounded-2xl border border-card-border bg-card p-6 md:p-8">
          <FinalOfferForm prefill={prefill} />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-sm text-muted">
          Prefer to talk first? Call{" "}
          <a href={SITE.phoneHref} className="text-accent-secondary hover:underline">
            {SITE.phone}
          </a>{" "}
          or email{" "}
          <a href={SITE.emailHref} className="text-accent-secondary hover:underline">
            {SITE.email}
          </a>
          . Related:{" "}
          <Link href="/privacy-policy" className="text-accent-secondary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </Section>
    </article>
  );
}
