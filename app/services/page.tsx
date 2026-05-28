import Link from "next/link";
import type { Metadata } from "next";

import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { SeoBreadcrumbs } from "@/components/seo/local/SeoBreadcrumbs";
import { SeoFinalCta } from "@/components/seo/local/SeoFinalCta";
import { InternalLinksHub } from "@/components/seo/local/InternalLinksHub";
import { FaqSection } from "@/components/faq/FaqSection";
import { LocalStructuredData } from "@/components/seo/local/LocalStructuredData";
import { SERVICES_HUB_FAQS } from "@/lib/faq/global";
import { toSchemaFaqs } from "@/lib/faq/utils";
import { createPageMetadata } from "@/lib/seo/metadata";
import { servicesHubBreadcrumbs } from "@/lib/locations/breadcrumbs";
import { SERVICES, SERVICE_SLUGS } from "@/lib/locations/services";
import { getKnowledgeHubLinks } from "@/lib/seo/location-links";

export const metadata: Metadata = createPageMetadata({
  title: "Repair Services | iPhone, PS5 HDMI, Data Recovery | PixelNation",
  description:
    "Specialized repair services in Kansas: iPhone repair, PS5 HDMI, Xbox, computer repair, data recovery, microsoldering, board repair, liquid damage, charging ports, and HDMI.",
  path: "/services",
});

export default function ServicesHubPage() {
  const breadcrumbs = servicesHubBreadcrumbs();

  return (
    <article>
      <LocalStructuredData
        breadcrumbs={breadcrumbs}
        faqs={toSchemaFaqs(SERVICES_HUB_FAQS)}
        areaServed={{ cityName: "Emporia", stateName: "Kansas" }}
      />

      <section className="border-b border-card-border bg-gradient-to-b from-accent-muted to-background py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SeoBreadcrumbs items={breadcrumbs} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Specialized repair services
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            From iPhone screens to PS5 HDMI ports and data recovery—browse services and
            find your Kansas city page for localized information.
          </p>
          <div className="cta-group mt-8">
            <Button href="/contact">Start a Repair</Button>
            <Button href="/locations" variant="secondary">
              View locations
            </Button>
          </div>
        </div>
      </section>

      <Section title="All services" subtitle="Board-level capability on every service line.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_SLUGS.map((slug) => {
            const service = SERVICES[slug];
            return (
              <li key={slug}>
                <Link
                  href={`/services/${slug}`}
                  className="flex flex-col rounded-xl border border-card-border bg-card p-5 transition hover:border-accent-secondary/50"
                >
                  <span className="text-lg font-semibold text-foreground">
                    {service.name}
                  </span>
                  <span className="mt-2 text-sm text-muted">
                    {service.capabilities[0]}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <InternalLinksHub title="Locations & resources" links={getKnowledgeHubLinks()} />

      <Section id="faq" title="Service FAQ" alt>
        <FaqSection items={SERVICES_HUB_FAQS} initialVisible={6} showPeopleAlsoAsk />
      </Section>

      <SeoFinalCta headline="Need help choosing a service?" />
    </article>
  );
}
