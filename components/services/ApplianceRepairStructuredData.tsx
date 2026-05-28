import { PageStructuredData } from "@/components/seo/PageStructuredData";
import {
  AEO_ANSWERS,
  APPLIANCE_FAQ,
  APPLIANCE_REPAIR_METADATA,
} from "@/lib/appliance-repair";
import { repairBreadcrumbs } from "@/lib/seo/schema";

export function ApplianceRepairStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={repairBreadcrumbs("Appliance Repair", "/appliance-repair")}
      faq={[...APPLIANCE_FAQ, ...AEO_ANSWERS]}
      service={{
        name: "Appliance Repair",
        serviceType: "Appliance Repair",
        description: APPLIANCE_REPAIR_METADATA.description,
        path: "/appliance-repair",
      }}
    />
  );
}
