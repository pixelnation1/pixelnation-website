import { PageStructuredData } from "@/components/seo/PageStructuredData";
import {
  AEO_ANSWERS,
  ALL_COURSES,
  COURSES_FAQ,
} from "@/lib/training-courses-page";
import { trainingBreadcrumbs } from "@/lib/seo/schema";

export function TrainingCoursesStructuredData() {
  return (
    <PageStructuredData
      breadcrumbs={trainingBreadcrumbs("Training Courses", "/training-courses")}
      faq={[...COURSES_FAQ, ...AEO_ANSWERS]}
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
