import { SITE } from "@/lib/site";
import { SOFTWARE_SERVICE_PATHS } from "@/lib/software/links";

export const WEBSITE_DEV_METADATA = {
  title: "Website Development Services for Businesses | PixelNation",
  description:
    "PixelNation builds modern, fast, mobile-friendly websites for small businesses, service companies, nonprofits, local brands, and growing organizations.",
  path: SOFTWARE_SERVICE_PATHS.websiteDevelopment,
} as const;

export const WEBSITE_DEV_KEYWORDS = [
  "website development",
  "business website design",
  "small business websites",
  "nonprofit website development",
  "local business websites",
  "service company websites",
  "landing page development",
  "website development Kansas",
] as const;

export const HERO = {
  eyebrow: "Website Development · Nationwide",
  headline: "Modern Websites Built to Convert",
  subheadline:
    "PixelNation designs and develops fast, mobile-friendly websites that help small businesses, service companies, nonprofits, and growing brands look credible, rank in search, and turn visitors into leads.",
  bullets: [
    "Custom design—not generic templates",
    "Mobile-first, fast-loading builds",
    "SEO, GEO, and AEO structure built in",
    "Clear calls-to-action and lead capture",
    "Scalable on modern web stacks",
    "Nationwide remote delivery",
  ],
  image: "/images/computerrepair.png",
  imageAlt: "Modern business website development by PixelNation",
} as const;

export const WHO_THIS_IS_FOR = [
  "Small businesses launching or upgrading their online presence",
  "Service companies that need credibility and local search visibility",
  "Nonprofits communicating mission, programs, and donation paths",
  "Local brands competing in regional markets",
  "Growing organizations outgrowing DIY website builders",
  "Operators who want a site that reflects how they actually work",
] as const;

export const WEBSITE_TYPES = [
  {
    title: "Local Business Websites",
    description:
      "Location-aware sites for shops, clinics, contractors, and storefronts—built to rank locally and drive calls, visits, and form submissions.",
    items: ["Google Business Profile alignment", "Service area pages", "Click-to-call and directions", "Trust signals and reviews"],
  },
  {
    title: "Service Business Websites",
    description:
      "Websites for repair shops, agencies, consultants, and field service operators with clear service pages, booking flows, and conversion paths.",
    items: ["Service catalog pages", "Quote and contact funnels", "Before/after or case highlights", "FAQ and knowledge links"],
  },
  {
    title: "Nonprofit Websites",
    description:
      "Mission-driven sites that explain impact, showcase programs, and make donating, volunteering, and event registration straightforward.",
    items: ["Donation and campaign pages", "Program and impact sections", "Event and volunteer CTAs", "Accessible, readable layouts"],
  },
  {
    title: "Landing Pages",
    description:
      "Focused single-purpose pages for campaigns, product launches, lead magnets, and paid traffic—optimized for one clear conversion goal.",
    items: ["Campaign-specific messaging", "A/B-ready structure", "Fast load for ad traffic", "Form and tracking integration"],
  },
  {
    title: "Portfolio Websites",
    description:
      "Showcase sites for creatives, agencies, and specialists who need polished galleries, case studies, and contact paths that win new clients.",
    items: ["Project galleries", "Case study layouts", "Client testimonial blocks", "Contact and inquiry flows"],
  },
] as const;

export const WHY_CUSTOM_BEATS_TEMPLATES = [
  {
    title: "Built for your business model",
    text: "Templates force your services into pre-made boxes. Custom sites reflect your actual offerings, pricing structure, and customer journey.",
  },
  {
    title: "Performance and SEO control",
    text: "Clean code, semantic structure, and fast load times give you a real advantage in search—not bloated theme overhead.",
  },
  {
    title: "Room to grow",
    text: "Add portals, booking, dashboards, or automation later without rebuilding from scratch on a limited platform.",
  },
  {
    title: "Brand authority",
    text: "A distinctive site signals professionalism. Generic templates make even great businesses look interchangeable.",
  },
] as const;

export const DEVELOPMENT_PROCESS = [
  {
    step: "01",
    title: "Discovery & strategy",
    text: "We learn your goals, audience, competitors, and conversion paths—then define site structure and priorities.",
  },
  {
    step: "02",
    title: "Design & content planning",
    text: "Wireframes and visual direction aligned to your brand, with SEO-friendly page hierarchy from the start.",
  },
  {
    step: "03",
    title: "Development & optimization",
    text: "Modern, responsive builds with performance, accessibility, and search best practices implemented throughout.",
  },
  {
    step: "04",
    title: "Launch & support",
    text: "Deployment, analytics setup, and optional ongoing updates so your site stays secure and effective.",
  },
] as const;

export const SEO_GEO_AEO = [
  {
    title: "SEO foundations",
    text: "Semantic HTML, metadata, internal linking, sitemap-ready structure, and page speed tuned for crawlability and rankings.",
  },
  {
    title: "GEO optimization",
    text: `Local business schema, location-aware copy, and service area content that helps ${SITE.address.region} and regional brands show up where customers search.`,
  },
  {
    title: "AEO readiness",
    text: "FAQ sections, clear answer blocks, and structured data that help AI search engines surface your business for relevant queries.",
  },
] as const;

export const WEBSITE_DEV_FAQ = [
  {
    question: "How much does a custom business website cost?",
    answer:
      "Pricing depends on page count, custom features, integrations, and content needs. A focused business website typically starts in the low thousands; larger builds with portals, e-commerce, or custom functionality require a scoped quote after discovery.",
  },
  {
    question: "How long does website development take?",
    answer:
      "Most business websites take several weeks from kickoff to launch, depending on content readiness, revision rounds, and feature scope. We provide a clear timeline after the discovery phase.",
  },
  {
    question: "Do you build websites for nonprofits?",
    answer:
      "Yes. PixelNation builds nonprofit websites with mission storytelling, program pages, donation paths, event promotion, and accessible layouts designed for donors and volunteers.",
  },
  {
    question: "Will my website work on mobile devices?",
    answer:
      "Every PixelNation website is mobile-first—designed and tested for phones, tablets, and desktops so visitors get a fast, readable experience on any screen.",
  },
  {
    question: "Do you include SEO with website development?",
    answer:
      "Yes. SEO structure—titles, descriptions, headings, internal links, schema, and performance—is built into the development process, not added as an afterthought.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. We migrate and rebuild outdated sites with modern design, improved performance, and better conversion paths while preserving search equity where possible.",
  },
] as const;

export const CONVERSATIONAL_QUERIES = [
  "Who builds business websites in Kansas?",
  "How much does a small business website cost?",
  "Best website developer for service companies",
  "Nonprofit website design near me",
] as const;

export const GEO_COPY = `PixelNation builds business websites for organizations in ${SITE.address.region} and nationwide. Whether you need a local service company site, a nonprofit platform, or a high-converting landing page, we deliver custom development—not cookie-cutter templates.`;
