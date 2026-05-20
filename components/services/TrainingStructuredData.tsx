import {
  AEO_ANSWERS,
  TRAINING_FAQ,
  TRAINING_METADATA,
} from "@/lib/training-page";
import { SITE } from "@/lib/site";

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function TrainingStructuredData() {
  const pageUrl = TRAINING_METADATA.canonical;
  const allFaq = [...TRAINING_FAQ, ...AEO_ANSWERS];

  const course = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Hands-On Microsoldering & Board Repair Training",
    description: TRAINING_METADATA.description,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.domain,
    },
    educationalLevel: "Beginner to Advanced",
    courseMode: "onsite",
    inLanguage: "en",
    teaches: [
      "Microsoldering",
      "Board-level diagnostics",
      "Charging port repair",
      "HDMI port repair",
      "Trace and pad repair",
      "Multimeter diagnostics",
    ],
    timeRequired: "P3D",
    locationCreated: {
      "@type": "Place",
      name: "PixelNation",
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.state,
        addressCountry: "US",
      },
    },
    url: pageUrl,
    offers: {
      "@type": "Offer",
      category: "Paid",
      url: `${SITE.domain}/shop`,
      availability: "https://schema.org/LimitedAvailability",
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${pageUrl}#organization`,
    name: SITE.name,
    url: SITE.domain,
    logo: `${SITE.domain}/images/pixellogo.png`,
    email: SITE.email,
    telephone: SITE.phone,
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
        name: "Training",
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <JsonLdScript data={course} />
      <JsonLdScript data={organization} />
      <JsonLdScript data={faqPage} />
      <JsonLdScript data={breadcrumb} />
    </>
  );
}
