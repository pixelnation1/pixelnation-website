import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { TRAINING_METADATA } from "@/lib/training-page";
import { getTrainingFaqBundle } from "@/lib/faq/page-helpers";
import { trainingBreadcrumbs } from "@/lib/seo/schema";

const { schema: trainingFaqSchema } = getTrainingFaqBundle();

export function TrainingStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={trainingBreadcrumbs("Training Overview", "/training")}
      faq={trainingFaqSchema}
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
