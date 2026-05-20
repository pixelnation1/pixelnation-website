import {
  AEO_ANSWERS,
  REPAIRS_FAQ,
  REPAIRS_METADATA,
  REPAIRS_SERVICE_CARDS,
} from "@/lib/repairs-page";
import { SITE } from "@/lib/site";

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function RepairsStructuredData() {
  const pageUrl = REPAIRS_METADATA.canonical;
  const allFaq = [...REPAIRS_FAQ, ...AEO_ANSWERS];

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Repair Services",
    serviceType: "Electronics and Appliance Repair",
    description: REPAIRS_METADATA.description,
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.state,
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Emporia",
      containedInPlace: { "@type": "State", name: "Kansas" },
    },
    url: pageUrl,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "PixelNation Repair Services",
      itemListElement: REPAIRS_SERVICE_CARDS.map((card, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: card.title,
          url: `${SITE.domain}${card.href}`,
        },
      })),
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    telephone: SITE.phone,
    email: SITE.email,
    url: SITE.domain,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      addressCountry: "US",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: "Repair Services",
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <JsonLdScript data={service} />
      <JsonLdScript data={localBusiness} />
      <JsonLdScript data={faqPage} />
      <JsonLdScript data={breadcrumb} />
    </>
  );
}
