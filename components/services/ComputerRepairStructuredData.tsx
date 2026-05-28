import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { COMPUTER_REPAIR_METADATA } from "@/lib/computer-repair";
import { getRepairPageFaqBundle } from "@/lib/faq/page-helpers";
import { repairBreadcrumbs } from "@/lib/seo/schema";

const { schema: computerFaqSchema } = getRepairPageFaqBundle("computer-repair");

export function ComputerRepairStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={repairBreadcrumbs("Computer Repair", "/computer-repair")}
      faq={computerFaqSchema}
      service={{
        name: "Computer Repair",
        serviceType: "Computer Repair",
        description: COMPUTER_REPAIR_METADATA.description,
        path: "/computer-repair",
      }}
    />
  );
}
