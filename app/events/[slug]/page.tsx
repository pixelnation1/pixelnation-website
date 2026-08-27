import { notFound } from "next/navigation";
import { EventDetail } from "@/components/events/EventDetail";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  eventHref,
  eventMetaDescription,
  eventPageTitle,
  getEventBySlug,
  getEventSlugs,
} from "@/lib/events";
import { eventSchema } from "@/lib/events/schema";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbListSchema } from "@/lib/seo/schema";
import { buildCanonical } from "@/lib/seo/site-seo";
import type { BreadcrumbItem } from "@/lib/seo/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return createPageMetadata({
    title: eventPageTitle(event),
    description: eventMetaDescription(event),
    path: eventHref(event),
    titleAbsolute: true,
    ogImage: event.image?.src,
    ogImageAlt: event.image?.alt,
    keywords: [
      event.title,
      "PixelNation events",
      "gaming events Emporia KS",
    ],
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: event.title, path: eventHref(event) },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbListSchema(breadcrumbs), eventSchema(event)]} />
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <EventDetail event={event} shareUrl={buildCanonical(eventHref(event))} />
    </>
  );
}
