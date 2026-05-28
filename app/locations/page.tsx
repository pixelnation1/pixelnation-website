import Link from "next/link";
import type { Metadata } from "next";

import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { SeoBreadcrumbs } from "@/components/seo/local/SeoBreadcrumbs";
import { SeoFinalCta } from "@/components/seo/local/SeoFinalCta";
import { createPageMetadata } from "@/lib/seo/metadata";
import { locationsHubBreadcrumbs } from "@/lib/locations/breadcrumbs";
import { CITIES, CITY_SLUGS } from "@/lib/locations/cities";
import { getKnowledgeHubLinks } from "@/lib/seo/location-links";
import { InternalLinksHub } from "@/components/seo/local/InternalLinksHub";
import { LocalStructuredData } from "@/components/seo/local/LocalStructuredData";
import { SITE } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Repair Locations Across Kansas | PixelNation",
  description:
    "PixelNation serves Emporia, Wichita, Topeka, Manhattan, Lawrence, Salina, Kansas City, and surrounding areas with phone, computer, console, and board-level repair.",
  path: "/locations",
});

const HUB_FAQ = [
  {
    question: "Where is PixelNation located?",
    answer: `Our repair bench is in ${SITE.address.region}. We serve Kansas statewide through walk-in and mail-in repair.`,
  },
  {
    question: "Do you offer mail-in repair outside Emporia?",
    answer:
      "Yes. Customers in Wichita, Topeka, KC, Manhattan, Lawrence, Salina, and beyond ship devices to our Emporia shop with tracking.",
  },
];

export default function LocationsHubPage() {
  const breadcrumbs = locationsHubBreadcrumbs();

  return (
    <article>
      <LocalStructuredData
        breadcrumbs={breadcrumbs}
        faqs={HUB_FAQ}
        areaServed={CITY_SLUGS.map((slug) => ({
          cityName: CITIES[slug].name,
          stateName: CITIES[slug].state,
        }))}
        keywords={["Kansas repair", "mail-in repair", "phone repair Kansas"]}
      />

      <section className="border-b border-card-border bg-gradient-to-b from-accent-muted to-background py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SeoBreadcrumbs items={breadcrumbs} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Kansas repair locations we serve
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            PixelNation provides phone, computer, console, data recovery, and board-level
            repair from Emporia, KS—with mail-in service across Kansas and the region.
          </p>
          <div className="cta-group mt-8">
            <Button href="/contact">Start a Repair</Button>
            <Button href="/repairs" variant="secondary">
              View all repairs
            </Button>
          </div>
        </div>
      </section>

      <Section title="Cities we serve" subtitle="Select your area for localized repair information.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CITY_SLUGS.map((slug) => {
            const city = CITIES[slug];
            return (
              <li key={slug}>
                <Link
                  href={`/locations/${slug}`}
                  className="flex flex-col rounded-xl border border-card-border bg-card p-5 transition hover:border-accent-secondary/50"
                >
                  <span className="text-lg font-semibold text-foreground">
                    {city.regionLabel}
                  </span>
                  <span className="mt-2 text-sm text-muted">
                    {city.isPrimaryLocation ? "Our home shop" : "Mail-in & regional service"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <InternalLinksHub
        title="Repair knowledge hub"
        links={getKnowledgeHubLinks()}
      />

      <SeoFinalCta headline="Not sure which location page fits?" subtext="Call or contact us—we serve all listed Kansas areas." />
    </article>
  );
}
