import { PageStructuredData } from "@/components/seo/PageStructuredData";
import {
  AEO_ANSWERS,
  CONSOLE_FAQ,
  CONSOLE_REPAIR_METADATA,
} from "@/lib/console-repair";
import { repairBreadcrumbs } from "@/lib/seo/schema";

export function ConsoleRepairStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={repairBreadcrumbs("Console Repair", "/console-repair")}
      faq={[...CONSOLE_FAQ, ...AEO_ANSWERS]}
      service={{
        name: "Game Console Repair",
        serviceType: "Game Console Repair",
        description: CONSOLE_REPAIR_METADATA.description,
        path: "/console-repair",
      }}
    />
  );
}
