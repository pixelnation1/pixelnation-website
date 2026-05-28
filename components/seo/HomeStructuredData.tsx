import { JsonLd } from "@/components/seo/JsonLd";
import { HOME_FAQ } from "@/lib/homepage";
import { faqPageSchema } from "@/lib/seo/schema";

/** Homepage-only FAQ schema (not duplicated on every route). */
export function HomeStructuredData() {
  return <JsonLd data={faqPageSchema(HOME_FAQ)} />;
}
