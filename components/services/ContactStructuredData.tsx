import { JsonLd } from "@/components/seo/JsonLd";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { CONTACT_METADATA } from "@/lib/contact-page";
import { getRepairPageFaqBundle } from "@/lib/faq/page-helpers";
import { contactPageSchema } from "@/lib/seo/schema";

const { schema: contactFaqSchema } = getRepairPageFaqBundle("contact");

export function ContactStructuredData() {
  return (
    <>
      <JsonLd data={contactPageSchema({ path: "/contact", description: CONTACT_METADATA.description })} />
      <PageStructuredData
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        faq={contactFaqSchema}
      />
    </>
  );
}
