import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { CONSOLE_REPAIR_METADATA } from "@/lib/console-repair";
import { getRepairPageFaqBundle } from "@/lib/faq/page-helpers";
import { repairBreadcrumbs } from "@/lib/seo/schema";

const { schema: consoleFaqSchema } = getRepairPageFaqBundle("console-repair");

export function ConsoleRepairStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={repairBreadcrumbs("Console Repair", "/console-repair")}
      faq={consoleFaqSchema}
      service={{
        name: "Game Console Repair",
        serviceType: "Game Console Repair",
        description: CONSOLE_REPAIR_METADATA.description,
        path: "/console-repair",
      }}
    />
  );
}
