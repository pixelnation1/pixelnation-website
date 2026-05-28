import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { BOARD_REPAIR_METADATA } from "@/lib/board-repair-page";
import { getRepairPageFaqBundle } from "@/lib/faq/page-helpers";
import { repairBreadcrumbs } from "@/lib/seo/schema";

const { schema: boardFaqSchema } = getRepairPageFaqBundle("board-repair");

export function BoardRepairStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={repairBreadcrumbs("Board Repair", "/board-repair")}
      faq={boardFaqSchema}
      service={{
        name: "Board Repair & Microsoldering",
        serviceType: "Board Repair",
        description: BOARD_REPAIR_METADATA.description,
        path: "/board-repair",
      }}
    />
  );
}
