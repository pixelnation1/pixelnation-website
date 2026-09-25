import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PortfolioStructuredData } from "@/components/portfolio/PortfolioStructuredData";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/seo/metadata";
import { portfolioBreadcrumbs } from "@/lib/seo/schema";
import { SITE } from "@/lib/site";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_METADATA,
  PORTFOLIO_PROJECTS,
} from "@/lib/portfolio";

export const metadata = createPageMetadata({
  title: PORTFOLIO_METADATA.title,
  description: PORTFOLIO_METADATA.description,
  path: PORTFOLIO_METADATA.path,
  titleAbsolute: true,
  ogImage: "/images/pixellogo.png",
  ogImageAlt: "PixelNation software development portfolio",
});

export default function PortfolioPage() {
  return (
    <article>
      <PortfolioStructuredData />

      <section
        className="relative overflow-hidden border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="portfolio-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, color-mix(in oklab, var(--accent) 28%, transparent), transparent 42%), radial-gradient(circle at 82% 30%, color-mix(in oklab, var(--accent-secondary) 22%, transparent), transparent 46%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl min-w-0 px-4 text-center">
          <Breadcrumbs items={portfolioBreadcrumbs()} className="justify-center" />
          <p className="mb-2 mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            PixelNation · Software Development
          </p>
          <h1
            id="portfolio-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Real projects. Real products.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Built to solve real problems—websites, SaaS platforms, and custom software from
            PixelNation.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Start Your Project</Button>
            <Button href="/software-development" variant="secondary">
              Software Services
            </Button>
          </div>
        </div>
      </section>

      <Section
        id="categories"
        title="Portfolio categories"
        subtitle="Websites, SaaS platforms, and custom applications."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_CATEGORIES.map((category) => (
            <article
              key={category.id}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{category.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{category.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="projects"
        title="Featured projects"
        subtitle="Filter by project type or browse the full portfolio. Each project includes a detailed case study."
        alt
      >
        <PortfolioGrid projects={PORTFOLIO_PROJECTS} />
      </Section>

      <section className="border-t border-card-border py-12 sm:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4">
          <RelatedLinks currentPath="/portfolio" title="Explore PixelNation" />
        </div>
      </section>

      <section
        id="portfolio-cta"
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
        aria-labelledby="portfolio-cta-heading"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="portfolio-cta-heading" className="text-2xl font-bold sm:text-3xl">
            Need something similar?
          </h2>
          <p className="mt-3 text-muted">
            Let&apos;s talk about your website, SaaS idea, or automation challenge. We&apos;ll
            recommend a practical path forward and build software that fits your business.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href="/contact">Let&apos;s Talk</Button>
            <Button href="/software-development/website-development" variant="secondary">
              Website Development
            </Button>
            <Button href={SITE.phoneHref} variant="outline" external>
              Call {SITE.phone}
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            Based in {SITE.address.region} · Serving businesses nationwide
          </p>
        </div>
      </section>
    </article>
  );
}
