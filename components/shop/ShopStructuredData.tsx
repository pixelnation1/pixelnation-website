import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbListSchema,
  faqPageSchema,
  localBusinessSchema,
  shopBreadcrumbs,
  shopStoreSchema,
  shopWebPageSchema,
} from "@/lib/seo/schema";
import { SHOP_PRODUCT_CARDS } from "@/lib/shop";
import type { FaqItem } from "@/lib/seo/types";

type ShopStructuredDataProps = {
  faq: readonly FaqItem[];
};

export function ShopStructuredData({ faq }: ShopStructuredDataProps) {
  const productItems = SHOP_PRODUCT_CARDS.map((product, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    name: product.title,
    description: product.description,
  }));

  const graphs: object[] = [
    breadcrumbListSchema(shopBreadcrumbs()),
    localBusinessSchema({
      knowsAbout: [
        "Magic: The Gathering",
        "Pokémon Trading Card Game",
        "Sealed TCG Products",
        "Playmats",
        "Collector Boxes",
        "Trading Card Game Gifts",
      ],
    }),
    shopWebPageSchema(),
    shopStoreSchema(productItems),
  ];

  if (faq.length) {
    graphs.push(faqPageSchema(faq));
  }

  return <JsonLd data={graphs} />;
}
