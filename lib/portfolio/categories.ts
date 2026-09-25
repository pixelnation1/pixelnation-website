import type { PortfolioCategory, PortfolioFilter } from "@/lib/portfolio/types";

export const PORTFOLIO_CATEGORIES: readonly PortfolioCategory[] = [
  {
    id: "websites",
    label: "Websites",
    description: "Business, nonprofit, event, and local service company websites.",
  },
  {
    id: "saas-platforms",
    label: "SaaS Platforms",
    description: "Subscription software, portals, and multi-user web applications.",
  },
  {
    id: "custom-applications",
    label: "Custom Applications",
    description: "Purpose-built tools and marketplace platforms for niche requirements.",
  },
] as const;

export const PORTFOLIO_FILTERS: readonly PortfolioFilter[] = [
  { id: "all", label: "All Projects" },
  { id: "websites", label: "Websites" },
  { id: "saas", label: "SaaS" },
  { id: "automation", label: "Automation" },
] as const;
