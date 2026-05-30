import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { JsonLd } from "@/components/seo/JsonLd";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolio";
import { portfolioBreadcrumbs, portfolioItemListSchema } from "@/lib/seo/schema";

export function PortfolioStructuredData() {
  const items = PORTFOLIO_PROJECTS.map((project, index) => ({
    position: index + 1,
    name: project.name,
    description: project.tagline,
    path: `/portfolio/${project.slug}`,
  }));

  return (
    <>
      <PageStructuredData
        breadcrumbs={portfolioBreadcrumbs()}
        includeLocalBusiness={false}
      />
      <JsonLd data={portfolioItemListSchema(items)} />
    </>
  );
}
