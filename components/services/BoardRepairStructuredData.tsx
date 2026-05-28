import { PageStructuredData } from "@/components/seo/PageStructuredData";
import {
  AEO_ANSWERS,
  BOARD_REPAIR_FAQ,
  BOARD_REPAIR_METADATA,
} from "@/lib/board-repair-page";
import { repairBreadcrumbs } from "@/lib/seo/schema";

export function BoardRepairStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={repairBreadcrumbs("Board Repair", "/board-repair")}
      faq={[...BOARD_REPAIR_FAQ, ...AEO_ANSWERS]}
      service={{
        name: "Board Repair & Microsoldering",
        serviceType: "Board Repair",
        description: BOARD_REPAIR_METADATA.description,
        path: "/board-repair",
      }}
    />
  );
}
