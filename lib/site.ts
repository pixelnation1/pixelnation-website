export const SITE = {
  name: "PixelNation",
  tagline: "Advanced Tech Repair Specialists",
  domain: "https://www.pixelnation.co",
  phone: "620-591-0083",
  phoneHref: "tel:+16205910083",
  email: "support@pixelnation.co",
  emailHref: "mailto:support@pixelnation.co",
  address: {
    city: "Emporia",
    state: "KS",
    region: "Emporia, Kansas",
  },
  hours: "Monday – Friday, 9:00 AM – 3:00 PM",
  openingHours: {
    opens: "09:00",
    closes: "15:00",
  },
} as const;

export const MAIN_MESSAGE =
  "PixelNation is a professional repair company in Emporia, KS specializing in phones, computers, consoles, appliances, data recovery, diagnostics, and board-level repair.";

export const PRIMARY_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Knowledge", href: "/knowledge" },
  { label: "Track Repair", href: "/track-repair" },
  { label: "Contact", href: "/contact" },
] as const;

export const TRAINING_DROPDOWN_LINKS = [
  { label: "Training Overview", href: "/training" },
  { label: "Training Courses", href: "/training-courses" },
] as const;

export const REPAIRS_DROPDOWN_LINKS = [
  { label: "Repairs Overview", href: "/repairs" },
  { label: "Kansas Locations", href: "/locations" },
  { label: "Repair Services", href: "/services" },
  { label: "Phone Repair", href: "/phone-repair" },
  { label: "Computer Repair", href: "/computer-repair" },
  { label: "Appliance Repair", href: "/appliance-repair" },
  { label: "Console Repair", href: "/console-repair" },
  { label: "Data Recovery", href: "/data-recovery" },
  { label: "Board Repair", href: "/board-repair" },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Knowledge Hub", href: "/knowledge" },
  { label: "Locations", href: "/locations" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

/** Footer services column */
export const FOOTER_SERVICE_LINKS = [
  ...REPAIRS_DROPDOWN_LINKS,
  ...TRAINING_DROPDOWN_LINKS,
] as const;

const REPAIR_ACTIVE_PATHS = [
  "/repairs",
  "/locations",
  "/services",
  "/phone-repair",
  "/computer-repair",
  "/appliance-repair",
  "/console-repair",
  "/data-recovery",
  "/board-repair",
  "/microsoldering",
  "/computer-repair-emporia-ks",
  "/appliance-repair-emporia-ks",
  "/console-repair-emporia-ks",
  "/data-recovery-emporia-ks",
  "/board-repair-emporia-ks",
  "/microsoldering-emporia-ks",
] as const;

const TRAINING_ACTIVE_PATHS = ["/training", "/training-courses"] as const;

export function isRepairsNavActive(pathname: string): boolean {
  return REPAIR_ACTIVE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function isTrainingNavActive(pathname: string): boolean {
  return TRAINING_ACTIVE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/knowledge") {
    return pathname === "/knowledge" || pathname.startsWith("/knowledge/");
  }
  if (href === "/repairs") return pathname === "/repairs";
  if (href === "/training") return pathname === "/training";
  if (href === "/track-repair") {
    return pathname === "/track-repair" || pathname === "/contact";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export const TRUST_ITEMS = [
  "Local Emporia repair shop",
  "Same-day repairs available on select services",
  "Board-level repair capability",
  "Data recovery services",
  "Warranty available on many repairs",
] as const;

export const POPULAR_SERVICES = [
  {
    title: "Phone Repair",
    description:
      "Screens, batteries, charging ports, cameras, and board-level phone faults.",
    href: "/phone-repair",
    image: "/images/phonerepairlogo.png",
    imageAlt:
      "Phone repair service at PixelNation in Emporia, Kansas — screens, batteries, and charging ports",
  },
  {
    title: "Computer & Laptop Repair",
    description:
      "Hardware, software, storage upgrades, and performance tuning for PCs and Macs.",
    href: "/computer-repair-emporia-ks",
    image: "/images/computerrepair.png",
    imageAlt:
      "Computer and laptop repair in Emporia, KS — hardware, software, and performance service",
  },
  {
    title: "Appliance Diagnostics & Repair",
    description:
      "Structured troubleshooting and repair for household and specialty appliances.",
    href: "/appliance-repair-emporia-ks",
    image: "/images/appliancerepair.png",
    imageAlt:
      "Appliance diagnostics and repair at PixelNation in Emporia, Kansas",
  },
  {
    title: "Console Repair",
    description:
      "HDMI, power, overheating, and internal faults for major gaming consoles.",
    href: "/console-repair-emporia-ks",
    image: "/images/consolerepair.png",
    imageAlt:
      "Game console repair in Emporia, KS — HDMI, power, and overheating issues",
  },
  {
    title: "Data Recovery",
    description:
      "Recovery paths for phones, drives, tablets, consoles, and failed boards.",
    href: "/data-recovery",
    image: "/images/datarecovery2.png",
    imageAlt:
      "Data recovery for phones, computers, and drives at PixelNation in Emporia, Kansas",
  },
  {
    title: "Microsoldering & Board-Level Repair",
    description:
      "Connector, trace, pad, and power-rail work when parts alone are not enough.",
    href: "/board-repair",
    image: "/images/motherboardrepair2.png",
    imageAlt:
      "Board repair and microsoldering in Emporia Kansas for phones, computers, consoles, and motherboards",
  },
] as const;

/** Service cards for /repairs — kept in sync with lib/repairs-page.ts */
export const REPAIR_SERVICE_CARDS = [
  {
    title: "Phone Repair",
    description:
      "Screens, batteries, charging ports, cameras, and board-level phone faults.",
    href: "/phone-repair",
    image: "/images/phonerepairlogo.png",
    imageAlt:
      "Phone repair in Emporia Kansas — iPhone and Android screen, battery, and charging port repair",
  },
  {
    title: "Computer & Laptop Repair",
    description:
      "Hardware, software, storage upgrades, and performance tuning for PCs and Macs.",
    href: "/computer-repair",
    image: "/images/computerrepair.png",
    imageAlt:
      "Computer and laptop repair in Emporia Kansas — diagnostics, hardware, and software service",
  },
  {
    title: "Appliance Diagnostics & Repair",
    description:
      "Structured troubleshooting and repair for household and specialty appliances.",
    href: "/appliance-repair",
    image: "/images/appliancerepair.png",
    imageAlt:
      "Appliance repair in Emporia Kansas — refrigerator, washer, dryer, and oven diagnostics",
  },
  {
    title: "Console Repair",
    description:
      "HDMI, power, overheating, and internal faults for major gaming consoles.",
    href: "/console-repair",
    image: "/images/gameconsolerepair2.png",
    imageAlt:
      "Game console repair in Emporia Kansas — PlayStation, Xbox, Nintendo Switch, and Steam Deck",
  },
  {
    title: "Data Recovery",
    description:
      "Recovery paths for phones, drives, tablets, consoles, and failed boards.",
    href: "/data-recovery",
    image: "/images/datarecovery2.png",
    imageAlt:
      "Data recovery in Emporia Kansas — phones, hard drives, SSDs, and USB storage",
  },
  {
    title: "Microsoldering & Board-Level Repair",
    description:
      "Connector, trace, pad, and power-rail work when parts alone are not enough.",
    href: "/board-repair",
    image: "/images/motherboardrepair2.png",
    imageAlt:
      "Board repair and microsoldering in Emporia Kansas for phones, computers, consoles, and motherboards",
  },
  {
    title: "Training",
    description:
      "Hands-on courses for technicians who want practical microsoldering and diagnostics skills.",
    href: "/training",
    image: "/images/boardrepair.png",
    imageAlt:
      "PixelNation repair training courses in Emporia Kansas — microsoldering and diagnostics",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "How does PixelNation evaluate my device?",
    answer:
      "We inspect the device, reproduce the reported symptoms, and outline repair options with clear pricing before work begins. You stay informed at each step.",
  },
  {
    question: "How long do repairs usually take?",
    answer:
      "Many common repairs finish within a business day when parts are on hand. Board-level, data recovery, and specialty jobs may need additional time—we set expectations up front.",
  },
  {
    question: "Do you offer a warranty on repairs?",
    answer:
      "Many repairs include warranty coverage on parts and workmanship. Coverage depends on the device condition and type of work performed—we explain terms before you approve the repair.",
  },
  {
    question: "Can you recover data from a phone or computer that will not boot?",
    answer:
      "Often, yes. We assess storage health, connection paths, and board condition, then recommend the safest recovery approach for phones, SSDs, hard drives, and other media.",
  },
  {
    question: "Do you repair appliances as well as electronics?",
    answer:
      "Yes. Appliance diagnostics and repair are a core part of our shop. We troubleshoot power, control, and mechanical issues on eligible units.",
  },
  {
    question: "What is board-level repair?",
    answer:
      "Board-level repair addresses faults on the main logic board—charging circuits, HDMI ports, traces, pads, and shorted components—using microsoldering and precision diagnostics.",
  },
] as const;

export type ServiceSlug =
  | "phone-repair-emporia-ks"
  | "computer-repair-emporia-ks"
  | "appliance-repair-emporia-ks"
  | "console-repair-emporia-ks"
  | "data-recovery-emporia-ks"
  | "microsoldering-emporia-ks"
  | "board-repair-emporia-ks";

export type ServicePageData = {
  slug: ServiceSlug;
  shortPath: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  capabilities: string[];
  image: string;
  imageAlt: string;
};

export const SERVICE_PAGES: Record<ServiceSlug, ServicePageData> = {
  "phone-repair-emporia-ks": {
    slug: "phone-repair-emporia-ks",
    shortPath: "/phone-repair",
    title: "Phone Repair",
    metaTitle: "Phone Repair Emporia KS | PixelNation",
    metaDescription:
      "Professional phone repair in Emporia, Kansas—screens, batteries, charging ports, water damage, and board-level fixes from experienced technicians.",
    headline: "Phone Repair in Emporia, Kansas",
    intro:
      "From cracked glass to charging failures and internal board faults, PixelNation delivers phone repair backed by hands-on bench experience—not guesswork.",
    capabilities: [
      "Screen and display replacement",
      "Battery and charging port service",
      "Camera, speaker, and microphone repair",
      "Liquid exposure assessment and recovery",
      "Board-level charging and power faults",
      "Data preservation when storage is at risk",
    ],
    image: "/images/phonerepairlogo.png",
    imageAlt: "Phone repair workstation at PixelNation",
  },
  "computer-repair-emporia-ks": {
    slug: "computer-repair-emporia-ks",
    shortPath: "/computer-repair",
    title: "Computer Repair",
    metaTitle: "Computer Repair Emporia KS | PixelNation",
    metaDescription:
      "Laptop and desktop repair in Emporia, KS—virus removal, SSD upgrades, backups, performance tuning, and hardware diagnostics.",
    headline: "Computer & Laptop Repair in Emporia",
    intro:
      "Slow boots, failing drives, and unreliable hardware interrupt work and school. We restore desktops and laptops with accurate testing and practical fixes.",
    capabilities: [
      "Laptop and desktop hardware repair",
      "Virus and malware removal",
      "SSD and hard drive replacement",
      "Data backup and recovery coordination",
      "Performance optimization and cleanup",
      "Thermal, power, and component diagnostics",
    ],
    image: "/images/computerrepair.png",
    imageAlt: "Computer and laptop repair at PixelNation in Emporia, Kansas",
  },
  "appliance-repair-emporia-ks": {
    slug: "appliance-repair-emporia-ks",
    shortPath: "/appliance-repair",
    title: "Appliance Repair",
    metaTitle: "Appliance Repair Emporia KS | PixelNation",
    metaDescription:
      "Appliance diagnostics and repair in Emporia, Kansas—structured troubleshooting for power, control, and mechanical faults.",
    headline: "Appliance Diagnostics & Repair",
    intro:
      "Appliance issues are a core focus at PixelNation. We methodically test circuits, controls, and mechanical systems to isolate the real failure.",
    capabilities: [
      "Structured appliance diagnostics",
      "Power and control board troubleshooting",
      "Component-level repair where practical",
      "Safety and performance verification after repair",
      "Clear explanation of findings and options",
      "Coordination with specialty parts when required",
    ],
    image: "/images/appliancerepair.png",
    imageAlt: "Appliance repair in Emporia, Kansas — refrigerators, washers, dryers, and ovens",
  },
  "console-repair-emporia-ks": {
    slug: "console-repair-emporia-ks",
    shortPath: "/console-repair",
    title: "Console Repair",
    metaTitle: "Console Repair Emporia KS | PixelNation",
    metaDescription:
      "Game console repair in Emporia, KS—HDMI, no display, overheating, power faults, port replacement, and internal diagnostics.",
    headline: "Game Console Repair",
    intro:
      "When your console will not display, overheats, or loses power, PixelNation traces the fault through ports, rails, and internal assemblies.",
    capabilities: [
      "HDMI port repair and replacement",
      "No video and no display troubleshooting",
      "Overheating and fan service",
      "Power supply and rail diagnostics",
      "USB and port replacement",
      "Internal board and connector repair",
    ],
    image: "/images/gameconsolerepair2.png",
    imageAlt:
      "Game console repair in Emporia Kansas — PS5, Xbox, Nintendo Switch, and Steam Deck",
  },
  "data-recovery-emporia-ks": {
    slug: "data-recovery-emporia-ks",
    shortPath: "/data-recovery",
    title: "Data Recovery",
    metaTitle: "Data Recovery Emporia KS | PixelNation",
    metaDescription:
      "Data recovery in Emporia, Kansas for phones, computers, SSDs, hard drives, USB drives, tablets, consoles, and board-level cases.",
    headline: "Data Recovery Services",
    intro:
      "Lost photos, documents, or entire drives need careful handling. We evaluate media health and repair paths before attempting recovery.",
    capabilities: [
      "Phones and tablets with storage faults",
      "Laptops and desktop drives (SSD and HDD)",
      "USB flash drives and external enclosures",
      "Gaming consoles with storage issues",
      "Board-level recovery when the device will not power on",
      "Clear status updates throughout the process",
    ],
    image: "/images/datarecovery2.png",
    imageAlt:
      "Data recovery in Emporia Kansas for phones, hard drives, SSDs, and USB drives",
  },
  "microsoldering-emporia-ks": {
    slug: "microsoldering-emporia-ks",
    shortPath: "/microsoldering",
    title: "Microsoldering",
    metaTitle: "Microsoldering Emporia KS | PixelNation",
    metaDescription:
      "Microsoldering and precision board work in Emporia, KS—connectors, traces, pads, charging circuits, and complex electronics repair.",
    headline: "Microsoldering in Emporia",
    intro:
      "Microsoldering bridges the gap between part swaps and true electronics repair. Our bench handles fine-pitch work on phones, consoles, and computers.",
    capabilities: [
      "Connector and port microsoldering",
      "Trace and pad restoration",
      "Charging IC and power rail repair",
      "Short detection and isolation",
      "Reflow and rework on dense assemblies",
      "Post-repair verification and stress testing",
    ],
    image: "/images/boardrepair.png",
    imageAlt: "Microsoldering and board repair bench",
  },
  "board-repair-emporia-ks": {
    slug: "board-repair-emporia-ks",
    shortPath: "/board-repair",
    title: "Board Repair",
    metaTitle: "Board Repair Emporia KS | PixelNation",
    metaDescription:
      "Board-level repair in Emporia, Kansas—HDMI, charging ports, shorts, connectors, trace repair, water damage, and power faults.",
    headline: "Board-Level Repair",
    intro:
      "When replacement parts alone cannot fix the device, board-level repair targets the actual fault on the logic board with microscopy and microsoldering.",
    capabilities: [
      "Charging port and HDMI port replacement",
      "Short circuit location and repair",
      "Connector and flex damage",
      "Trace and pad reconstruction",
      "Water and corrosion treatment",
      "Power management and rail faults",
    ],
    image: "/images/motherboardrepair2.png",
    imageAlt:
      "Board repair and microsoldering in Emporia Kansas for phones, computers, consoles, and motherboards",
  },
};
