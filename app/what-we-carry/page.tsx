import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { ProductImageGrid } from "@/components/tcg/ProductImageGrid";
import { TcgPageStructuredData } from "@/components/tcg/TcgStructuredData";
import {
  CARRY_AVAILABILITY_NOTICE,
  CARRY_CATEGORIES,
  WHAT_WE_CARRY_FAQS,
  WHAT_WE_CARRY_METADATA,
} from "@/lib/tcg/what-we-carry-page";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/site";
import type { BreadcrumbItem } from "@/lib/seo/types";

export const metadata = createPageMetadata({
  title: WHAT_WE_CARRY_METADATA.title,
  description: WHAT_WE_CARRY_METADATA.description,
  path: WHAT_WE_CARRY_METADATA.path,
  titleAbsolute: true,
  keywords: [
    "trading cards Emporia Kansas",
    "gaming store Emporia Kansas",
    "card supplies Emporia",
  ],
});

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Home", path: "/" },
  { name: "Trading Cards", path: "/trading-cards" },
  { name: "What We Carry", path: "/what-we-carry" },
];

function availabilityLabel(
  availability: (typeof CARRY_CATEGORIES)[number]["availability"],
): string {
  switch (availability) {
    case "current":
      return "Available now";
    case "planned":
      return "Planned";
    default:
      return "Available & expanding";
  }
}

export default function WhatWeCarryPage() {
  return (
    <article>
      <TcgPageStructuredData
        breadcrumbs={breadcrumbs}
        faq={WHAT_WE_CARRY_FAQS}
        pagePath="/what-we-carry"
        pageName="What We Carry"
        pageDescription={WHAT_WE_CARRY_METADATA.description}
        includeHobbyFocus
      />

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="carry-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            {SITE.address.region}
          </p>
          <h1
            id="carry-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            What We Carry
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            A guide to the trading-card and gaming product categories PixelNation
            carries or plans to carry in Emporia, Kansas. This is an informational
            overview, not a live inventory catalog.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            {CARRY_AVAILABILITY_NOTICE}
          </p>
          <div className="cta-group mt-8">
            <Button href="/contact">Check availability</Button>
            <Button href="/trading-cards" variant="secondary">
              Trading Cards Overview
            </Button>
          </div>
        </div>
      </section>

      {CARRY_CATEGORIES.map((category, index) => (
        <Section
          key={category.id}
          id={category.id}
          title={category.title}
          subtitle={category.intro}
          alt={index % 2 === 1}
        >
          <p className="-mt-4 mb-6 text-xs font-semibold uppercase tracking-wide text-accent-secondary">
            {availabilityLabel(category.availability)}
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-card-border bg-card px-4 py-3 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
          {category.images && category.images.length > 0 ? (
            <ProductImageGrid images={category.images} className="mt-8" />
          ) : null}
          {category.note ? (
            <p className="mt-6 max-w-3xl text-sm text-muted">{category.note}</p>
          ) : null}
        </Section>
      ))}

      <Section id="faq" title="Frequently asked questions" alt>
        <FAQ items={WHAT_WE_CARRY_FAQS} showHeading={false} />
      </Section>

      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16"
        aria-labelledby="carry-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="carry-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Looking for something specific?
          </h2>
          <p className="mt-3 text-muted">
            Contact PixelNation to check availability on any product, card, or
            accessory.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Contact PixelNation</Button>
            <Button href={SITE.phoneHref} variant="secondary" external>
              Call {SITE.phone}
            </Button>
            <Button href="/preorders-new-releases" variant="outline">
              Preorders &amp; New Releases
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
