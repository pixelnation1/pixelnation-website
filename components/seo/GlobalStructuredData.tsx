import { JsonLd } from "@/components/seo/JsonLd";
import {
  localBusinessSchema,
  organizationSchema,
  webSiteSchema,
} from "@/lib/seo/schema";

/** Site-wide Organization, LocalBusiness, and WebSite — mounted once in root layout. */
export function GlobalStructuredData() {
  return (
    <JsonLd
      data={[organizationSchema(), localBusinessSchema(), webSiteSchema()]}
    />
  );
}
