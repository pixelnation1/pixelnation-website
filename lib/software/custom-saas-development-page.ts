import { SITE } from "@/lib/site";
import { SOFTWARE_SERVICE_PATHS } from "@/lib/software/links";

export const CUSTOM_SAAS_METADATA = {
  title: "Custom SaaS Development & Web App Development | PixelNation",
  description:
    "PixelNation builds custom SaaS platforms, client portals, dashboards, subscription software, marketplaces, and business web applications.",
  path: SOFTWARE_SERVICE_PATHS.customSaas,
} as const;

export const CUSTOM_SAAS_KEYWORDS = [
  "custom SaaS development",
  "web app development",
  "client portal development",
  "subscription platform development",
  "marketplace software",
  "MVP development",
  "SaaS development Kansas",
] as const;

export const HERO = {
  eyebrow: "Custom SaaS · Web Applications · Nationwide",
  headline: "Custom SaaS Platforms Built Around Real Business Problems",
  subheadline:
    "PixelNation develops subscription software, client portals, dashboards, marketplaces, and internal tools—software shaped by how your business operates, not how a generic platform expects you to work.",
  bullets: [
    "Client portals and customer-facing apps",
    "Subscription and membership platforms",
    "Admin dashboards and internal tools",
    "Marketplace and multi-sided platforms",
    "MVP builds for validated ideas",
    "Scalable modern architecture",
  ],
} as const;

export const SAAS_PRODUCTS = [
  {
    title: "Client Portals",
    description:
      "Secure portals where customers track projects, view documents, pay invoices, submit requests, and communicate with your team in one place.",
    items: ["Role-based access", "Document sharing", "Status tracking", "Notifications"],
  },
  {
    title: "Dashboards",
    description:
      "Executive and operational dashboards that turn scattered data into KPIs, trends, and daily decision tools your team actually uses.",
    items: ["Real-time metrics", "Role-specific views", "Export and reporting", "API integrations"],
  },
  {
    title: "Subscription Platforms",
    description:
      "Recurring billing software with user accounts, tiered plans, admin panels, and the workflows subscription businesses depend on.",
    items: ["Stripe billing integration", "User management", "Plan upgrades", "Usage tracking"],
  },
  {
    title: "Marketplaces",
    description:
      "Multi-sided platforms connecting buyers and sellers, service providers and customers, or vendors and operators with trust and transaction flows.",
    items: ["Listings and search", "User profiles", "Messaging", "Payment flows"],
  },
  {
    title: "Internal Tools",
    description:
      "Purpose-built software for inventory, scheduling, employee management, ticketing, and operations that off-the-shelf tools cannot handle.",
    items: ["Workflow automation", "Custom permissions", "Reporting", "Integrations"],
  },
  {
    title: "MVP Development",
    description:
      "Focused first releases that validate your idea with real users—built to learn fast without over-engineering before product-market fit.",
    items: ["Core feature prioritization", "Rapid iteration", "Scalable foundation", "Launch-ready deployment"],
  },
] as const;

export const WHY_CUSTOM_SAAS = [
  {
    title: "Own your platform",
    text: "You control features, pricing, data, and roadmap—not a third-party SaaS vendor's limitations or price increases.",
  },
  {
    title: "Competitive differentiation",
    text: "Industry-specific workflows become your moat when software is built around how you win customers.",
  },
  {
    title: "Recurring revenue potential",
    text: "Subscription products create leverage—one well-built platform can serve hundreds or thousands of users.",
  },
  {
    title: "Integration freedom",
    text: "Connect CRMs, payment systems, inventory, and reporting tools exactly the way your operation requires.",
  },
] as const;

export const SAAS_PROCESS = [
  {
    step: "01",
    title: "Problem definition",
    text: "We map users, workflows, pain points, and success metrics before writing code.",
  },
  {
    step: "02",
    title: "Architecture & MVP scope",
    text: "Tech stack, data model, and phased delivery plan focused on the highest-value features first.",
  },
  {
    step: "03",
    title: "Build & iterate",
    text: "Agile development with demos, feedback loops, and testing on real scenarios.",
  },
  {
    step: "04",
    title: "Launch & scale",
    text: "Deployment, monitoring, onboarding flows, and a roadmap for enhancements as usage grows.",
  },
] as const;

export const FEATURED_SAAS_PROJECTS = [
  {
    name: "RepairForge",
    description:
      "Repair shop management SaaS for ticket tracking, customer communication, parts inventory, and technician workflows—built for operators who outgrew spreadsheets.",
    features: ["Repair tickets", "Customer notifications", "Inventory tracking", "Technician dashboards"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    status: "In development",
  },
  {
    name: "ReconForge",
    description:
      "Reconditioning and inventory platform for auto dealerships managing vehicle recon, pricing, margin visibility, and sales prep workflows.",
    features: ["Recon tracking", "Cost visibility", "Team boards", "Reporting"],
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL"],
    status: "In development",
  },
] as const;

export const CUSTOM_SAAS_FAQ = [
  {
    question: "What is custom SaaS development?",
    answer:
      "Custom SaaS development means building subscription-based software tailored to your business—user accounts, billing, admin panels, and workflows designed for your industry rather than adapted from a generic tool.",
  },
  {
    question: "How is SaaS different from a regular website?",
    answer:
      "A website primarily presents information and captures leads. SaaS includes authenticated users, persistent data, business logic, dashboards, and often recurring billing—it's software people log into and use daily.",
  },
  {
    question: "Can PixelNation build an MVP?",
    answer:
      "Yes. We scope MVPs around the smallest feature set that validates your idea, then architect for growth so you are not rebuilding from scratch after traction.",
  },
  {
    question: "What technologies do you use for SaaS?",
    answer:
      "We typically use Next.js, React, TypeScript, PostgreSQL or Supabase, and modern hosting—chosen for performance, maintainability, and scalability.",
  },
  {
    question: "Do you provide ongoing SaaS maintenance?",
    answer:
      "Yes. We offer support, bug fixes, feature enhancements, security updates, and infrastructure guidance after launch.",
  },
  {
    question: "Do you work with startups outside Kansas?",
    answer:
      `Yes. PixelNation is based in ${SITE.address.region} and works with founders and businesses nationwide through remote discovery, demos, and structured development sprints.`,
  },
] as const;

export const CONVERSATIONAL_QUERIES = [
  "Who builds custom SaaS platforms?",
  "How much does custom SaaS development cost?",
  "Client portal development company",
  "MVP web app development services",
] as const;

export const GEO_COPY = `PixelNation develops custom SaaS and web applications for businesses in ${SITE.address.region} and across the United States. From client portals to subscription platforms like RepairForge and ReconForge, we build software that solves operational problems—not demo-ware.`;
