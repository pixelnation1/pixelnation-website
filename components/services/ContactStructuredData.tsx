import { JsonLd } from "@/components/seo/JsonLd";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import {
  AEO_ANSWERS,
  CONTACT_FAQ,
  CONTACT_METADATA,
} from "@/lib/contact-page";
import { contactPageSchema } from "@/lib/seo/schema";

export function ContactStructuredData() {
  return (
    <>
      <JsonLd data={contactPageSchema({ path: "/contact", description: CONTACT_METADATA.description })} />
      <PageStructuredData
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        faq={[...CONTACT_FAQ, ...AEO_ANSWERS]}
      />
    </>
  );
}
