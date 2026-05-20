import {
  AEO_ANSWERS,
  DATA_RECOVERY_FAQ,
  DATA_RECOVERY_METADATA,
} from "@/lib/data-recovery-page";
import { SITE } from "@/lib/site";

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function DataRecoveryStructuredData() {
  const pageUrl = DATA_RECOVERY_METADATA.canonical;
  const allFaq = [...DATA_RECOVERY_FAQ, ...AEO_ANSWERS];

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Data Recovery",
    serviceType: "Data Recovery",
    description: DATA_RECOVERY_METADATA.description,
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
        name: "Data Recovery",
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
