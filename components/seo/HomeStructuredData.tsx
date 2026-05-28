import { JsonLd } from "@/components/seo/JsonLd";
import { HOME_FAQS } from "@/lib/faq/global";
import { toSchemaFaqs } from "@/lib/faq/utils";
import { faqPageSchema } from "@/lib/seo/schema";

/** Homepage-only FAQ schema (not duplicated on every route). */
export function HomeStructuredData() {
  return <JsonLd data={faqPageSchema(toSchemaFaqs(HOME_FAQS))} />;
}
