import { PageStructuredData } from "@/components/seo/PageStructuredData";
import {
  AEO_ANSWERS,
  TRAINING_FAQ,
  TRAINING_METADATA,
} from "@/lib/training-page";
import { trainingBreadcrumbs } from "@/lib/seo/schema";

export function TrainingStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={trainingBreadcrumbs("Training Overview", "/training")}
      faq={[...TRAINING_FAQ, ...AEO_ANSWERS]}
      courses={[
        {
          name: "Hands-On Microsoldering & Board Repair Training",
          description: TRAINING_METADATA.description,
          path: "/training",
        },
      ]}
      includeLocalBusiness={false}
    />
  );
}
