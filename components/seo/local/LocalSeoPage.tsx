import Image from "next/image";
import Link from "next/link";

import { FAQ } from "@/components/FAQ";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import {
  pageHeroGrid,
  pageHeroImageBox,
  pageHeroMedia,
  pageHeroSection,
  pageHeroTitle,
} from "@/components/layout/responsive";
import { InternalLinksHub, type HubLink } from "@/components/seo/local/InternalLinksHub";
import { LocalStructuredData } from "@/components/seo/local/LocalStructuredData";
import { MailInSection } from "@/components/seo/local/MailInSection";
import { NearbyAreas } from "@/components/seo/local/NearbyAreas";
import { QuickAnswers } from "@/components/seo/local/QuickAnswers";
import { SeoBreadcrumbs } from "@/components/seo/local/SeoBreadcrumbs";
import { SeoFinalCta } from "@/components/seo/local/SeoFinalCta";
import { TestimonialsSection } from "@/components/seo/local/TestimonialsSection";
import { TrustSignals } from "@/components/seo/local/TrustSignals";
import type { CityData } from "@/lib/locations/cities";
import type { ServiceData } from "@/lib/locations/services";
import type { LocalizedPageContent } from "@/lib/locations/content";
import type { BreadcrumbItem } from "@/lib/seo/types";
import { SITE } from "@/lib/site";

type LocalSeoPageProps = {
  content: LocalizedPageContent;
  breadcrumbs: readonly BreadcrumbItem[];
  city?: CityData;
  service?: ServiceData;
  image: string;
  imageAlt: string;
  primaryLinks: readonly HubLink[];
  secondaryLinks?: readonly HubLink[];
  secondaryLinksTitle?: string;
  knowledgeLinks?: readonly HubLink[];
  showMailIn?: boolean;
  showNearby?: boolean;
};

export function LocalSeoPage({
  content,
  breadcrumbs,
  city,
  service,
  image,
  imageAlt,
  primaryLinks,
  secondaryLinks,
  secondaryLinksTitle = "More repair services",
  knowledgeLinks,
  showMailIn = true,
  showNearby = true,
}: LocalSeoPageProps) {
  const areaServed = city
    ? { cityName: city.name, stateName: city.state }
    : { cityName: SITE.address.city, stateName: "Kansas" };

  const schemaService = service
    ? {
        name: content.h1,
        serviceType: service.serviceType,
        description: content.intro,
        path: content.path,
        areaServed,
        offers: service.capabilities.slice(0, 4).map((cap) => ({
          name: cap,
          description: cap,
        })),
      }
    : undefined;

  return (
    <article>
      <LocalStructuredData
        breadcrumbs={breadcrumbs}
        faqs={content.faqs}
        areaServed={areaServed}
        keywords={service?.keywords ?? city?.geoKeywords}
        service={schemaService}
      />

      <section
        className={pageHeroSection}
        aria-labelledby="local-seo-heading"
      >
        <div className={pageHeroGrid}>
          <div className="min-w-0 order-1">
            <SeoBreadcrumbs items={breadcrumbs} />
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              {content.eyebrow}
            </p>
            <h1 id="local-seo-heading" className={pageHeroTitle}>
              {content.h1}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{content.intro}</p>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              {content.heroBullets.map((item) => (
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
              <Button href="/contact">Start a Repair</Button>
              <Button href={SITE.phoneHref} variant="secondary" external>
                Call {SITE.phone}
              </Button>
            </div>
            {service?.canonicalPath ? (
              <p className="mt-4 text-sm text-muted">
                Also see our{" "}
                <Link href={service.canonicalPath} className="text-accent hover:underline">
                  {service.name} overview
                </Link>
                .
              </p>
            ) : null}
          </div>
          <div className={pageHeroMedia}>
            <div className={pageHeroImageBox}>
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <QuickAnswers items={content.quickAnswers} />

      <Section
        id="why-pixelnation"
        title={content.sections.whyTitle}
        subtitle="Diagnostics-first repair with clear communication."
      >
        <p className="-mt-6 max-w-3xl leading-relaxed text-muted">
          {content.sections.whyBody}
        </p>
        {service ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.capabilities.map((cap) => (
              <li
                key={cap}
                className="rounded-xl border border-card-border bg-card px-4 py-3 text-sm text-muted"
              >
                {cap}
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      <Section
        id="process"
        title={content.sections.processTitle}
        subtitle="A clear path from intake to finished repair."
        alt
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.sections.processSteps.map((step, i) => (
            <li
              key={step}
              className="rounded-xl border border-card-border bg-card p-4"
            >
              <span className="text-sm font-semibold text-accent">Step {i + 1}</span>
              <p className="mt-2 text-sm text-muted">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      {showMailIn && city ? <MailInSection city={city} serviceName={service?.name} /> : null}

      <TrustSignals cityName={city?.name} />

      <TestimonialsSection cityName={city?.name} serviceName={service?.name} />

      <InternalLinksHub
        title={service ? `Other services in ${city?.name ?? "Kansas"}` : "Repair services in this area"}
        links={primaryLinks}
      />

      {secondaryLinks && secondaryLinks.length > 0 ? (
        <InternalLinksHub title={secondaryLinksTitle} links={secondaryLinks} />
      ) : null}

      {knowledgeLinks && knowledgeLinks.length > 0 ? (
        <InternalLinksHub
          title="Repair knowledge & resources"
          subtitle="Guides, related repairs, and training."
          links={knowledgeLinks}
        />
      ) : null}

      {showNearby && city ? (
        <NearbyAreas city={city} serviceSlug={service?.slug} />
      ) : null}

      <Section id="faq" title="Frequently asked questions" alt>
        <FAQ items={content.faqs} />
      </Section>

      <SeoFinalCta
        headline={
          service && city
            ? `Ready for ${service.name.toLowerCase()} in ${city.name}?`
            : city
              ? `Start your repair from ${city.name}`
              : `Start your ${service?.name.toLowerCase() ?? "repair"} today`
        }
        subtext={`Contact PixelNation in ${SITE.address.region} or request mail-in repair online.`}
      />
    </article>
  );
}
