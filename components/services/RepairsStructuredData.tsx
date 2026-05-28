import { PageStructuredData } from "@/components/seo/PageStructuredData";
import {
  AEO_ANSWERS,
  REPAIRS_FAQ,
  REPAIRS_METADATA,
  REPAIRS_SERVICE_CARDS,
} from "@/lib/repairs-page";

export function RepairsStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Repair Services", path: "/repairs" },
      ]}
      faq={[...REPAIRS_FAQ, ...AEO_ANSWERS]}
      service={{
        name: "Repair Services",
        serviceType: "Electronics and Appliance Repair",
        description: REPAIRS_METADATA.description,
        path: "/repairs",
        offers: REPAIRS_SERVICE_CARDS.map((card) => ({
          name: card.title,
          description: card.description,
        })),
      }}
    />
  );
}
