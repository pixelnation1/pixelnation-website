import { SITE } from "@/lib/site";
import { buildCanonical, CANONICAL_ORIGIN } from "@/lib/seo/site-seo";
import type {
  AreaServedInput,
  ArticleSchemaInput,
  BreadcrumbItem,
  FaqItem,
  RepairServiceSchemaInput,
} from "@/lib/seo/types";

const LOGO = `${CANONICAL_ORIGIN}/images/pixellogo.png`;

export function schemaCityArea(input: AreaServedInput) {
  return {
    "@type": "City" as const,
    name: input.cityName,
    containedInPlace: {
      "@type": "State" as const,
      name: input.stateName ?? "Kansas",
    },
  };
}

export function schemaAreaServedList(
  areas: AreaServedInput | readonly AreaServedInput[],
) {
  const list = Array.isArray(areas) ? areas : [areas];
  return list.length === 1 ? schemaCityArea(list[0]!) : list.map(schemaCityArea);
}

export function localBusinessSchema(overrides?: Record<string, unknown>) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${CANONICAL_ORIGIN}/#localbusiness`,
    name: SITE.name,
    description:
      "Professional phone, computer, console, appliance, data recovery, and board-level repair in Emporia, Kansas.",
    telephone: SITE.phone,
    email: SITE.email,
    url: CANONICAL_ORIGIN,
    image: LOGO,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: SITE.address.city,
      containedInPlace: { "@type": "State", name: "Kansas" },
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: SITE.openingHours.opens,
        closes: SITE.openingHours.closes,
      },
    ],
    priceRange: "$$",
    knowsAbout: [
      "Phone Repair",
      "Computer Repair",
      "Appliance Repair",
      "Game Console Repair",
      "Data Recovery",
      "Microsoldering",
      "Board-Level Repair",
    ],
    ...overrides,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${CANONICAL_ORIGIN}/#organization`,
    name: SITE.name,
    url: CANONICAL_ORIGIN,
    logo: LOGO,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      addressCountry: "US",
    },
    sameAs: [CANONICAL_ORIGIN],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${CANONICAL_ORIGIN}/#website`,
    name: SITE.name,
    url: CANONICAL_ORIGIN,
    description:
      "Phone, computer, console, appliance, data recovery, and board-level repair in Emporia, Kansas.",
    publisher: { "@id": `${CANONICAL_ORIGIN}/#organization` },
    inLanguage: "en-US",
  };
}

/** RepairService — Service schema tuned for repair offerings (AEO-friendly). */
export function repairServiceSchema(input: RepairServiceSchemaInput) {
  const pageUrl = buildCanonical(input.path);
  const areaServed = input.areaServed
    ? schemaAreaServedList(input.areaServed)
    : schemaCityArea({ cityName: SITE.address.city });

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: pageUrl,
    provider: { "@id": `${CANONICAL_ORIGIN}/#localbusiness` },
    areaServed,
  };

  if (input.offers?.length) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: `${input.name} Services`,
      itemListElement: input.offers.map((offer) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offer.name,
          description: offer.description,
        },
      })),
    };
  }

  return schema;
}

export function faqPageSchema(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbListSchema(crumbs: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.path ? { item: buildCanonical(crumb.path) } : {}),
    })),
  };
}

export function articleSchema(input: ArticleSchemaInput) {
  const pageUrl = buildCanonical(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    image: input.image ? buildCanonical(input.image) : LOGO,
    author: {
      "@type": "Organization",
      name: input.authorName ?? SITE.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: LOGO },
    },
  };
}

export function contactPageSchema(input: { path: string; description: string }) {
  const pageUrl = buildCanonical(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact PixelNation",
    description: input.description,
    url: pageUrl,
    mainEntity: { "@id": `${CANONICAL_ORIGIN}/#localbusiness` },
  };
}

export function courseSchema(input: {
  name: string;
  description: string;
  path: string;
  price?: string;
}) {
  const pageUrl = buildCanonical(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: input.name,
    description: input.description,
    url: pageUrl,
    provider: { "@id": `${CANONICAL_ORIGIN}/#organization` },
    offers: input.price
      ? {
          "@type": "Offer",
          price: input.price,
          priceCurrency: "USD",
          url: buildCanonical("/contact"),
        }
      : undefined,
  };
}

/** Standard repair-page breadcrumbs: Home → Repairs → [Page] */
export function repairBreadcrumbs(pageName: string, path: string): BreadcrumbItem[] {
  return [
    { name: "Home", path: "/" },
    { name: "Repairs", path: "/repairs" },
    { name: pageName, path },
  ];
}

export function trainingBreadcrumbs(pageName: string, path: string): BreadcrumbItem[] {
  return [
    { name: "Home", path: "/" },
    { name: "Training", path: "/training" },
    { name: pageName, path },
  ];
}

export function locationBreadcrumbs(
  crumbs: readonly BreadcrumbItem[],
): BreadcrumbItem[] {
  return [{ name: "Home", path: "/" }, ...crumbs];
}

export function softwareDevelopmentBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "Home", path: "/" },
    { name: "Software Development", path: "/software-development" },
  ];
}

export function softwareServiceBreadcrumbs(
  pageName: string,
  path: string,
): BreadcrumbItem[] {
  return [
    { name: "Home", path: "/" },
    { name: "Software Development", path: "/software-development" },
    { name: pageName, path },
  ];
}

/** LocalBusiness overrides for city/service landing pages */
export function localBusinessForArea(
  areas: AreaServedInput | readonly AreaServedInput[],
  keywords?: string[],
) {
  const areaServed = schemaAreaServedList(areas);
  return localBusinessSchema({
    areaServed,
    ...(keywords?.length
      ? {
          knowsAbout: keywords,
        }
      : {}),
  });
}
