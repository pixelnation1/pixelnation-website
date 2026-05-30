import Image from "next/image";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { FaqSection } from "@/components/faq/FaqSection";
import { Button } from "@/components/ui/Button";
import { toSchemaFaqs } from "@/lib/faq/utils";
import { softwareServiceBreadcrumbs } from "@/lib/seo/schema";
import type { FaqItem, RepairServiceSchemaInput } from "@/lib/seo/types";
import { SITE } from "@/lib/site";

type SoftwareServiceHeroProps = {
  pageName: string;
  path: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  bullets?: readonly string[];
  image: string;
  imageAlt: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function SoftwareServiceHero({
  pageName,
  path,
  eyebrow,
  headline,
  subheadline,
  bullets,
  image,
  imageAlt,
  primaryCta = { label: "Request a Consultation", href: "/contact" },
  secondaryCta,
}: SoftwareServiceHeroProps) {
  const crumbs = softwareServiceBreadcrumbs(pageName, path);

  return (
    <section
      className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16 md:py-24"
      aria-labelledby="software-service-heading"
    >
      <div className="mx-auto grid max-w-6xl min-w-0 items-center gap-8 px-4 sm:gap-10 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0 order-1">
          <Breadcrumbs items={crumbs} />
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
            {eyebrow}
          </p>
          <h1
            id="software-service-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {headline}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{subheadline}</p>
          {bullets?.length ? (
            <ul className="mt-6 space-y-2 text-sm text-muted">
              {bullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="cta-group mt-8">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            {secondaryCta ? (
              <Button href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>
        <div className="relative order-2 mx-auto aspect-square w-full max-w-md min-w-0 lg:max-w-none">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 1024px) 80vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
}

type SoftwareServiceStructuredDataProps = {
  pageName: string;
  path: string;
  service: RepairServiceSchemaInput;
  faq: readonly FaqItem[];
};

export function SoftwareServiceStructuredData({
  pageName,
  path,
  service,
  faq,
}: SoftwareServiceStructuredDataProps) {
  return (
    <PageStructuredData
      breadcrumbs={softwareServiceBreadcrumbs(pageName, path)}
      faq={toSchemaFaqs(faq)}
      service={service}
      includeLocalBusiness={false}
    />
  );
}

type SoftwareServiceFaqProps = {
  items: readonly FaqItem[];
  conversationalQueries: readonly string[];
  featuredAnswer: string;
};

export function SoftwareServiceFaq({
  items,
  conversationalQueries,
  featuredAnswer,
}: SoftwareServiceFaqProps) {
  return (
    <FaqSection
      items={items.map((item) => ({ ...item }))}
      id="software-service-faq"
      title="Frequently asked questions"
      conversationalQueries={[...conversationalQueries]}
      featuredAnswer={featuredAnswer}
      showPeopleAlsoAsk
    />
  );
}

type SoftwareServiceCtaProps = {
  headline?: string;
  description: string;
};

export function SoftwareServiceCta({
  headline = "Let's Build Something Powerful",
  description,
}: SoftwareServiceCtaProps) {
  return (
    <section
      id="consultation"
      className="border-t border-card-border bg-gradient-to-r from-accent-muted to-accent-secondary-muted py-12 sm:py-16 md:py-20"
      aria-labelledby="software-service-cta-heading"
    >
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 id="software-service-cta-heading" className="text-2xl font-bold sm:text-3xl">
          {headline}
        </h2>
        <p className="mt-3 text-muted">{description}</p>
        <div className="cta-group mt-8 justify-center">
          <Button href="/contact">Schedule a Consultation</Button>
          <Button href={SITE.phoneHref} variant="secondary" external>
            Call {SITE.phone}
          </Button>
          <Button href="/software-development" variant="outline">
            All Software Services
          </Button>
        </div>
      </div>
    </section>
  );
}

type SoftwareServiceFooterProps = {
  relatedPath: string;
};

export function SoftwareServiceFooter({ relatedPath }: SoftwareServiceFooterProps) {
  return (
    <section className="border-t border-card-border py-12 sm:py-16">
      <div className="mx-auto max-w-6xl min-w-0 px-4">
        <RelatedLinks currentPath={relatedPath} title="Related services" />
      </div>
    </section>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  items?: readonly string[];
};

export function FeatureCard({ title, description, items }: FeatureCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-card-border bg-card p-5">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      {items?.length ? (
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

type ProcessStepProps = {
  step: string;
  title: string;
  text: string;
};

export function ProcessSteps({ steps }: { steps: readonly ProcessStepProps[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((item) => (
        <article
          key={item.step}
          className="rounded-xl border border-card-border bg-card p-5"
        >
          <p className="text-sm font-bold text-accent">{item.step}</p>
          <h3 className="mt-2 font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
        </article>
      ))}
    </div>
  );
}

type BenefitCardProps = {
  title: string;
  text: string;
};

export function BenefitGrid({ items }: { items: readonly BenefitCardProps[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-xl border border-card-border bg-background p-5"
        >
          <h3 className="font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
        </article>
      ))}
    </div>
  );
}
