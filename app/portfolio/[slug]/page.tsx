import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components/portfolio/CaseStudyPage";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  createCaseStudyMetadata,
  getPortfolioProject,
  PORTFOLIO_SLUGS,
} from "@/lib/portfolio";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PORTFOLIO_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) return {};
  const meta = createCaseStudyMetadata(project);
  return createPageMetadata({
    title: meta.title,
    description: meta.description,
    path: meta.path,
    titleAbsolute: true,
    ogImage: project.screenshot,
    ogImageAlt: project.screenshotAlt,
  });
}

export default async function PortfolioCaseStudyRoute({ params }: PageProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();
  return <CaseStudyPage project={project} />;
}
