export type PortfolioCategoryId =
  | "websites"
  | "saas-platforms"
  | "business-automation"
  | "dashboards"
  | "repair-industry-software"
  | "custom-applications";

export type PortfolioFilterId =
  | "all"
  | "websites"
  | "saas"
  | "automation"
  | "nonprofit"
  | "automotive"
  | "marketplace";

export type ProjectStatus = "live" | "in-development" | "internal";

export type CaseStudyScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudyResult = {
  label: string;
  text: string;
};

export type PortfolioCaseStudy = {
  challenge: string;
  solution: string;
  featuresBuilt: readonly string[];
  screenshots: readonly CaseStudyScreenshot[];
  results: readonly CaseStudyResult[];
  lessonsLearned: readonly string[];
};

export type PortfolioProject = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: PortfolioCategoryId;
  categoryLabel: string;
  industry: string;
  filters: readonly Exclude<PortfolioFilterId, "all">[];
  features: readonly string[];
  technologies: readonly string[];
  screenshot: string;
  screenshotAlt: string;
  logo?: string;
  logoAlt?: string;
  projectUrl?: string;
  status: ProjectStatus;
  featured: boolean;
  caseStudy: PortfolioCaseStudy;
  relatedSlugs: readonly string[];
};

export type PortfolioCategory = {
  id: PortfolioCategoryId;
  label: string;
  description: string;
};

export type PortfolioFilter = {
  id: PortfolioFilterId;
  label: string;
};
