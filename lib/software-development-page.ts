import { SITE } from "@/lib/site";

export const SOFTWARE_DEV_METADATA = {
  title: "Custom Software Development, SaaS & Website Design | PixelNation",
  description:
    "PixelNation builds custom websites, SaaS platforms, business automation systems, client portals, dashboards, and modern web applications for businesses nationwide.",
  path: "/software-development",
} as const;

export const SOFTWARE_DEV_KEYWORDS = [
  "custom software development",
  "SaaS development",
  "website design Emporia KS",
  "business automation",
  "client portal development",
  "custom web applications",
  "dashboard development",
  "Next.js development",
  "software development Kansas",
] as const;

export const HERO_BULLETS = [
  "Custom websites and landing pages",
  "SaaS platforms and subscription software",
  "Business automation and workflow tools",
  "Client portals and internal dashboards",
  "AI-powered productivity systems",
  "Nationwide remote development",
] as const;

import { SOFTWARE_SERVICE_PATHS } from "@/lib/software/links";

export const SERVICE_OFFERINGS = [
  {
    title: "Website Design & Development",
    href: SOFTWARE_SERVICE_PATHS.websiteDevelopment,
    description:
      "High-performance business websites built for credibility, conversions, and search visibility.",
    items: [
      "Business websites",
      "Landing pages",
      "Service websites",
      "Nonprofit websites",
      "E-commerce integrations",
    ],
  },
  {
    title: "Custom SaaS Development",
    href: SOFTWARE_SERVICE_PATHS.customSaas,
    description:
      "Subscription platforms and industry-specific software tailored to how your business actually operates.",
    items: [
      "Subscription platforms",
      "Industry-specific software",
      "Customer portals",
      "Membership systems",
      "Marketplace platforms",
    ],
  },
  {
    title: "Business Automation",
    href: SOFTWARE_SERVICE_PATHS.businessAutomation,
    description:
      "Replace manual spreadsheets and repetitive tasks with systems that save time and reduce errors.",
    items: [
      "Workflow automation",
      "CRM systems",
      "Internal dashboards",
      "Reporting systems",
      "Process optimization",
    ],
  },
  {
    title: "Custom Web Applications",
    href: SOFTWARE_SERVICE_PATHS.customSaas,
    description:
      "Purpose-built tools for inventory, scheduling, employee management, and operational data.",
    items: [
      "Inventory systems",
      "Employee management tools",
      "Scheduling platforms",
      "Booking systems",
      "Data management tools",
    ],
  },
  {
    title: "AI & Automation Solutions",
    href: SOFTWARE_SERVICE_PATHS.businessAutomation,
    description:
      "Practical AI integrations that improve support, workflows, and day-to-day productivity.",
    items: [
      "AI-powered workflows",
      "Chat integrations",
      "Business automation",
      "Customer support tools",
      "Productivity systems",
    ],
  },
] as const;

export const INDUSTRIES = [
  "Repair Shops",
  "Auto Dealerships",
  "Nonprofits",
  "Retail Stores",
  "Service Businesses",
  "Gaming Stores",
  "Small Businesses",
  "Startups",
] as const;

export type PortfolioProject = {
  name: string;
  description: string;
  features: readonly string[];
  technologies: readonly string[];
  image: string;
  imageAlt: string;
  href?: string;
  status: "live" | "coming-soon" | "internal";
};

export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    name: "RepairForge",
    description:
      "Repair shop management SaaS for ticket tracking, customer communication, inventory, and technician workflows.",
    features: [
      "Repair ticket management",
      "Customer notifications",
      "Parts and inventory tracking",
      "Technician assignment",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    image: "/images/computerrepair.png",
    imageAlt: "RepairForge repair shop management SaaS platform",
    status: "coming-soon",
  },
  {
    name: "ReconForge",
    description:
      "Reconditioning and inventory platform built for auto dealerships managing vehicle recon, pricing, and sales prep.",
    features: [
      "Vehicle recon tracking",
      "Cost and margin visibility",
      "Team workflow boards",
      "Reporting dashboards",
    ],
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL"],
    image: "/images/coverlogo.png",
    imageAlt: "ReconForge auto dealership recon and inventory platform",
    status: "coming-soon",
  },
  {
    name: "Custom Business Websites",
    description:
      "Modern, responsive websites for service businesses—designed for local SEO, lead generation, and brand authority.",
    features: [
      "Mobile-first design",
      "SEO-optimized structure",
      "Contact and booking flows",
      "Performance-focused builds",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    image: "/images/coverlogo.png",
    imageAlt: "Custom business website design and development by PixelNation",
    status: "live",
  },
  {
    name: "Inventory Management Systems",
    description:
      "Web-based inventory tools for tracking stock, suppliers, reorder thresholds, and location-level counts.",
    features: [
      "Real-time stock levels",
      "Supplier management",
      "Low-stock alerts",
      "Multi-location support",
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    image: "/images/computerrepair.png",
    imageAlt: "Custom inventory management web application",
    status: "internal",
  },
  {
    name: "Client Portals",
    description:
      "Secure portals where customers view project status, documents, invoices, and support requests in one place.",
    features: [
      "Role-based access",
      "Document sharing",
      "Status tracking",
      "Messaging and notifications",
    ],
    technologies: ["Next.js", "Auth", "PostgreSQL", "API integrations"],
    image: "/images/coverlogo.png",
    imageAlt: "Custom client portal web application",
    status: "internal",
  },
  {
    name: "Business Dashboards",
    description:
      "Executive and operational dashboards that turn scattered data into actionable KPIs and daily decision tools.",
    features: [
      "KPI visualization",
      "Automated reporting",
      "Role-specific views",
      "Export and sharing",
    ],
    technologies: ["React", "Chart.js", "Node.js", "REST APIs"],
    image: "/images/computerrepair.png",
    imageAlt: "Custom business dashboard and reporting system",
    status: "internal",
  },
] as const;

export const WHY_WORK_WITH_US = [
  {
    title: "Custom-built solutions",
    text: "Every project is designed around your workflows—not forced into a generic template or off-the-shelf limitation.",
  },
  {
    title: "Modern responsive design",
    text: "Fast, accessible interfaces that work beautifully on phones, tablets, and desktops.",
  },
  {
    title: "Scalable architecture",
    text: "Built with maintainable code and modern stacks so your platform can grow with your business.",
  },
  {
    title: "Automation-focused development",
    text: "We prioritize systems that eliminate manual work, reduce errors, and improve operational efficiency.",
  },
  {
    title: "Ongoing support",
    text: "Launch is the starting point—we offer maintenance, enhancements, and long-term partnership options.",
  },
  {
    title: "Business-first approach",
    text: "Technology decisions are driven by ROI, usability, and real business outcomes—not buzzwords.",
  },
] as const;

export const SOFTWARE_DEV_FAQ = [
  {
    question: "How much does a custom website cost?",
    answer:
      "Website pricing depends on scope—number of pages, custom features, integrations, and content needs. A professional business website typically starts in the low thousands for a focused build, while larger sites with portals, dashboards, or e-commerce require a custom quote. PixelNation provides transparent proposals after a consultation.",
  },
  {
    question: "Can you build custom software?",
    answer:
      "Yes. PixelNation develops custom web applications, internal tools, client portals, inventory systems, scheduling platforms, and industry-specific software tailored to your business processes.",
  },
  {
    question: "What is SaaS development?",
    answer:
      "SaaS (Software as a Service) development means building subscription-based software accessed through the web—such as customer portals, membership platforms, or industry tools with recurring billing, user accounts, and admin dashboards.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. We offer maintenance, hosting guidance, feature updates, bug fixes, and enhancement packages so your website or application stays secure, fast, and aligned with your evolving business needs.",
  },
  {
    question: "Can you automate business processes?",
    answer:
      "Absolutely. We build workflow automation, CRM integrations, reporting dashboards, and custom tools that replace manual spreadsheets, reduce duplicate data entry, and streamline operations across teams.",
  },
  {
    question: "Do you work with businesses outside Kansas?",
    answer:
      `Yes. While PixelNation is based in ${SITE.address.region}, we work with businesses nationwide through remote discovery, design reviews, development sprints, and structured project communication.`,
  },
] as const;

export const AEO_ANSWERS = [
  {
    question: "What software services does PixelNation offer?",
    answer:
      "PixelNation builds custom websites, SaaS platforms, business automation systems, client portals, dashboards, and modern web applications for businesses nationwide.",
  },
  {
    question: "Does PixelNation build SaaS products?",
    answer:
      "Yes. PixelNation develops subscription platforms, customer portals, membership systems, and industry-specific SaaS products with user authentication, admin panels, and scalable architecture.",
  },
  {
    question: "Can PixelNation automate my business workflows?",
    answer:
      "Yes. PixelNation creates workflow automation, CRM systems, internal dashboards, and reporting tools designed to reduce manual work and improve operational efficiency.",
  },
] as const;

export const CONVERSATIONAL_QUERIES = [
  "Who builds custom SaaS in Kansas?",
  "How much does custom software development cost?",
  "Can PixelNation build a client portal for my business?",
  "Do you develop business automation tools?",
] as const;

export const GEO_COPY = `PixelNation is a technology solutions company based in ${SITE.address.region}, serving businesses nationwide with custom software development, SaaS platforms, business automation, and modern website design. Whether you need a high-converting service website, an internal dashboard, or a full subscription platform, we build solutions tailored to your industry and workflow—not generic templates.`;
