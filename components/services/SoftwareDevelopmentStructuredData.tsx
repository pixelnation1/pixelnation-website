import { PageStructuredData } from "@/components/seo/PageStructuredData";
import {
  SERVICE_OFFERINGS,
  SOFTWARE_DEV_FAQ,
  SOFTWARE_DEV_METADATA,
} from "@/lib/software-development-page";
import { toSchemaFaqs } from "@/lib/faq/utils";
import { softwareDevelopmentBreadcrumbs } from "@/lib/seo/schema";

export function SoftwareDevelopmentStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={softwareDevelopmentBreadcrumbs()}
      faq={toSchemaFaqs(SOFTWARE_DEV_FAQ)}
      service={{
        name: "Custom Software Development & Web Applications",
        description: SOFTWARE_DEV_METADATA.description,
        serviceType: "Software Development",
        path: SOFTWARE_DEV_METADATA.path,
        offers: SERVICE_OFFERINGS.map((service) => ({
          name: service.title,
          description: service.description,
        })),
      }}
      includeLocalBusiness={false}
    />
  );
}
