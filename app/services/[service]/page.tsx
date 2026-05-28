import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LocalSeoPage } from "@/components/seo/local/LocalSeoPage";
import { createPageMetadata } from "@/lib/seo/metadata";
import { serviceBreadcrumbs } from "@/lib/locations/breadcrumbs";
import { SERVICE_SLUGS, getService } from "@/lib/locations/services";
import { buildServicePageContent } from "@/lib/locations/content";
import {
  getCanonicalRepairLinks,
  getCityLinksForService,
  getKnowledgeHubLinks,
  getRelatedServiceLinks,
} from "@/lib/seo/location-links";

type PageProps = {
  params: Promise<{ service: string }>;
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((service) => ({ service }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const content = buildServicePageContent(serviceSlug);
  return createPageMetadata({
    title: content.title,
    description: content.description,
    path: content.path,
    titleAbsolute: true,
    keywords: content.service.keywords,
  });
}

export default async function ServiceSeoPage({ params }: PageProps) {
  const { service: serviceSlug } = await params;
  if (!getService(serviceSlug)) notFound();

  const content = buildServicePageContent(serviceSlug);
  const { service } = content;

  return (
    <LocalSeoPage
      content={content}
      breadcrumbs={serviceBreadcrumbs(service)}
      service={service}
      image={service.image}
      imageAlt={service.imageAlt}
      primaryLinks={getCityLinksForService(service.slug)}
      secondaryLinks={getRelatedServiceLinks(service.slug)}
      secondaryLinksTitle="Related repair services"
      knowledgeLinks={getKnowledgeHubLinks()}
      showMailIn={false}
      showNearby={false}
    />
  );
}
