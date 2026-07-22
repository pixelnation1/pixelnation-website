import { notFound } from "next/navigation";
import { LocalLandingTemplate } from "@/components/seo/LocalLandingTemplate";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  getLocalLanding,
  isLocalLandingSlug,
  LOCAL_LANDING_SLUGS,
} from "@/lib/seo/local-landings";
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
  const local = LOCAL_LANDING_SLUGS.map((slug) => ({ slug }));
  const services = Object.keys(SERVICE_PAGES).map((slug) => ({ slug }));
  return [...local, ...services];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  if (isLocalLandingSlug(slug)) {
    const page = getLocalLanding(slug)!;
    return createPageMetadata({
      title: page.metaTitle,
      description: page.metaDescription,
      path: page.path,
      keywords: [...page.keywords],
      titleAbsolute: true,
    });
  }

  if (isServiceSlug(slug)) {
    const service = SERVICE_PAGES[slug];
    return createPageMetadata({
      title: service.metaTitle,
      description: service.metaDescription,
      path: service.shortPath,
      noIndex: true,
    });
  }

  return {};
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  if (isLocalLandingSlug(slug)) {
    const page = getLocalLanding(slug);
    if (!page) notFound();
    return <LocalLandingTemplate page={page} />;
  }

  if (isServiceSlug(slug)) {
    return <ServicePageTemplate service={SERVICE_PAGES[slug]} />;
  }

  notFound();
}
