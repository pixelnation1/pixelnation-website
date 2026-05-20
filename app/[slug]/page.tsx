import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return {};
  const service = SERVICE_PAGES[slug];
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  return <ServicePageTemplate service={SERVICE_PAGES[slug]} />;
}
