import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LocalSeoPage } from "@/components/seo/local/LocalSeoPage";
import { createPageMetadata } from "@/lib/seo/metadata";
import { cityServiceBreadcrumbs } from "@/lib/locations/breadcrumbs";
import { getCity } from "@/lib/locations/cities";
import { getService } from "@/lib/locations/services";
import {
  buildCityServicePageContent,
  getAllCityServiceParams,
} from "@/lib/locations/content";
import {
  getCanonicalRepairLinks,
  getKnowledgeHubLinks,
  getRelatedServiceLinks,
} from "@/lib/seo/location-links";

type PageProps = {
  params: Promise<{ city: string; service: string }>;
};

export function generateStaticParams() {
  return getAllCityServiceParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, service } = await params;
  const content = buildCityServicePageContent(city, service);
  return createPageMetadata({
    title: content.title,
    description: content.description,
    path: content.path,
    titleAbsolute: true,
    keywords: [...content.city.geoKeywords, ...content.service.keywords],
  });
}

export default async function CityServicePage({ params }: PageProps) {
  const { city: citySlug, service: serviceSlug } = await params;
  if (!getCity(citySlug) || !getService(serviceSlug)) notFound();

  const content = buildCityServicePageContent(citySlug, serviceSlug);
  const { city, service } = content;

  return (
    <LocalSeoPage
      content={content}
      breadcrumbs={cityServiceBreadcrumbs(city, service)}
      city={city}
      service={service}
      image={service.image}
      imageAlt={service.imageAlt}
      primaryLinks={getRelatedServiceLinks(service.slug, city.slug)}
      secondaryLinks={getCanonicalRepairLinks(service.slug)}
      secondaryLinksTitle="Full service guides"
      knowledgeLinks={getKnowledgeHubLinks()}
      showMailIn
      showNearby
    />
  );
}
