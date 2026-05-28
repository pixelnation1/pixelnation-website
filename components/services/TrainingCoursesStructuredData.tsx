import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { ALL_COURSES } from "@/lib/training-courses-page";
import { getTrainingFaqBundle } from "@/lib/faq/page-helpers";
import { trainingBreadcrumbs } from "@/lib/seo/schema";

const { schema: coursesFaqSchema } = getTrainingFaqBundle();

export function TrainingCoursesStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={trainingBreadcrumbs("Training Courses", "/training-courses")}
      faq={coursesFaqSchema}
      courses={ALL_COURSES.map((course) => ({
        name: `${course.track}: ${course.name}`,
        description: course.summary,
        path: "/training-courses",
        price: String(course.price),
      }))}
      includeLocalBusiness={false}
    />
  );
}
