import type { BreadcrumbItem, FaqItem } from "@/lib/seo/types";
import {
  breadcrumbListSchema,
  faqPageSchema,
  localBusinessForArea,
  repairServiceSchema,
} from "@/lib/seo/schema";
import type { AreaServedInput } from "@/lib/seo/types";

type LocalStructuredDataProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  faqs: readonly FaqItem[];
  service?: {
    name: string;
    serviceType: string;
    description: string;
    path: string;
    areaServed?: AreaServedInput | readonly AreaServedInput[];
    offers?: { name: string; description: string }[];
  };
  areaServed: AreaServedInput | readonly AreaServedInput[];
  keywords?: string[];
};

export function LocalStructuredData({
  breadcrumbs,
  faqs,
  service,
  areaServed,
  keywords,
}: LocalStructuredDataProps) {
  const graphs: object[] = [
    localBusinessForArea(areaServed, keywords),
    breadcrumbListSchema(breadcrumbs),
    faqPageSchema(faqs),
  ];

  if (service) {
    graphs.push(
      repairServiceSchema({
        name: service.name,
        serviceType: service.serviceType,
        description: service.description,
        path: service.path,
        areaServed: service.areaServed ?? areaServed,
        offers: service.offers,
      }),
    );
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graphs,
        }),
      }}
    />
  );
}
