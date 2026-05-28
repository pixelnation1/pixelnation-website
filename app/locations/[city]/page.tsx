import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LocalSeoPage } from "@/components/seo/local/LocalSeoPage";
import { createPageMetadata } from "@/lib/seo/metadata";
import { cityBreadcrumbs } from "@/lib/locations/breadcrumbs";
import { CITY_SLUGS, getCity } from "@/lib/locations/cities";
import { buildCityPageContent } from "@/lib/locations/content";
import { getKnowledgeHubLinks, getNearbyCityLinks } from "@/lib/seo/location-links";

type PageProps = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const content = buildCityPageContent(citySlug);
  return createPageMetadata({
    title: content.title,
    description: content.description,
    path: content.path,
    titleAbsolute: true,
    keywords: content.city.geoKeywords,
  });
}

export default async function CityLocationPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  if (!getCity(citySlug)) notFound();

  const content = buildCityPageContent(citySlug);
  const { city } = content;

  return (
    <LocalSeoPage
      content={content}
      breadcrumbs={cityBreadcrumbs(city)}
      city={city}
      image="/images/pixellogo.png"
      imageAlt={`PixelNation repair serving ${city.regionLabel}`}
      primaryLinks={content.serviceLinks}
      secondaryLinks={getNearbyCityLinks(city.slug)}
      secondaryLinksTitle="Nearby areas we serve"
      knowledgeLinks={getKnowledgeHubLinks()}
      showMailIn
      showNearby
    />
  );
}
