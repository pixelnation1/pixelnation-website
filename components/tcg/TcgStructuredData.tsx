import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbListSchema,
  faqPageSchema,
  localBusinessSchema,
} from "@/lib/seo/schema";
import { buildCanonical, CANONICAL_ORIGIN } from "@/lib/seo/site-seo";
import type { BreadcrumbItem, FaqItem } from "@/lib/seo/types";
import { SITE } from "@/lib/site";

type TcgPageStructuredDataProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  faq?: readonly FaqItem[];
  pagePath: string;
  pageName: string;
  pageDescription: string;
  /** When true, add HobbyShop-oriented LocalBusiness override for TCG landing pages. */
  includeHobbyFocus?: boolean;
};

/**
 * Structured data for Trading Cards & Gaming pages.
 * Uses LocalBusiness (with optional hobby/TCG knowsAbout). No fake Event schema.
 */
export function TcgPageStructuredData({
  breadcrumbs,
  faq,
  pagePath,
  pageName,
  pageDescription,
  includeHobbyFocus = false,
}: TcgPageStructuredDataProps) {
  const pageUrl = buildCanonical(pagePath);

  const business = localBusinessSchema(
    includeHobbyFocus
      ? {
          description:
            "Electronics repair, trading cards, and gaming in Emporia, Kansas—phones, computers, consoles, TCG products, and community gaming plans.",
          knowsAbout: [
            "Phone Repair",
            "Computer Repair",
            "Trading Card Games",
            "Pokémon Trading Card Game",
            "Magic: The Gathering",
            "Yu-Gi-Oh!",
            "Disney Lorcana",
            "One Piece Card Game",
            "Local Game Store",
            "Gaming Events",
          ],
        }
      : undefined,
  );

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    name: pageName,
    description: pageDescription,
    url: pageUrl,
    isPartOf: { "@id": `${CANONICAL_ORIGIN}/#website` },
    about: { "@id": `${CANONICAL_ORIGIN}/#localbusiness` },
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      telephone: SITE.phoneSchema,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.state,
        addressCountry: "US",
      },
    },
  };

  const graphs: object[] = [
    breadcrumbListSchema(breadcrumbs),
    business,
    webPage,
  ];

  if (faq?.length) {
    graphs.push(faqPageSchema(faq));
  }

  return <JsonLd data={graphs} />;
}
