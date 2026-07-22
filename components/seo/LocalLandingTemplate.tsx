import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { TcgPageStructuredData } from "@/components/tcg/TcgStructuredData";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import type { LocalLandingPage } from "@/lib/seo/local-landings";
import { toSchemaFaqs } from "@/lib/faq/utils";
import { SITE } from "@/lib/site";
import type { BreadcrumbItem } from "@/lib/seo/types";

type LocalLandingTemplateProps = {
  page: LocalLandingPage;
};

export function LocalLandingTemplate({ page }: LocalLandingTemplateProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: page.h1, path: page.path },
  ];

  const faqSchema = toSchemaFaqs(page.faqs);
  const isRepair = page.schemaKind === "repair";

  return (
    <article>
      {isRepair ? (
        <PageStructuredData
          breadcrumbs={breadcrumbs}
          faq={faqSchema}
          service={{
            name: page.h1,
            serviceType: "Game Console Repair",
            description: page.intro,
            path: page.path,
          }}
        />
      ) : (
        <TcgPageStructuredData
          breadcrumbs={breadcrumbs}
          faq={page.faqs}
          pagePath={page.path}
          pageName={page.h1}
          pageDescription={page.metaDescription}
          includeHobbyFocus={page.schemaKind !== "service"}
        />
      )}

      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
        aria-labelledby="local-landing-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            {page.eyebrow}
          </p>
          <h1
            id="local-landing-heading"
            className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {page.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {page.intro}
          </p>
          <div className="cta-group mt-8">
            <Button href={page.primaryCta.href}>{page.primaryCta.label}</Button>
            <Button href={page.secondaryCta.href} variant="secondary">
              {page.secondaryCta.label}
            </Button>
            <Button href={SITE.phoneHref} variant="outline" external>
              Call {SITE.phone}
            </Button>
          </div>
        </div>
      </section>

      {page.sections.map((section, index) => (
        <Section
          key={section.heading}
          id={`section-${index + 1}`}
          title={section.heading}
          alt={index % 2 === 1}
        >
          <div className="max-w-3xl space-y-4 text-muted leading-relaxed">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 56)}>{paragraph}</p>
            ))}
          </div>
        </Section>
      ))}

      <Section
        id="faq"
        title="Frequently asked questions"
        subtitle={`Helpful answers for ${SITE.address.region} visitors.`}
        alt={page.sections.length % 2 === 0}
      >
        <FAQ items={page.faqs} showHeading={false} />
      </Section>

      <Section
        id="related"
        title="Related pages"
        subtitle="Continue exploring PixelNation with these internal links."
        alt={page.sections.length % 2 === 1}
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {page.relatedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex h-full flex-col rounded-xl border border-card-border bg-card px-4 py-3 transition hover:border-accent-secondary/50"
              >
                <span className="font-semibold text-foreground hover:text-accent">
                  {link.label} →
                </span>
                {link.description ? (
                  <span className="mt-1 text-sm text-muted">{link.description}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <RelatedLinks currentPath={page.path} title="More from PixelNation" />
        </div>
      </Section>

      <section
        className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16"
        aria-labelledby="local-landing-cta"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="local-landing-cta" className="text-2xl font-bold sm:text-3xl">
            Ready to talk with PixelNation?
          </h2>
          <p className="mt-3 text-muted">
            Whether you need products, a collection review, a repair, or community
            info in {SITE.address.region}—we are here to help.
          </p>
          <div className="cta-group mt-8 justify-center">
            <Button href={page.primaryCta.href}>{page.primaryCta.label}</Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
