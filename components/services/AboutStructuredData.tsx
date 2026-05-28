import { JsonLd } from "@/components/seo/JsonLd";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { ABOUT_FAQ, ABOUT_METADATA } from "@/lib/about-page";
import { toSchemaFaqs } from "@/lib/faq/utils";
import { organizationSchema } from "@/lib/seo/schema";

export function AboutStructuredData() {
  const org = {
    ...organizationSchema(),
    foundingDate: "2007",
    description: ABOUT_METADATA.description,
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

  return (
    <>
      <JsonLd data={org} />
      <PageStructuredData
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
        faq={toSchemaFaqs(ABOUT_FAQ)}
        includeLocalBusiness={false}
      />
    </>
  );
}
