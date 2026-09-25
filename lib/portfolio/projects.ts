import type { PortfolioProject } from "@/lib/portfolio/types";

export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    slug: "repairforge",
    name: "RepairForge",
    tagline: "Repair shop management SaaS for tickets, inventory, POS, and shop operations.",
    description:
      "RepairForge is a subscription platform built for electronics and device repair shops that need ticket tracking, customer management, parts inventory, point of sale, and reporting in one system.",
    category: "saas-platforms",
    categoryLabel: "SaaS Platform",
    industry: "Repair & Electronics",
    filters: ["saas", "automation"],
    features: [
      "Repair ticket management",
      "Customer management",
      "Point of sale",
      "Inventory management",
      "Reporting and analytics",
      "Shop dashboard overview",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    screenshot: "/images/portfolio/repairforge.png",
    screenshotAlt:
      "RepairForge marketing homepage with Built by a Repair Shop Owner headline and Platform Snapshot feature list",
    logo: "/images/portfolio/repairforge-logo.png",
    logoAlt: "RepairForge logo",
    status: "in-development",
    featured: true,
    relatedSlugs: ["reviewforge", "tcgkingdoms"],
    caseStudy: {
      challenge:
        "Repair shops often run on a mix of paper tickets, spreadsheets, and generic POS tools that were never designed for device diagnostics, parts sourcing, or technician handoffs. Shop owners lose visibility into open jobs, repeat customers fall through the cracks, and inventory counts drift out of sync with reality.",
      solution:
        "RepairForge centralizes the repair lifecycle—from intake and diagnosis through parts ordering, customer updates, checkout, and pickup—in a purpose-built SaaS platform designed around how repair benches actually operate.",
      featuresBuilt: [
        "Dashboard overview for open work, revenue signals, appointments, and shop activity",
        "Repair tickets from intake through pickup",
        "Customer profiles with devices, notes, history, and follow-ups",
        "Point of sale for repair checkout, retail sales, deposits, and receipts",
        "Inventory tracking for parts, serialized items, stock alerts, and vendors",
        "Reporting on sales, ticket volume, margins, and staff activity",
      ],
      screenshots: [],
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
        "Customer communication and POS workflows belong in the same operational system as the repair bench.",
      ],
    },
  },
  {
    slug: "reviewforge",
    name: "ReviewForge",
    tagline: "Reputation and customer engagement platform for multi-location review growth.",
    description:
      "ReviewForge helps local businesses collect more reviews, respond faster, and protect their reputation across locations—with executive intelligence, review requests, campaigns, QR codes, and automation.",
    category: "saas-platforms",
    categoryLabel: "SaaS Platform",
    industry: "Reputation & Customer Engagement",
    filters: ["saas", "automation"],
    features: [
      "Executive Intelligence dashboard",
      "Reputation scoring",
      "Business and location management",
      "Review requests",
      "Review responses",
      "QR codes and campaigns",
      "Review automation",
      "Multi-location analytics",
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    screenshot: "/images/portfolio/reviewforgedashboard.png",
    screenshotAlt:
      "ReviewForge Executive Intelligence Center showing reputation score, score trend, and network health metrics",
    logo: "/images/portfolio/reviewforge-logo.png",
    logoAlt: "ReviewForge logo",
    status: "in-development",
    featured: true,
    relatedSlugs: ["repairforge", "tcgkingdoms"],
    caseStudy: {
      challenge:
        "Local and multi-location businesses struggle to collect reviews consistently, respond quickly across platforms, and see reputation health clearly enough to act—especially when locations, campaigns, and response workflows live in separate tools.",
      solution:
        "ReviewForge brings review requests, responses, QR codes, campaigns, and automation into one reputation platform, with an Executive Intelligence Center that surfaces reputation scoring and network health across businesses and locations.",
      featuresBuilt: [
        "Executive Intelligence Center with reputation score, trends, and network health",
        "Business and location management for multi-location operators",
        "Review request and review response workflows",
        "QR codes and campaigns for review collection",
        "Review automation with AI-assisted response drafts",
        "Multi-location analytics and reporting",
      ],
      screenshots: [
        {
          src: "/images/portfolio/reviewforge.png",
          alt: "ReviewForge public marketing homepage with Turn every customer into a 5-star review headline",
          caption: "ReviewForge public SaaS website and customer acquisition experience.",
        },
      ],
      results: [
        {
          label: "Executive visibility",
          text: "Reputation score, trends, and network health give operators a clear pulse across locations.",
        },
        {
          label: "Review growth systems",
          text: "Requests, QR codes, and campaigns support consistent review collection instead of ad-hoc asks.",
        },
        {
          label: "Response readiness",
          text: "Review responses and automation help teams reply faster while protecting brand reputation.",
        },
      ],
      lessonsLearned: [
        "Multi-location reputation work needs network-level scoring, not just per-location review lists.",
        "Review collection and response tooling must live together or teams abandon one side of the loop.",
        "Executive dashboards should answer whether reputation is improving before diving into individual reviews.",
      ],
    },
  },
  {
    slug: "tcgkingdoms",
    name: "TCGKingdoms",
    tagline: "Marketplace platform for trading card game buyers and sellers.",
    description:
      "TCGKingdoms is a marketplace platform connecting trading card game buyers and sellers with listings, seller discovery, and category-driven search across Pokémon, Magic, Yu-Gi-Oh!, Lorcana, One Piece, and more.",
    category: "custom-applications",
    categoryLabel: "Marketplace Platform",
    industry: "Gaming & E-commerce",
    filters: ["saas"],
    features: [
      "Marketplace search",
      "Seller listings",
      "Category-driven discovery",
      "Buyer and seller paths",
      "Cart and join flows",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    screenshot: "/images/portfolio/tcgkingdoms.png",
    screenshotAlt:
      "TCGKingdoms marketplace homepage with Buy and sell TCG cards faster headline and marketplace search",
    logo: "/images/tcgkingdomslogo.png",
    logoAlt: "TCGKingdoms logo",
    status: "in-development",
    featured: true,
    relatedSlugs: ["repairforge", "midwest-pixelfest"],
    caseStudy: {
      challenge:
        "Trading card game communities often buy and sell through fragmented social channels and generic marketplaces that lack category-specific discovery, seller trust signals, and community-focused browsing experiences.",
      solution:
        "TCGKingdoms focuses marketplace discovery around TCG categories with search for cards, sets, and sellers, plus clear paths to shop the marketplace or start selling.",
      featuresBuilt: [
        "Marketplace homepage with buyer and seller CTAs",
        "Search across cards, sets, and sellers",
        "Category coverage across major TCG product lines",
        "Sell, scanner, and dashboard navigation for marketplace operations",
        "Join and cart flows for marketplace participation",
      ],
      screenshots: [],
      results: [
        {
          label: "Category focus",
          text: "Discovery flows designed around how TCG collectors actually search for products.",
        },
        {
          label: "Two-sided marketplace",
          text: "Clear Shop Marketplace and Start Selling paths support both sides of the market.",
        },
        {
          label: "Platform foundation",
          text: "Demonstrates PixelNation's ability to build multi-sided marketplace platforms.",
        },
      ],
      lessonsLearned: [
        "Marketplace products need trust and discovery solved together—not listings alone.",
        "Category taxonomy is a product decision as much as a technical one in niche commerce.",
        "MVP marketplace builds should prioritize search and seller onboarding before payments complexity.",
      ],
    },
  },
  {
    slug: "midwest-pixelfest",
    name: "Midwest PixelFest",
    tagline:
      "Convention website for gaming, cosplay, guests, vendors, sponsors, schedule, travel, and tickets.",
    description:
      "A convention and event website designed around the gaming, cosplay, collectibles, and pop-culture experience—with clear navigation for attendees, guests, vendors, sponsors, schedule, travel, tickets, and convention information.",
    category: "websites",
    categoryLabel: "Event Website",
    industry: "Gaming & Entertainment",
    filters: ["websites"],
    features: [
      "Gaming and cosplay convention navigation",
      "Guest, vendor, and sponsor information paths",
      "Schedule and travel guidance",
      "Ticket and convention information sections",
      "Multi-audience content structure",
      "Mobile-friendly event browsing",
    ],
    technologies: [],
    screenshot: "/images/midwestpixelfest.png",
    screenshotAlt:
      "Midwest PixelFest convention website homepage showing gaming, cosplay, guests, vendors, sponsors, schedule, travel, and tickets navigation",
    status: "in-development",
    featured: true,
    relatedSlugs: ["monique-a-wish", "flint-hills-outdoor-co"],
    caseStudy: {
      challenge:
        "A convention site has to serve attendees, gamers, cosplayers, guests, vendors, sponsors, and travelers at once. Without clear information architecture, visitors struggle to find schedules, tickets, travel details, guest lineups, and vendor or sponsor paths that match their role.",
      solution:
        "Midwest PixelFest is structured as a multi-audience convention website with navigation and content sections that route each visitor type toward the information they need—gaming and cosplay experience, guests, vendors, sponsors, schedule, travel, tickets, and general convention details.",
      featuresBuilt: [
        "Homepage and primary navigation for convention audiences",
        "Paths for gaming, cosplay, and pop-culture content",
        "Guest, vendor, and sponsor information sections",
        "Schedule and travel guidance for attendees",
        "Ticket and convention information entry points",
      ],
      screenshots: [],
      results: [],
      lessonsLearned: [
        "Convention websites succeed when audience paths are explicit—attendees, guests, vendors, and sponsors should not compete for the same page real estate.",
        "Schedule, travel, and tickets are high-intent destinations and need first-class navigation.",
        "Event sites should lead with experience and clarity rather than dense institutional copy.",
      ],
    },
  },
  {
    slug: "monique-a-wish",
    name: "Monique A Wish",
    tagline: "Nonprofit website for mission storytelling and community engagement.",
    description:
      "A nonprofit web platform focused on mission communication, community impact storytelling, and clear paths for donations, volunteering, and community support.",
    category: "websites",
    categoryLabel: "Nonprofit Website",
    industry: "Nonprofit",
    filters: ["websites"],
    features: [
      "Mission and impact storytelling",
      "Community impact sections",
      "Donation and support CTAs",
      "Accessible readable layouts",
      "Volunteer and engagement paths",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS"],
    screenshot: "/images/portfolio/moniqueawish.png",
    screenshotAlt:
      "Monique A Wish community impact section titled Love in Action Across Emporia with Strength in Community content",
    status: "live",
    featured: true,
    relatedSlugs: ["midwest-pixelfest", "flint-hills-outdoor-co"],
    caseStudy: {
      challenge:
        "Nonprofits need websites that communicate mission clearly, showcase program impact, and make it easy for supporters to donate or get involved—without overwhelming volunteers with complex content management.",
      solution:
        "A mission-driven website with clear narrative structure, community impact storytelling, accessible design, and prominent support CTAs that guide visitors toward meaningful action.",
      featuresBuilt: [
        "Community impact storytelling with Love in Action Across Emporia messaging",
        "Mission-forward sections highlighting compassion, community, and hope",
        "Donation and volunteer call-to-action paths",
        "Accessible typography and mobile-friendly layouts",
        "SEO structure for local nonprofit discovery",
      ],
      screenshots: [],
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
    slug: "flint-hills-outdoor-co",
    name: "Flint Hills Outdoor Co.",
    tagline:
      "Local outdoor services website with clear estimate, call, and text contact paths for Emporia.",
    description:
      "A local service-business website for Flint Hills Outdoor Co. that presents services and service-area information with simple estimate request, phone, and text CTAs—built so Emporia-area customers can understand the offering and contact the business quickly.",
    category: "websites",
    categoryLabel: "Local Business Website",
    industry: "Home & Outdoor Services",
    filters: ["websites"],
    features: [
      "Service presentation",
      "Service-area information",
      "Estimate request CTA",
      "Phone and text contact CTAs",
      "Local Emporia positioning",
      "Responsive local-service layout",
    ],
    technologies: [],
    screenshot: "/images/flinthillsoutdoorco.png",
    screenshotAlt:
      "Flint Hills Outdoor Co. local business website showing outdoor services, Emporia service area, and estimate, call, and text contact options",
    status: "live",
    featured: true,
    relatedSlugs: ["monique-a-wish", "midwest-pixelfest"],
    caseStudy: {
      challenge:
        "Local service businesses lose leads when visitors cannot quickly tell what the company does, where it operates, or how to request an estimate, call, or text. Friction between discovery and contact costs real jobs.",
      solution:
        "Flint Hills Outdoor Co. is a straightforward local-service website that presents services and service-area context up front, with prominent estimate, phone, and text paths so Emporia-area customers can contact the business without digging through the site.",
      featuresBuilt: [
        "Service presentation for outdoor and home-related offerings",
        "Service-area and local Emporia positioning",
        "Estimate request call to action",
        "Phone and text contact paths",
        "Mobile-friendly layout for on-the-go local customers",
      ],
      screenshots: [],
      results: [],
      lessonsLearned: [
        "Local service sites should answer what, where, and how to contact within the first viewport.",
        "Estimate, call, and text options reduce friction for different customer preferences.",
        "Clear service-area messaging builds trust for neighborhood and regional operators.",
      ],
    },
  },
] as const;

export const PORTFOLIO_SLUGS = PORTFOLIO_PROJECTS.map((project) => project.slug);
