import Link from "next/link";
import { FaqSection } from "@/components/faq/FaqSection";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { ShopStructuredData } from "@/components/shop/ShopStructuredData";
import { ShopifyButton } from "@/components/shop/ShopifyButton";
import { Button } from "@/components/ui/Button";
import { toSchemaFaqs } from "@/lib/faq/utils";
import { createPageMetadata } from "@/lib/seo/metadata";
import { shopBreadcrumbs } from "@/lib/seo/schema";
import {
  SHOP_CATEGORIES,
  SHOP_CONVERSATIONAL_QUERIES,
  SHOP_FAQS,
  SHOP_GEO_COPY,
  SHOP_HERO_BULLETS,
  SHOP_METADATA,
  SHOP_PRODUCT_CARDS,
  SHOPIFY_STORE_URL,
} from "@/lib/shop";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadata({
  title: SHOP_METADATA.title,
  description: SHOP_METADATA.description,
  path: SHOP_METADATA.path,
  ogImage: "/images/151etb.jpg",
  titleAbsolute: true,
  keywords: [
    "Magic The Gathering Emporia KS",
    "Pokémon cards Emporia Kansas",
    "TCG shop Kansas",
    "sealed booster boxes",
    "playmats",
    "collector boxes",
    "trading card gifts",
  ],
});

export default function ShopPage() {
  const faqItems = SHOP_FAQS.map((item) => ({ ...item }));
  const breadcrumbs = shopBreadcrumbs();

  return (
    <>
      <ShopStructuredData faq={toSchemaFaqs(faqItems)} />

      <article>
        <section className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24">
          <div className="mx-auto max-w-6xl min-w-0 px-4">
            <Breadcrumbs items={breadcrumbs} />
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                  PixelNation Shop · {SITE.address.region}
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Shop Magic: The Gathering, Pokémon &amp; TCG Products
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                  Browse sealed trading card products, playmats, collector boxes,
                  and gaming gifts from PixelNation—your Emporia, Kansas gaming
                  shop with online ordering across the United States.
                </p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {SHOP_HERO_BULLETS.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-lg border border-card-border bg-card/70 px-4 py-3 text-sm text-muted"
                    >
                      <span
                        className="mt-0.5 font-semibold text-accent-secondary"
                        aria-hidden
                      >
                        +
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="cta-group mt-8">
                  <ShopifyButton ariaLabel="Shop trading card products on the PixelNation Shopify store">
                    Shop Trading Card Products
                  </ShopifyButton>
                  <Button href="/contact" variant="secondary">
                    Visit Us in Emporia
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {SHOP_PRODUCT_CARDS.slice(0, 4).map((product, index) => (
                  <ShopProductCard
                    key={product.title}
                    product={product}
                    priorityImage={index < 2}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Section
          title="What can you shop at PixelNation?"
          subtitle="PixelNation carries trading card game products for players, collectors, and gift shoppers—online through our Shopify store and locally in Emporia, Kansas."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SHOP_CATEGORIES.map((category) => (
              <div
                key={category}
                className="rounded-xl border border-card-border bg-card px-5 py-4 font-semibold text-foreground"
              >
                {category}
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl leading-relaxed text-muted">{SHOP_GEO_COPY}</p>
          <div className="cta-group mt-8">
            <ShopifyButton
              variant="secondary"
              ariaLabel="Browse Magic The Gathering and Pokémon products on Shopify"
            >
              Browse MTG &amp; Pokémon
            </ShopifyButton>
            <Button href="/console-repair" variant="outline">
              Console Repair Services
            </Button>
          </div>
        </Section>

        <Section
          title="Shop sealed TCG products"
          subtitle="Factory-sealed Magic: The Gathering, Pokémon, and collector products with SEO-friendly categories for players and collectors."
          alt
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SHOP_PRODUCT_CARDS.map((product, index) => (
              <ShopProductCard
                key={product.title}
                product={product}
                priorityImage={index < 3}
              />
            ))}
          </div>
        </Section>

        <Section title="Emporia, Kansas gaming shop with nationwide online ordering">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-card-border bg-card p-6 md:p-8">
              <h3 className="text-xl font-semibold">Local shop in Emporia, KS</h3>
              <p className="mt-3 leading-relaxed text-muted">
                PixelNation serves gamers and trading card collectors in{" "}
                {SITE.address.region}. Stop by during business hours to shop sealed
                products, ask about availability, or pick up online orders when
                applicable.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>{SITE.address.region}</li>
                <li>{SITE.hours}</li>
                <li>
                  <a href={SITE.phoneHref} className="hover:text-accent-secondary">
                    {SITE.phone}
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-card-border bg-card p-6 md:p-8">
              <h3 className="text-xl font-semibold">Online customers across the U.S.</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Order Magic: The Gathering, Pokémon Elite Trainer Boxes, playmats,
                collector boxes, and gaming gifts through our Shopify store with
                shipping available to customers across the United States.
              </p>
              <div className="mt-6">
                <ShopifyButton ariaLabel="Visit the PixelNation Shopify store online">
                  Visit the PixelNation Store
                </ShopifyButton>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Why shop TCG products at PixelNation?" alt>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-card-border bg-background/70 p-5">
              <h3 className="text-lg font-semibold">For players</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Fresh Play Boosters, sealed boxes, and accessories for Standard,
                Commander, Pokémon league nights, and casual game groups.
              </p>
            </div>
            <div className="rounded-xl border border-card-border bg-background/70 p-5">
              <h3 className="text-lg font-semibold">For collectors</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Collector booster boxes, Elite Trainer Boxes, and premium sealed
                releases ideal for collecting promo cards, alt arts, and showcase
                cards.
              </p>
            </div>
            <div className="rounded-xl border border-card-border bg-background/70 p-5">
              <h3 className="text-lg font-semibold">For gift shoppers</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Sealed TCG products make strong gifts for birthdays, holidays, and
                gamers who want factory-fresh boosters instead of single-card
                guesswork.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Related PixelNation services">
          <RelatedLinks currentPath="/shop" />
        </Section>

        <Section
          id="shop-faq"
          title="Shop FAQ"
          subtitle="Answers about Magic: The Gathering, Pokémon, shipping, collectors, and shopping at PixelNation in Emporia, Kansas."
          alt
        >
          <FaqSection
            items={faqItems}
            id="shop-faq-accordion"
            title="Shop frequently asked questions"
            showPeopleAlsoAsk
            conversationalQueries={[...SHOP_CONVERSATIONAL_QUERIES]}
            featuredAnswer={SHOP_GEO_COPY}
            initialVisible={6}
          />
        </Section>

        <section className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to shop trading card products?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted">
              Browse Magic: The Gathering, Pokémon, sealed TCG products, playmats,
              and collector boxes at the PixelNation Shopify store—or visit us in
              Emporia, Kansas.
            </p>
            <div className="cta-group mt-8 justify-center">
              <ShopifyButton ariaLabel="Shop trading card products on Shopify">
                Shop Trading Card Products
              </ShopifyButton>
              <ShopifyButton
                variant="secondary"
                ariaLabel="Browse Magic and Pokémon on the PixelNation store"
              >
                Browse MTG &amp; Pokémon
              </ShopifyButton>
              <Button href="/contact" variant="outline">
                Contact PixelNation
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted">
              <a
                href={SHOPIFY_STORE_URL}
                className="hover:text-accent-secondary"
                aria-label="Visit the PixelNation Shopify store"
              >
                PixelNation Store
              </a>
              <Link href="/repairs" className="hover:text-accent-secondary">
                Repairs
              </Link>
              <Link href="/console-repair" className="hover:text-accent-secondary">
                Console Repair
              </Link>
              <Link href="/knowledge" className="hover:text-accent-secondary">
                Knowledge Hub
              </Link>
              <Link href="/contact" className="hover:text-accent-secondary">
                Contact
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
