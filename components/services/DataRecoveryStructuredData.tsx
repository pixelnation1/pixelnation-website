import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { DATA_RECOVERY_METADATA } from "@/lib/data-recovery-page";
import { getRepairPageFaqBundle } from "@/lib/faq/page-helpers";
import { repairBreadcrumbs } from "@/lib/seo/schema";

const { schema: dataRecoveryFaqSchema } = getRepairPageFaqBundle("data-recovery");

export function DataRecoveryStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={repairBreadcrumbs("Data Recovery", "/data-recovery")}
      faq={dataRecoveryFaqSchema}
      service={{
        name: "Data Recovery",
        serviceType: "Data Recovery",
        description: DATA_RECOVERY_METADATA.description,
        path: "/data-recovery",
      }}
    />
  );
}
