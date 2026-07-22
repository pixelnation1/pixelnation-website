import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { GameCardGrid } from "@/components/tcg/GameCard";
import { ProductImageGrid } from "@/components/tcg/ProductImageGrid";
import { TcgPageStructuredData } from "@/components/tcg/TcgStructuredData";
import { TCG_GAME_LIST } from "@/lib/tcg/games";
import { TCG_IMAGES, TRADING_CARDS_MIX_IMAGES } from "@/lib/tcg/images";
import { TCG_LAUNCH } from "@/lib/tcg/launch";
import { TCG_GENERAL_FAQS } from "@/lib/tcg/faqs";
import {
  TRADING_CARDS_CARRY_ITEMS,
  TRADING_CARDS_CARRY_NOTICE,
  TRADING_CARDS_COMMUNITY,
  TRADING_CARDS_HERO,
  TRADING_CARDS_METADATA,
  TRADING_CARDS_SECTIONS,
} from "@/lib/tcg/trading-cards-page";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/site";
import type { BreadcrumbItem } from "@/lib/seo/types";

export const metadata = createPageMetadata({
  title: TRADING_CARDS_METADATA.title,
  description: TRADING_CARDS_METADATA.description,
  path: TRADING_CARDS_METADATA.path,
  titleAbsolute: true,
  keywords: [
    "trading cards Emporia KS",
    "TCG Emporia",
    "local game store Emporia",
  ],
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Trading Cards", path: "/trading-cards" },
];

export default function TradingCardsPage() {
  return (
    <article>
      <TcgPageStructuredData
        breadcrumbs={breadcrumbs}
        faq={TCG_GENERAL_FAQS}
        pagePath="/trading-cards"
        pageName="Trading Cards & Gaming"
        pageDescription={TRADING_CARDS_METADATA.description}
        includeHobbyFocus
      />

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="tcg-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            {TRADING_CARDS_HERO.eyebrow}
          </p>
          <h1
            id="tcg-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {TRADING_CARDS_HERO.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {TRADING_CARDS_HERO.intro}
          </p>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            {TCG_LAUNCH.availabilityNote}
          </p>
          <div className="cta-group mt-8">
            <Button href="#games">Explore Supported Games</Button>
            <Button href="/events" variant="secondary">
              View Events
            </Button>
            <Button href="/buy-sell-trade" variant="outline">
              Buy, Sell &amp; Trade
            </Button>
          </div>
          <div className="relative mt-10 aspect-[1024/412] w-full overflow-hidden rounded-2xl border border-card-border">
            <Image
              src={TCG_IMAGES.shopBanner.src}
              alt={TCG_IMAGES.shopBanner.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1152px) 100vw, 1120px"
              priority
            />
          </div>
        </div>
      </section>

      <Section
        id="what-we-carry"
        title="What we carry"
        subtitle="PixelNation carries or plans to carry a broad range of trading-card products and supplies."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TRADING_CARDS_CARRY_ITEMS.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          {TRADING_CARDS_CARRY_NOTICE}
        </p>
        <ProductImageGrid images={TRADING_CARDS_MIX_IMAGES} columns={3} className="mt-8" />
        <div className="mt-8">
          <Button href="/what-we-carry" variant="secondary">
            Full product guide
          </Button>
        </div>
      </Section>

      <Section
        id="games"
        title="Supported games"
        subtitle="Explore dedicated pages for each trading card game we support."
        alt
      >
        <GameCardGrid games={TCG_GAME_LIST} />
      </Section>

      <Section
        id="sealed"
        title={TRADING_CARDS_SECTIONS.sealed.title}
        subtitle={TRADING_CARDS_SECTIONS.sealed.body}
      >
        <p className="max-w-3xl text-sm text-muted">
          {TCG_LAUNCH.contactAvailability}
        </p>
      </Section>

      <Section
        id="singles"
        title={TRADING_CARDS_SECTIONS.singles.title}
        subtitle={TRADING_CARDS_SECTIONS.singles.body}
        alt
      >
        <p className="max-w-3xl text-sm text-muted">
          Browse game pages for singles interest, or contact us with specific requests.
        </p>
      </Section>

      <Section
        id="preorders"
        title={TRADING_CARDS_SECTIONS.preorders.title}
        subtitle={TRADING_CARDS_SECTIONS.preorders.body}
      >
        <div className="cta-group">
          <Button href="/preorders-new-releases">Preorders &amp; New Releases</Button>
          <Button href="/contact" variant="secondary">
            Contact about preorders
          </Button>
        </div>
      </Section>

      <Section
        id="buy-sell-trade"
        title={TRADING_CARDS_SECTIONS.buySellTrade.title}
        subtitle={TRADING_CARDS_SECTIONS.buySellTrade.body}
        alt
      >
        <Button href="/buy-sell-trade">Learn about Buy, Sell &amp; Trade</Button>
      </Section>

      <Section
        id="community"
        title={TRADING_CARDS_COMMUNITY.title}
        subtitle={TRADING_CARDS_COMMUNITY.intro}
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TRADING_CARDS_COMMUNITY.audiences.map((audience) => (
            <li
              key={audience}
              className="flex gap-2 rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary"
                aria-hidden
              />
              {audience}
            </li>
          ))}
        </ul>
        <div className="cta-group mt-8">
          <Button href="/gaming">Explore Gaming</Button>
          <Button href="/events" variant="secondary">
            View Events
          </Button>
        </div>
      </Section>

      <Section
        id="events-callout"
        title={TRADING_CARDS_SECTIONS.events.title}
        subtitle={TRADING_CARDS_SECTIONS.events.body}
        alt
      >
        <Button href="/events">View Events</Button>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <FAQ items={TCG_GENERAL_FAQS} showHeading={false} initialVisible={8} />
      </Section>

      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16"
        aria-labelledby="tcg-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="tcg-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Visit or contact PixelNation
          </h2>
          <p className="mt-3 text-muted">
            Questions about trading cards, gaming, or repairs in {SITE.address.region}?
            We are here to help.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Contact us</Button>
            <Button href={SITE.phoneHref} variant="secondary" external>
              Call {SITE.phone}
            </Button>
            <Button href="/repairs" variant="outline">
              Explore Repairs
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            Still need device help?{" "}
            <Link href="/repairs" className="text-accent hover:underline">
              Browse repair services
            </Link>
            .
          </p>
        </div>
      </section>
    </article>
  );
}
