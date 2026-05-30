import { SITE } from "@/lib/site";
import type { PortfolioProject } from "@/lib/portfolio/types";

export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    slug: "repairforge",
    name: "RepairForge",
    tagline: "Repair shop management SaaS for tickets, inventory, and technician workflows.",
    description:
      "RepairForge is a subscription platform built for electronics and device repair shops that need ticket tracking, customer communication, parts inventory, and technician assignment in one system.",
    category: "saas-platforms",
    categoryLabel: "SaaS Platform",
    industry: "Repair & Electronics",
    filters: ["saas", "automation"],
    features: [
      "Repair ticket management",
      "Customer notifications",
      "Parts and inventory tracking",
      "Technician assignment",
      "Shop dashboard",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Stripe"],
    screenshot: "/images/computerrepair.png",
    screenshotAlt: "RepairForge repair shop management SaaS platform screenshot",
    logo: "/images/pixellogo.png",
    logoAlt: "RepairForge logo",
    status: "in-development",
    featured: true,
    relatedSlugs: ["reconforge", "pixelnation-website"],
    caseStudy: {
      challenge:
        "Repair shops often run on a mix of paper tickets, spreadsheets, and generic POS tools that were never designed for device diagnostics, parts sourcing, or technician handoffs. Shop owners lose visibility into open jobs, repeat customers fall through the cracks, and inventory counts drift out of sync with reality.",
      solution:
        "RepairForge centralizes the repair lifecycle—from intake and diagnosis through parts ordering, technician assignment, customer updates, and pickup—in a purpose-built SaaS platform designed around how repair benches actually operate.",
      featuresBuilt: [
        "Multi-status repair ticket pipeline with technician ownership",
        "Customer notification triggers for estimates, approvals, and ready-for-pickup",
        "Parts inventory with low-stock alerts and supplier tracking",
        "Role-based access for front desk, technicians, and shop owners",
        "Dashboard views for daily workload and revenue visibility",
      ],
      screenshots: [
        {
          src: "/images/computerrepair.png",
          alt: "RepairForge repair ticket dashboard interface",
          caption: "Repair ticket pipeline and shop workload view",
        },
        {
          src: "/images/motherboardrepair2.png",
          alt: "RepairForge technician workflow screen",
          caption: "Technician assignment and board-level repair tracking",
        },
      ],
      results: [
        {
          label: "Operational focus",
          text: "Designed to replace fragmented ticket tracking with a single shop command center.",
        },
        {
          label: "Industry fit",
          text: "Built specifically for device repair workflows—not adapted from retail or generic CRM tools.",
        },
        {
          label: "Scalability",
          text: "Architecture supports multi-location shops and subscription billing as the platform grows.",
        },
      ],
      lessonsLearned: [
        "Repair shops need status clarity more than feature volume—every screen should answer 'what needs attention now?'",
        "Inventory and ticketing must share one data model or shops will always revert to spreadsheets.",
        "Customer communication automation reduces front-desk load without making the shop feel impersonal.",
      ],
    },
  },
  {
    slug: "reconforge",
    name: "ReconForge",
    tagline: "Automotive recon and inventory platform for dealership operations.",
    description:
      "ReconForge helps auto dealerships track vehicle reconditioning, recon costs, margin visibility, and sales prep workflows across their inventory pipeline.",
    category: "saas-platforms",
    categoryLabel: "Automotive SaaS",
    industry: "Automotive & Dealerships",
    filters: ["saas", "automotive", "automation"],
    features: [
      "Vehicle recon tracking",
      "Cost and margin visibility",
      "Team workflow boards",
      "Reporting dashboards",
      "Inventory pipeline views",
    ],
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    screenshot: "/images/coverlogo.png",
    screenshotAlt: "ReconForge auto dealership recon platform screenshot",
    logo: "/images/pixellogo.png",
    logoAlt: "ReconForge logo",
    status: "in-development",
    featured: true,
    relatedSlugs: ["repairforge", "dlf-auto-sales"],
    caseStudy: {
      challenge:
        "Dealership recon departments juggle vehicle status across whiteboards, shared spreadsheets, and disconnected vendor tools. Managers lack real-time visibility into recon spend, days-in-pipeline, and margin impact before vehicles hit the front line.",
      solution:
        "ReconForge provides a dealership-focused platform for tracking each vehicle through recon stages, assigning team tasks, logging costs, and surfacing margin and timeline data before sales decisions are made.",
      featuresBuilt: [
        "Vehicle-level recon pipeline with stage tracking",
        "Cost logging and margin calculation per unit",
        "Team boards for detail, mechanical, and photo workflows",
        "Manager dashboards for pipeline aging and spend totals",
        "Export-ready reporting for leadership reviews",
      ],
      screenshots: [
        {
          src: "/images/coverlogo.png",
          alt: "ReconForge vehicle recon pipeline dashboard",
          caption: "Dealership recon pipeline and cost visibility",
        },
      ],
      results: [
        {
          label: "Margin clarity",
          text: "Leadership can see recon investment against expected front-line margin before pricing decisions.",
        },
        {
          label: "Team coordination",
          text: "Replaces scattered updates with a shared workflow board across recon roles.",
        },
        {
          label: "Dealership fit",
          text: "Purpose-built for automotive recon—not generic project management software.",
        },
      ],
      lessonsLearned: [
        "Dealership software must match how recon teams actually hand off vehicles between detail, mechanical, and sales prep.",
        "Cost visibility at the VIN level is more valuable than aggregate monthly reports.",
        "Simple stage-based pipelines outperform complex ERP-style interfaces for floor teams.",
      ],
    },
  },
  {
    slug: "pixelnation-website",
    name: "PixelNation Website",
    tagline: "Full-stack repair, training, and software development web platform.",
    description:
      "The PixelNation website combines local repair service pages, knowledge hub content, training courses, software development offerings, and SEO-optimized location landing pages into one high-performance Next.js platform.",
    category: "websites",
    categoryLabel: "Business Website",
    industry: "Technology & Repair Services",
    filters: ["websites"],
    features: [
      "Multi-service repair pages",
      "Knowledge hub and articles",
      "Training course pages",
      "Software development section",
      "Local SEO location pages",
      "Structured data throughout",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    screenshot: "/images/coverlogo.png",
    screenshotAlt: "PixelNation business website homepage screenshot",
    logo: "/images/pixellogo.png",
    logoAlt: "PixelNation logo",
    projectUrl: SITE.domain,
    status: "live",
    featured: true,
    relatedSlugs: ["repairforge", "monique-a-wish"],
    caseStudy: {
      challenge:
        "PixelNation needed a web platform that could represent advanced repair capabilities, training programs, and growing software services—without splitting authority across disconnected sites or sacrificing local search performance in Emporia, Kansas.",
      solution:
        "A unified Next.js platform with dedicated service pages, structured data, internal linking hubs, location landing pages, and expandable software development sections—built for SEO, AEO, and conversion from day one.",
      featuresBuilt: [
        "Repair service pages with FAQ and Service schema",
        "Knowledge hub with article and category routing",
        "Training and course comparison pages",
        "Software development and portfolio sections",
        "City and city-service local landing page system",
        "Mobile-first responsive design with fast static generation",
      ],
      screenshots: [
        {
          src: "/images/coverlogo.png",
          alt: "PixelNation website homepage",
          caption: "Homepage with repair, training, and software service paths",
        },
        {
          src: "/images/computerrepair.png",
          alt: "PixelNation software development section",
          caption: "Software development and portfolio integration",
        },
      ],
      results: [
        {
          label: "Unified authority",
          text: "Repair, training, and software services reinforce one another under a single technical brand.",
        },
        {
          label: "SEO architecture",
          text: "Structured internal linking, schema markup, and location pages support long-tail local rankings.",
        },
        {
          label: "Expandable platform",
          text: "Modular content layers make adding portfolio case studies and SaaS pages straightforward.",
        },
      ],
      lessonsLearned: [
        "Service businesses benefit when repair credibility and software capability live on one authoritative domain.",
        "Schema and internal links should be planned at the architecture level—not bolted on after launch.",
        "Static generation keeps complex multi-section sites fast without sacrificing content depth.",
      ],
    },
  },
  {
    slug: "dlf-auto-sales",
    name: "DLF Auto Sales",
    tagline: "Dealership website built for inventory visibility and lead generation.",
    description:
      "A dealership website designed to showcase inventory, build buyer trust, and convert visitors into calls, form submissions, and lot visits.",
    category: "websites",
    categoryLabel: "Dealership Website",
    industry: "Automotive & Dealerships",
    filters: ["websites", "automotive"],
    features: [
      "Inventory showcase layouts",
      "Mobile-first browsing",
      "Lead capture forms",
      "Trust and credibility sections",
      "Local SEO structure",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS"],
    screenshot: "/images/coverlogo.png",
    screenshotAlt: "DLF Auto Sales dealership website screenshot",
    status: "live",
    featured: true,
    relatedSlugs: ["reconforge", "pixelnation-website"],
    caseStudy: {
      challenge:
        "Independent dealerships need websites that make inventory easy to browse on mobile, establish trust quickly, and drive calls and visit requests—without the overhead of enterprise dealer platforms.",
      solution:
        "A custom dealership website focused on clean inventory presentation, fast mobile performance, prominent contact paths, and local search structure that helps buyers find the lot.",
      featuresBuilt: [
        "Inventory-focused page layouts optimized for mobile shoppers",
        "Prominent click-to-call and contact form CTAs",
        "Trust sections for dealership credibility and service area",
        "SEO-friendly structure for local automotive search",
        "Fast-loading static pages for inventory browsing",
      ],
      screenshots: [
        {
          src: "/images/coverlogo.png",
          alt: "DLF Auto Sales dealership website inventory view",
          caption: "Inventory-focused dealership website layout",
        },
      ],
      results: [
        {
          label: "Mobile-first buyers",
          text: "Designed for shoppers browsing inventory on phones before visiting the lot.",
        },
        {
          label: "Lead paths",
          text: "Clear CTAs reduce friction between browsing and contacting the dealership.",
        },
        {
          label: "Independent fit",
          text: "Custom build avoids bloated dealer templates and unnecessary monthly platform fees.",
        },
      ],
      lessonsLearned: [
        "Dealership sites win when inventory is scannable in seconds on a phone screen.",
        "Trust signals matter as much as inventory listings for independent lots.",
        "Local SEO structure should align with how nearby buyers search for used cars.",
      ],
    },
  },
  {
    slug: "monique-a-wish",
    name: "Monique A Wish",
    tagline: "Nonprofit website for mission storytelling and community engagement.",
    description:
      "A nonprofit web platform focused on mission communication, program visibility, and clear paths for donations, volunteering, and community support.",
    category: "websites",
    categoryLabel: "Nonprofit Website",
    industry: "Nonprofit",
    filters: ["websites", "nonprofit"],
    features: [
      "Mission and impact storytelling",
      "Program overview pages",
      "Donation and support CTAs",
      "Accessible readable layouts",
      "Event and volunteer paths",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS"],
    screenshot: "/images/coverlogo.png",
    screenshotAlt: "Monique A Wish nonprofit website screenshot",
    status: "live",
    featured: true,
    relatedSlugs: ["pixelnation-website", "dlf-auto-sales"],
    caseStudy: {
      challenge:
        "Nonprofits need websites that communicate mission clearly, showcase program impact, and make it easy for supporters to donate or get involved—without overwhelming volunteers with complex content management.",
      solution:
        "A mission-driven website with clear narrative structure, program highlights, accessible design, and prominent support CTAs that guide visitors toward meaningful action.",
      featuresBuilt: [
        "Mission-forward homepage with impact-focused messaging",
        "Program pages explaining services and community outcomes",
        "Donation and volunteer call-to-action sections",
        "Accessible typography and mobile-friendly layouts",
        "SEO structure for local nonprofit discovery",
      ],
      screenshots: [
        {
          src: "/images/coverlogo.png",
          alt: "Monique A Wish nonprofit website mission page",
          caption: "Mission storytelling and community engagement layout",
        },
      ],
      results: [
        {
          label: "Clear mission",
          text: "Visitors understand the organization's purpose and impact within seconds.",
        },
        {
          label: "Action paths",
          text: "Donation and volunteer CTAs are visible without feeling pushy.",
        },
        {
          label: "Accessible design",
          text: "Readable layouts support supporters across devices and accessibility needs.",
        },
      ],
      lessonsLearned: [
        "Nonprofit sites should lead with impact stories, not organizational jargon.",
        "Every page needs a clear next step for supporters—donate, volunteer, or share.",
        "Simple content structures help volunteer-run organizations keep the site current.",
      ],
    },
  },
  {
    slug: "tcgkingdoms",
    name: "TCGKingdoms",
    tagline: "Marketplace platform concept for trading card game buyers and sellers.",
    description:
      "TCGKingdoms is a marketplace platform concept connecting trading card game buyers and sellers with listings, seller profiles, and category-driven discovery.",
    category: "custom-applications",
    categoryLabel: "Marketplace Platform",
    industry: "Gaming & E-commerce",
    filters: ["saas", "marketplace"],
    features: [
      "Seller listings",
      "Category-driven discovery",
      "User profiles",
      "Marketplace search",
      "Transaction-ready architecture",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
    screenshot: "/images/coverlogo.png",
    screenshotAlt: "TCGKingdoms marketplace platform screenshot",
    status: "internal",
    featured: true,
    relatedSlugs: ["repairforge", "pixelnation-website"],
    caseStudy: {
      challenge:
        "Trading card game communities often buy and sell through fragmented social channels and generic marketplaces that lack category-specific discovery, seller trust signals, and community-focused browsing experiences.",
      solution:
        "TCGKingdoms explores a focused marketplace architecture with category-driven listings, seller profiles, search and filter flows, and a foundation for transaction and trust features as the platform matures.",
      featuresBuilt: [
        "Listing creation and category taxonomy for TCG products",
        "Seller profile pages with listing history",
        "Search and filter flows for product discovery",
        "Marketplace homepage with featured categories",
        "Scalable data model for future payments and messaging",
      ],
      screenshots: [
        {
          src: "/images/coverlogo.png",
          alt: "TCGKingdoms marketplace homepage",
          caption: "Marketplace discovery and category browsing concept",
        },
      ],
      results: [
        {
          label: "Category focus",
          text: "Discovery flows designed around how TCG collectors actually search for products.",
        },
        {
          label: "Platform foundation",
          text: "Architecture supports future payment, messaging, and seller verification features.",
        },
        {
          label: "Community commerce",
          text: "Demonstrates PixelNation's ability to build multi-sided marketplace platforms.",
        },
      ],
      lessonsLearned: [
        "Marketplace products need trust and discovery solved together—not listings alone.",
        "Category taxonomy is a product decision as much as a technical one in niche commerce.",
        "MVP marketplace builds should prioritize seller onboarding and search before payments complexity.",
      ],
    },
  },
] as const;

export const PORTFOLIO_SLUGS = PORTFOLIO_PROJECTS.map((project) => project.slug);
