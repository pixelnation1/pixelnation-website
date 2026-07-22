import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { GameVisual } from "@/components/tcg/GameCard";
import { TcgPageStructuredData } from "@/components/tcg/TcgStructuredData";
import { TCG_LAUNCH } from "@/lib/tcg/launch";
import type { TcgGame } from "@/lib/tcg/types";
import { SITE } from "@/lib/site";
import type { BreadcrumbItem } from "@/lib/seo/types";

type GamePageTemplateProps = {
  game: TcgGame;
};

export function GamePageTemplate({ game }: GamePageTemplateProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: "Trading Cards", path: "/trading-cards" },
    { name: game.name, path: game.href },
  ];

  return (
    <article>
      <TcgPageStructuredData
        breadcrumbs={breadcrumbs}
        faq={game.faqs}
        pagePath={game.href}
        pageName={game.name}
        pageDescription={game.metaDescription}
      />

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-20"
        aria-labelledby="game-heading"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 lg:grid-cols-2">
          <div className="min-w-0">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              {SITE.address.region}
            </p>
            <h1
              id="game-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {game.name} in Emporia, KS
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              {game.intro}
            </p>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              {TCG_LAUNCH.availabilityNote}
            </p>
            <div className="cta-group mt-8">
              <Button href="/contact">Ask about availability</Button>
              <Button href="/buy-sell-trade" variant="secondary">
                Buy, Sell &amp; Trade
              </Button>
            </div>
          </div>
          <GameVisual
            name={game.shortName}
            accent={game.accent}
            className="mx-auto w-full max-w-md lg:max-w-none"
          />
        </div>
      </section>

      <Section
        id="categories"
        title="Product categories"
        subtitle={`What we support for ${game.name} as inventory expands.`}
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {game.productCategories.map((category) => (
            <li
              key={category.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{category.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {category.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="availability"
        title="Availability & services"
        subtitle="Honest launch-stage details—no invented stock or schedules."
        alt
      >
        <dl className="grid gap-4 sm:grid-cols-2">
          {[
            { term: "Sealed products", detail: game.sealedStatus },
            { term: "Singles", detail: game.singlesStatus },
            { term: "Accessories", detail: game.accessoriesStatus },
            { term: "Preorders", detail: game.preorderStatus },
            { term: "Organized play", detail: game.organizedPlayStatus },
            { term: "Buy, sell & trade", detail: game.buySellTradeStatus },
          ].map((item) => (
            <div
              key={item.term}
              className="rounded-xl border border-card-border bg-background/40 p-5"
            >
              <dt className="font-semibold text-foreground">{item.term}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <FAQ items={game.faqs} showHeading={false} />
      </Section>

      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16"
        aria-labelledby="game-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="game-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Visit or contact PixelNation
          </h2>
          <p className="mt-3 text-muted">
            Ask about {game.name} availability, preorders, or collection reviews in{" "}
            {SITE.address.region}.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Contact us</Button>
            <Button href={SITE.phoneHref} variant="secondary" external>
              Call {SITE.phone}
            </Button>
            <Button href="/trading-cards" variant="outline">
              All trading cards
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            Also explore{" "}
            <Link href="/events" className="text-accent hover:underline">
              events
            </Link>{" "}
            and{" "}
            <Link href="/gaming" className="text-accent hover:underline">
              gaming
            </Link>
            .
          </p>
        </div>
      </section>
    </article>
  );
}
