/** Canonical software service landing page routes. */
export const SOFTWARE_SERVICE_PATHS = {
  overview: "/software-development",
  websiteDevelopment: "/software-development/website-development",
  customSaas: "/software-development/custom-saas-development",
  businessAutomation: "/software-development/business-automation",
} as const;

export const SOFTWARE_DEV_DROPDOWN_LINKS = [
  { label: "Software Overview", href: SOFTWARE_SERVICE_PATHS.overview },
  { label: "Website Development", href: SOFTWARE_SERVICE_PATHS.websiteDevelopment },
  { label: "Custom SaaS Development", href: SOFTWARE_SERVICE_PATHS.customSaas },
  { label: "Business Automation", href: SOFTWARE_SERVICE_PATHS.businessAutomation },
] as const;
