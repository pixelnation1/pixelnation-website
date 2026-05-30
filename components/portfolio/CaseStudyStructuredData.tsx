import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { JsonLd } from "@/components/seo/JsonLd";
import type { PortfolioProject } from "@/lib/portfolio/types";
import { portfolioCaseStudyBreadcrumbs, portfolioProjectSchema } from "@/lib/seo/schema";

type CaseStudyStructuredDataProps = {
  project: PortfolioProject;
};

export function CaseStudyStructuredData({ project }: CaseStudyStructuredDataProps) {
  return (
    <>
      <PageStructuredData
        breadcrumbs={portfolioCaseStudyBreadcrumbs(project.name, `/portfolio/${project.slug}`)}
        includeLocalBusiness={false}
      />
      <JsonLd data={portfolioProjectSchema(project)} />
    </>
  );
}
