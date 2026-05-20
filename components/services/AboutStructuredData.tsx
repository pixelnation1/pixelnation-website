import { AEO_ANSWERS, ABOUT_FAQ, ABOUT_METADATA } from "@/lib/about-page";
import { SITE } from "@/lib/site";

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function AboutStructuredData() {
  const pageUrl = ABOUT_METADATA.canonical;
  const allFaq = [...ABOUT_FAQ, ...AEO_ANSWERS];

  const address = {
    "@type": "PostalAddress",
    addressLocality: SITE.address.city,
    addressRegion: "Kansas",
    addressCountry: "US",
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
    foundingDate: "2007",
    address,
    description: ABOUT_METADATA.description,
    knowsAbout: [
      "Phone Repair",
      "Computer Repair",
      "Appliance Repair",
      "Game Console Repair",
      "Data Recovery",
      "Microsoldering",
      "Board-Level Repair",
      "Repair Training",
    ],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#localbusiness`,
    name: SITE.name,
    telephone: SITE.phone,
    email: SITE.email,
    url: SITE.domain,
    image: `${SITE.domain}/images/coverlogo.png`,
    foundingDate: "2007",
    address,
    areaServed: {
      "@type": "City",
      name: "Emporia",
      containedInPlace: { "@type": "State", name: "Kansas" },
    },
  };

  const aboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About PixelNation",
    description: ABOUT_METADATA.description,
    url: pageUrl,
    mainEntity: { "@id": `${pageUrl}#organization` },
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
        name: "About",
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <JsonLdScript data={aboutPage} />
      <JsonLdScript data={organization} />
      <JsonLdScript data={localBusiness} />
      <JsonLdScript data={faqPage} />
      <JsonLdScript data={breadcrumb} />
    </>
  );
}
