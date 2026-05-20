import { AEO_ANSWERS, SHOP_FAQ, SHOP_METADATA, SHOPIFY_STORE_URL } from "@/lib/shop-page";
import { SITE } from "@/lib/site";

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ShopStructuredData() {
  const pageUrl = SHOP_METADATA.canonical;
  const allFaq = [...SHOP_FAQ, ...AEO_ANSWERS];

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "PixelNation TCG Shop",
    description: SHOP_METADATA.description,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.domain },
    about: [
      "Pokémon Trading Card Game",
      "Magic: The Gathering",
      "Trading card game accessories",
    ],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.domain,
    logo: `${SITE.domain}/images/pixellogo.png`,
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: [SHOPIFY_STORE_URL],
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
        name: "Shop",
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <JsonLdScript data={collectionPage} />
      <JsonLdScript data={organization} />
      <JsonLdScript data={faqPage} />
      <JsonLdScript data={breadcrumb} />
    </>
  );
}
