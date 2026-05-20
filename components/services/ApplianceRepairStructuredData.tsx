import {
  AEO_ANSWERS,
  APPLIANCE_FAQ,
  APPLIANCE_REPAIR_METADATA,
} from "@/lib/appliance-repair";
import { SITE } from "@/lib/site";

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ApplianceRepairStructuredData() {
  const pageUrl = APPLIANCE_REPAIR_METADATA.canonical;

  const allFaq = [...APPLIANCE_FAQ, ...AEO_ANSWERS];

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Appliance Repair",
    serviceType: "Appliance Repair",
    description: APPLIANCE_REPAIR_METADATA.description,
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
        name: "Repairs",
        item: `${SITE.domain}/repairs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Appliance Repair",
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
