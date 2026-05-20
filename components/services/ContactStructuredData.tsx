import {
  AEO_ANSWERS,
  CONTACT_FAQ,
  CONTACT_METADATA,
} from "@/lib/contact-page";
import { SITE } from "@/lib/site";

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ContactStructuredData() {
  const pageUrl = CONTACT_METADATA.canonical;
  const allFaq = [...CONTACT_FAQ, ...AEO_ANSWERS];

  const address = {
    "@type": "PostalAddress",
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    addressCountry: "US",
  };

  const openingHoursSpecification = [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: SITE.openingHours.opens,
      closes: SITE.openingHours.closes,
    },
  ];

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#localbusiness`,
    name: SITE.name,
    telephone: SITE.phone,
    email: SITE.email,
    url: pageUrl,
    image: `${SITE.domain}/images/pixellogo.png`,
    address,
    areaServed: {
      "@type": "City",
      name: "Emporia",
      containedInPlace: { "@type": "State", name: "Kansas" },
    },
    openingHoursSpecification,
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
    address,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      email: SITE.email,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
  };

  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact PixelNation",
    description: CONTACT_METADATA.description,
    url: pageUrl,
    mainEntity: { "@id": `${pageUrl}#localbusiness` },
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
        name: "Contact",
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <JsonLdScript data={contactPage} />
      <JsonLdScript data={localBusiness} />
      <JsonLdScript data={organization} />
      <JsonLdScript data={faqPage} />
      <JsonLdScript data={breadcrumb} />
    </>
  );
}
