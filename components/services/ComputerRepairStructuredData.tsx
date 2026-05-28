import { PageStructuredData } from "@/components/seo/PageStructuredData";
import {
  AEO_ANSWERS,
  COMPUTER_FAQ,
  COMPUTER_REPAIR_METADATA,
} from "@/lib/computer-repair";
import { repairBreadcrumbs } from "@/lib/seo/schema";

export function ComputerRepairStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={repairBreadcrumbs("Computer Repair", "/computer-repair")}
      faq={[...COMPUTER_FAQ, ...AEO_ANSWERS]}
      service={{
        name: "Computer Repair",
        serviceType: "Computer Repair",
        description: COMPUTER_REPAIR_METADATA.description,
        path: "/computer-repair",
      }}
    />
  );
}
