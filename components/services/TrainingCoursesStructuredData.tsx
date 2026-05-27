import {
  AEO_ANSWERS,
  ALL_COURSES,
  COURSES_FAQ,
  TRAINING_COURSES_METADATA,
} from "@/lib/training-courses-page";
import { SITE } from "@/lib/site";

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function TrainingCoursesStructuredData() {
  const pageUrl = TRAINING_COURSES_METADATA.canonical;
  const allFaq = [...COURSES_FAQ, ...AEO_ANSWERS];

  const courses = ALL_COURSES.map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${course.track}: ${course.name}`,
    description: course.summary,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.domain,
    },
    educationalLevel: course.skillLevel,
    courseMode: "onsite",
    timeRequired: course.duration,
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "USD",
      url: `${SITE.domain}/contact`,
      availability: "https://schema.org/LimitedAvailability",
    },
    url: pageUrl,
  }));

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${pageUrl}#organization`,
    name: SITE.name,
    url: SITE.domain,
    logo: `${SITE.domain}/images/pixellogo.png`,
    email: SITE.email,
    telephone: SITE.phone,
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: "Training",
        item: `${SITE.domain}/training`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Training Courses",
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      {courses.map((course, index) => (
        <JsonLdScript key={ALL_COURSES[index].id} data={course} />
      ))}
      <JsonLdScript data={organization} />
      <JsonLdScript data={faqPage} />
      <JsonLdScript data={breadcrumb} />
    </>
  );
}
