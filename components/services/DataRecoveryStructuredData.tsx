import { PageStructuredData } from "@/components/seo/PageStructuredData";
import {
  AEO_ANSWERS,
  DATA_RECOVERY_FAQ,
  DATA_RECOVERY_METADATA,
} from "@/lib/data-recovery-page";
import { repairBreadcrumbs } from "@/lib/seo/schema";

export function DataRecoveryStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={repairBreadcrumbs("Data Recovery", "/data-recovery")}
      faq={[...DATA_RECOVERY_FAQ, ...AEO_ANSWERS]}
      service={{
        name: "Data Recovery",
        serviceType: "Data Recovery",
        description: DATA_RECOVERY_METADATA.description,
        path: "/data-recovery",
      }}
    />
  );
}
