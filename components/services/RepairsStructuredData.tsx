import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { REPAIRS_METADATA, REPAIRS_SERVICE_CARDS } from "@/lib/repairs-page";
import { getRepairPageFaqBundle } from "@/lib/faq/page-helpers";

const { schema: repairsFaqSchema } = getRepairPageFaqBundle("repairs");

export function RepairsStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Repair Services", path: "/repairs" },
      ]}
      faq={repairsFaqSchema}
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
