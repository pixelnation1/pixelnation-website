import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { repairBreadcrumbs } from "@/lib/seo/schema";
import type { FaqItem } from "@/lib/seo/types";

type PhoneRepairStructuredDataProps = {
  faq: readonly FaqItem[];
  serviceOffers: { name: string; description: string }[];
};

export function PhoneRepairStructuredData({
  faq,
  serviceOffers,
}: PhoneRepairStructuredDataProps) {
  return (
    <PageStructuredData
      breadcrumbs={repairBreadcrumbs("Phone Repair", "/phone-repair")}
      faq={faq}
      service={{
        name: "Phone Repair",
        serviceType: "Phone Repair",
        description:
          "Phone repair in Emporia, Kansas for iPhone, Samsung, and other smartphones, including screen replacement, battery replacement, charging port repair, water damage recovery, data recovery, and board-level diagnostics.",
        path: "/phone-repair",
        offers: serviceOffers,
      }}
    />
  );
}
