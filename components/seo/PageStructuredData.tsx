import { JsonLd } from "@/components/seo/JsonLd";
import {
  articleSchema,
  breadcrumbListSchema,
  courseSchema,
  faqPageSchema,
  localBusinessSchema,
  repairServiceSchema,
} from "@/lib/seo/schema";
import type {
  ArticleSchemaInput,
  BreadcrumbItem,
  FaqItem,
  RepairServiceSchemaInput,
} from "@/lib/seo/types";

type PageStructuredDataProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  faq?: readonly FaqItem[];
  service?: RepairServiceSchemaInput;
  article?: ArticleSchemaInput;
  courses?: { name: string; description: string; path: string; price?: string }[];
  includeLocalBusiness?: boolean;
};

/** Per-page JSON-LD: breadcrumbs, optional FAQ, repair service, courses, or article. */
export function PageStructuredData({
  breadcrumbs,
  faq,
  service,
  article,
  courses,
  includeLocalBusiness = true,
}: PageStructuredDataProps) {
  const graphs: object[] = [breadcrumbListSchema(breadcrumbs)];

  if (includeLocalBusiness) {
    graphs.push(localBusinessSchema());
  }
  if (service) {
    graphs.push(repairServiceSchema(service));
  }
  if (faq?.length) {
    graphs.push(faqPageSchema(faq));
  }
  if (article) {
    graphs.push(articleSchema(article));
  }
  if (courses?.length) {
    for (const c of courses) {
      graphs.push(courseSchema(c));
    }
  }

  return <JsonLd data={graphs} />;
}
