import type { PortfolioCategory, PortfolioFilter } from "@/lib/portfolio/types";

export const PORTFOLIO_CATEGORIES: readonly PortfolioCategory[] = [
  {
    id: "websites",
    label: "Websites",
    description: "Business, nonprofit, dealership, and service company websites.",
  },
  {
    id: "saas-platforms",
    label: "SaaS Platforms",
    description: "Subscription software, portals, and multi-user web applications.",
  },
  {
    id: "business-automation",
    label: "Business Automation",
    description: "Workflow tools, CRM integrations, and operational automation.",
  },
  {
    id: "dashboards",
    label: "Dashboards",
    description: "Reporting, KPI, and executive visibility tools.",
  },
  {
    id: "repair-industry-software",
    label: "Repair Industry Software",
    description: "Shop management and technician workflow platforms.",
  },
  {
    id: "custom-applications",
    label: "Custom Applications",
    description: "Purpose-built tools for niche business requirements.",
  },
] as const;

export const PORTFOLIO_FILTERS: readonly PortfolioFilter[] = [
  { id: "all", label: "All Projects" },
  { id: "websites", label: "Websites" },
  { id: "saas", label: "SaaS" },
  { id: "automation", label: "Automation" },
  { id: "nonprofit", label: "Nonprofit" },
  { id: "automotive", label: "Automotive" },
  { id: "marketplace", label: "Marketplace" },
] as const;
