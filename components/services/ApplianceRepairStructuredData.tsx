import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { APPLIANCE_REPAIR_METADATA } from "@/lib/appliance-repair";
import { getRepairPageFaqBundle } from "@/lib/faq/page-helpers";
import { repairBreadcrumbs } from "@/lib/seo/schema";

const { schema: applianceFaqSchema } = getRepairPageFaqBundle("appliance-repair");

export function ApplianceRepairStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={repairBreadcrumbs("Appliance Repair", "/appliance-repair")}
      faq={applianceFaqSchema}
      service={{
        name: "Appliance Repair",
        serviceType: "Appliance Repair",
        description: APPLIANCE_REPAIR_METADATA.description,
        path: "/appliance-repair",
      }}
    />
  );
}
