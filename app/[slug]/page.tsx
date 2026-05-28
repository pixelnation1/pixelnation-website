import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  SERVICE_PAGES,
  type ServiceSlug,
} from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

function isServiceSlug(slug: string): slug is ServiceSlug {
  return slug in SERVICE_PAGES;
}

export function generateStaticParams() {
  return Object.keys(SERVICE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return {};
  const service = SERVICE_PAGES[slug];
  return createPageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: service.shortPath,
    noIndex: true,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  return <ServicePageTemplate service={SERVICE_PAGES[slug]} />;
}
