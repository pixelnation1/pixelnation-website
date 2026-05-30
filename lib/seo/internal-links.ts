export type InternalLink = {
  label: string;
  href: string;
  description?: string;
};

/** Related repair services by canonical path (for internal linking / topical authority). */
export const RELATED_REPAIR_LINKS: Record<string, InternalLink[]> = {
  "/phone-repair": [
    { label: "Board Repair", href: "/board-repair", description: "Charging IC and trace-level phone faults" },
    { label: "Data Recovery", href: "/data-recovery", description: "Recover photos and files from failed phones" },
    { label: "Computer Repair", href: "/computer-repair", description: "Laptops, desktops, and Mac repair" },
    { label: "Charging Port Failure Guide", href: "/knowledge/what-causes-charging-port-failure", description: "Port vs board IC symptoms" },
    { label: "Phone Board Damage Signs", href: "/knowledge/signs-your-phone-has-board-damage", description: "When you need microsoldering" },
  ],
  "/computer-repair": [
    { label: "Data Recovery", href: "/data-recovery", description: "SSD, HDD, and boot failure recovery" },
    { label: "Board Repair", href: "/board-repair", description: "Motherboard and power rail repair" },
    { label: "Phone Repair", href: "/phone-repair", description: "Smartphone screens, batteries, and ports" },
    { label: "Laptop No Display Guide", href: "/knowledge/common-causes-of-laptop-no-display", description: "Black screen troubleshooting" },
  ],
  "/appliance-repair": [
    { label: "Board Repair", href: "/board-repair", description: "Control board and power diagnostics" },
    { label: "Computer Repair", href: "/computer-repair", description: "Smart appliance and PC support" },
    { label: "Repairs Overview", href: "/repairs", description: "All PixelNation repair services" },
  ],
  "/console-repair": [
    { label: "Training", href: "/training", description: "Microsoldering courses in Emporia, KS" },
    { label: "Board Repair", href: "/board-repair", description: "HDMI port and power rail console repair" },
    { label: "Data Recovery", href: "/data-recovery", description: "Console storage and save data recovery" },
    { label: "Phone Repair", href: "/phone-repair", description: "Handheld and mobile gaming devices" },
    { label: "Why PS5 HDMI Ports Fail", href: "/knowledge/why-ps5-hdmi-ports-fail", description: "Console HDMI repair guide" },
    { label: "HDMI Port vs Encoder", href: "/knowledge/hdmi-port-vs-hdmi-encoder-failure", description: "Diagnose no video correctly" },
  ],
  "/data-recovery": [
    { label: "Board Repair", href: "/board-repair", description: "Power-on failures and storage access" },
    { label: "Phone Repair", href: "/phone-repair", description: "Phones that will not boot" },
    { label: "Computer Repair", href: "/computer-repair", description: "Laptop and desktop drive recovery" },
    { label: "Dead Phone Data Recovery", href: "/knowledge/can-data-be-recovered-from-a-dead-phone", description: "When recovery is possible" },
  ],
  "/board-repair": [
    { label: "Phone Repair", href: "/phone-repair", description: "Board-level smartphone repair" },
    { label: "Console Repair", href: "/console-repair", description: "PS5, Xbox, and Switch HDMI repair" },
    { label: "Training", href: "/training", description: "Microsoldering courses in Emporia, KS" },
    { label: "What Is Microsoldering?", href: "/knowledge/what-is-microsoldering", description: "Board-level repair explained" },
  ],
  "/repairs": [
    { label: "Phone Repair", href: "/phone-repair" },
    { label: "Computer Repair", href: "/computer-repair" },
    { label: "Data Recovery", href: "/data-recovery" },
    { label: "Board Repair", href: "/board-repair" },
  ],
  "/training": [
    { label: "Training Courses", href: "/training-courses", description: "Pricing and course comparison" },
    { label: "Board Repair", href: "/board-repair", description: "See the repair work students learn" },
    { label: "Contact", href: "/contact", description: "Book training or custom instruction" },
  ],
  "/training-courses": [
    { label: "Training Overview", href: "/training" },
    { label: "Board Repair", href: "/board-repair" },
    { label: "Contact", href: "/contact" },
  ],
  "/": [
    { label: "Repairs", href: "/repairs" },
    { label: "Software Development", href: "/software-development", description: "Custom SaaS, websites & automation" },
    { label: "Website Development", href: "/software-development/website-development", description: "Business websites & landing pages" },
    { label: "Knowledge Hub", href: "/knowledge" },
    { label: "Training", href: "/training" },
    { label: "Contact", href: "/contact" },
  ],
  "/software-development": [
    { label: "Website Development", href: "/software-development/website-development", description: "Business websites, landing pages & nonprofits" },
    { label: "Custom SaaS Development", href: "/software-development/custom-saas-development", description: "Portals, dashboards & subscription platforms" },
    { label: "Business Automation", href: "/software-development/business-automation", description: "CRM, workflows & reporting systems" },
    { label: "Repairs Overview", href: "/repairs", description: "Device and board-level repair services" },
    { label: "Contact", href: "/contact", description: "Schedule a software consultation" },
  ],
  "/software-development/website-development": [
    { label: "Custom SaaS Development", href: "/software-development/custom-saas-development", description: "Client portals and subscription software" },
    { label: "Business Automation", href: "/software-development/business-automation", description: "Workflow and CRM automation" },
    { label: "Software Overview", href: "/software-development", description: "All PixelNation software services" },
    { label: "Contact", href: "/contact", description: "Request a website consultation" },
  ],
  "/software-development/custom-saas-development": [
    { label: "Website Development", href: "/software-development/website-development", description: "Business and service company websites" },
    { label: "Business Automation", href: "/software-development/business-automation", description: "Workflow and dashboard automation" },
    { label: "Software Overview", href: "/software-development", description: "All PixelNation software services" },
    { label: "Contact", href: "/contact", description: "Discuss your SaaS project" },
  ],
  "/software-development/business-automation": [
    { label: "Website Development", href: "/software-development/website-development", description: "Modern business websites" },
    { label: "Custom SaaS Development", href: "/software-development/custom-saas-development", description: "Portals, dashboards & internal tools" },
    { label: "Software Overview", href: "/software-development", description: "All PixelNation software services" },
    { label: "Contact", href: "/contact", description: "Discuss automation opportunities" },
  ],
  "/about": [
    { label: "Software Development", href: "/software-development", description: "Custom SaaS, websites & automation" },
    { label: "Website Development", href: "/software-development/website-development", description: "Business websites & landing pages" },
    { label: "Custom SaaS", href: "/software-development/custom-saas-development", description: "Portals, dashboards & platforms" },
    { label: "Repairs Overview", href: "/repairs", description: "All PixelNation repair services" },
    { label: "Contact", href: "/contact", description: "Get in touch with PixelNation" },
  ],
  "/knowledge": [
    { label: "Repair Services", href: "/repairs", description: "All PixelNation repair services" },
    { label: "What Is Microsoldering?", href: "/knowledge/what-is-microsoldering", description: "Board-level repair basics" },
    { label: "PS5 HDMI Port Failure", href: "/knowledge/why-ps5-hdmi-ports-fail", description: "Console video troubleshooting" },
    { label: "Dead Phone Data Recovery", href: "/knowledge/can-data-be-recovered-from-a-dead-phone", description: "When recovery is possible" },
    { label: "Liquid Damage Guide", href: "/knowledge/how-liquid-damage-corrodes-electronics", description: "Corrosion and first steps" },
    { label: "Board Repair Services", href: "/board-repair", description: "Professional microsoldering" },
    { label: "Contact", href: "/contact", description: "Book a diagnostic" },
  ],
  "/locations": [
    { label: "Emporia", href: "/locations/emporia" },
    { label: "Wichita", href: "/locations/wichita" },
    { label: "Repair Services", href: "/services" },
    { label: "Repairs Overview", href: "/repairs" },
  ],
  "/services": [
    { label: "iPhone Repair", href: "/services/iphone-repair" },
    { label: "PS5 HDMI Repair", href: "/services/ps5-hdmi-repair" },
    { label: "Kansas Locations", href: "/locations" },
    { label: "Board Repair", href: "/board-repair" },
  ],
  "/services/iphone-repair": [
    { label: "Charging Port Repair", href: "/services/charging-port-repair" },
    { label: "Liquid Damage", href: "/services/liquid-damage-repair" },
    { label: "Phone Repair (full)", href: "/phone-repair" },
    { label: "Wichita iPhone Repair", href: "/locations/wichita/iphone-repair" },
  ],
  "/services/ps5-hdmi-repair": [
    { label: "HDMI Repair", href: "/services/hdmi-repair" },
    { label: "Console Repair", href: "/console-repair" },
    { label: "Board Repair", href: "/board-repair" },
    { label: "Wichita PS5 HDMI", href: "/locations/wichita/ps5-hdmi-repair" },
  ],
  "/services/computer-repair": [
    { label: "Data Recovery", href: "/services/data-recovery" },
    { label: "Board Repair", href: "/services/board-repair" },
    { label: "Computer Repair (full)", href: "/computer-repair" },
  ],
  "/services/data-recovery": [
    { label: "Liquid Damage Repair", href: "/services/liquid-damage-repair" },
    { label: "iPhone Repair", href: "/services/iphone-repair" },
    { label: "Data Recovery (full)", href: "/data-recovery" },
  ],
  "/services/board-repair": [
    { label: "Microsoldering", href: "/services/microsoldering" },
    { label: "HDMI Repair", href: "/services/hdmi-repair" },
    { label: "Board Repair (full)", href: "/board-repair" },
  ],
};

export function getRelatedRepairLinks(path: string): InternalLink[] {
  return RELATED_REPAIR_LINKS[path] ?? RELATED_REPAIR_LINKS["/repairs"] ?? [];
}
