import { PORTFOLIO_PROJECTS, PORTFOLIO_SLUGS } from "@/lib/portfolio/projects";
import type { PortfolioFilterId, PortfolioProject } from "@/lib/portfolio/types";

export { PORTFOLIO_CATEGORIES, PORTFOLIO_FILTERS } from "@/lib/portfolio/categories";
export { PORTFOLIO_PROJECTS, PORTFOLIO_SLUGS } from "@/lib/portfolio/projects";
export type {
  PortfolioCaseStudy,
  PortfolioCategoryId,
  PortfolioFilterId,
  PortfolioProject,
  ProjectStatus,
} from "@/lib/portfolio/types";

export const PORTFOLIO_METADATA = {
  title: "Software Development Portfolio | PixelNation",
  description:
    "Explore websites, SaaS platforms, automation systems, dashboards, and custom software solutions built by PixelNation.",
  path: "/portfolio",
} as const;

export function getPortfolioProject(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): readonly PortfolioProject[] {
  return PORTFOLIO_PROJECTS.filter((project) => project.featured);
}

export function getRelatedProjects(slugs: readonly string[]): PortfolioProject[] {
  return slugs
    .map((slug) => getPortfolioProject(slug))
    .filter((project): project is PortfolioProject => project !== undefined);
}

export function filterProjects(filterId: PortfolioFilterId): readonly PortfolioProject[] {
  if (filterId === "all") return PORTFOLIO_PROJECTS;
  return PORTFOLIO_PROJECTS.filter((project) => project.filters.includes(filterId));
}

export function getProjectPath(slug: string): string {
  return `/portfolio/${slug}`;
}

export function createCaseStudyMetadata(project: PortfolioProject) {
  return {
    title: `${project.name} Case Study | PixelNation Portfolio`,
    description: project.tagline,
    path: getProjectPath(project.slug),
  };
}
