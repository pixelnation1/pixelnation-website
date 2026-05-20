import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { ShopStructuredData } from "@/components/services/ShopStructuredData";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  AEO_ANSWERS,
  FEATURED_PRODUCTS,
  HERO_BULLETS,
  HOT_PRODUCTS,
  SHOP_CATEGORIES,
  SHOP_FAQ,
  SHOP_METADATA,
  SHOPIFY_STORE_URL,
  WHY_SHOP,
} from "@/lib/shop-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: SHOP_METADATA.title,
  description: SHOP_METADATA.description,
  alternates: { canonical: SHOP_METADATA.canonical },
  openGraph: {
    title: SHOP_METADATA.title,
    description: SHOP_METADATA.description,
    type: "website",
    url: SHOP_METADATA.canonical,
  },
};

export default function ShopPage() {
  return (
    <article>
      <ShopStructuredData />

      {/* Hero */}
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="shop-heading"
      >
        <div className="mx-auto grid max-w-6xl min-w-0 items-center gap-8 px-4 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="min-w-0 order-1 lg:order-none">
            <nav className="mb-3 text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Shop</span>
            </nav>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              TCG Store Emporia KS · Local Game Store
            </p>
            <h1
              id="shop-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Pokémon, Magic: The Gathering & TCG Products
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Discover booster boxes, elite trainer boxes, play boosters, accessories,
              and collectible products for Pokémon and Magic: The Gathering.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              {HERO_BULLETS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="cta-group mt-8">
              <Button href={SHOPIFY_STORE_URL} external>
                Shop on Shopify
              </Button>
            </div>
          </div>
          <div className="order-2 flex w-full justify-center lg:order-none lg:justify-end">
            <div className="shop-hero-float w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[580px]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-amber-400/30 bg-background/50 p-6 shadow-2xl shadow-black/50 ring-1 ring-accent/15 sm:p-8">
                <Image
                  src="/images/151etb.jpg"
                  alt="Pokémon Scarlet and Violet 151 Elite Trainer Box"
                  fill
                  className="h-full w-full object-contain object-center drop-shadow-[0_16px_32px_rgba(0,0,0,0.45)]"
                  sizes="(max-width: 640px) 380px, (max-width: 1024px) 420px, 580px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <Section
        id="featured"
        title="Featured products"
        subtitle="Pokémon and Magic sealed product available through PixelNation's Shopify store."
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PRODUCTS.map((product, index) => (
            <ShopProductCard
              key={product.title}
              {...product}
              priority={index < 3}
            />
          ))}
        </div>
      </Section>

      {/* Shop by category */}
      <Section
        id="categories"
        title="Shop by category"
        subtitle="Everything collectors and players need for Pokémon, Magic, and tabletop gaming."
        alt
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHOP_CATEGORIES.map((cat) => (
            <a
              key={cat.title}
              href={SHOPIFY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-card-border bg-card p-5 transition hover:border-accent hover:shadow-md hover:shadow-accent/10"
            >
              <h3 className="font-semibold text-foreground group-hover:text-accent">
                {cat.title}
              </h3>
              <p className="mt-1 text-xs font-medium text-accent-secondary">
                {cat.keyword}
              </p>
              <p className="mt-2 text-sm text-muted">{cat.description}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-accent">
                Shop now →
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* Why shop */}
      <Section
        id="why-shop"
        title="A local store built for players and collectors"
        subtitle="More than an online listing—a Emporia shop rooted in gaming and community."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_SHOP.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Hot products */}
      <Section
        id="hot-products"
        title="Popular products and new arrivals"
        subtitle="Collector favorites, limited releases, and gift-ready TCG picks."
        alt
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {HOT_PRODUCTS.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
            >
              <span className="text-lg text-accent" aria-hidden>
                ★
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href={SHOPIFY_STORE_URL} external>
            Shop new arrivals
          </Button>
        </div>
      </Section>

      {/* Quick answers */}
      <Section
        id="quick-answers"
        title="Quick answers"
        subtitle="Pokémon, Magic, and online shopping at PixelNation."
      >
        <div className="space-y-6">
          {AEO_ANSWERS.map((item) => (
            <article
              key={item.question}
              className="rounded-xl border border-card-border bg-card p-5"
              itemScope
              itemType="https://schema.org/Question"
            >
              <h3 className="font-semibold text-foreground" itemProp="name">
                {item.question}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed text-muted"
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <span itemProp="text">{item.answer}</span>
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="Shop FAQ" subtitle="Products, ordering, accessories, and visiting Emporia.">
        <FAQ items={SHOP_FAQ} />
      </Section>

      {/* Shopify CTA */}
      <section
        id="shop-cta"
        className="border-t border-card-border bg-gradient-to-r from-accent-muted via-accent-secondary-muted to-accent-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="shop-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="shop-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Ready to build your collection?
          </h2>
          <p className="mt-3 text-muted">
            Browse Pokémon, Magic: The Gathering, and gaming accessories on the
            PixelNation Shopify store.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href={SHOPIFY_STORE_URL} external>
              Shop on Shopify
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            {SITE.name} · {SITE.address.region} · {SITE.hours}
          </p>
          <nav
            className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted"
            aria-label="Related pages"
          >
            <Link href="/contact" className="hover:text-accent">
              Contact
            </Link>
            <Link href="/training" className="hover:text-accent">
              Training
            </Link>
            <Link href="/repairs" className="hover:text-accent">
              Repairs
            </Link>
            <Link href="/about" className="hover:text-accent">
              About
            </Link>
          </nav>
        </div>
      </section>
    </article>
  );
}
