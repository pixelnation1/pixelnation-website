import type { KnowledgeCategory, KnowledgeCategorySlug } from "@/lib/knowledge/types";

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  {
    slug: "phone-repair",
    name: "Phone Repair",
    description:
      "Expert guides on smartphone screens, batteries, charging ports, cameras, and board-level phone faults.",
    shortDescription: "Screens, batteries, ports & board faults",
    icon: "📱",
    serviceHref: "/phone-repair",
    relatedTopics: ["charging port failure", "board damage", "liquid damage", "data recovery"],
  },
  {
    slug: "console-repair",
    name: "Console Repair",
    description:
      "PS5, Xbox, and Nintendo Switch repair knowledge—HDMI ports, overheating, power rails, and diagnostics.",
    shortDescription: "PS5, Xbox & Switch repair guides",
    icon: "🎮",
    serviceHref: "/console-repair",
    relatedTopics: ["HDMI port failure", "overheating", "encoder vs port", "diagnostics"],
  },
  {
    slug: "computer-repair",
    name: "Computer Repair",
    description:
      "Laptop and desktop troubleshooting—no display, power issues, storage failures, and performance problems.",
    shortDescription: "Laptops, desktops & Mac repair",
    icon: "💻",
    serviceHref: "/computer-repair",
    relatedTopics: ["no display", "boot failure", "storage", "liquid damage"],
  },
  {
    slug: "data-recovery",
    name: "Data Recovery",
    description:
      "How data is recovered from dead phones, failed drives, and devices that will not power on.",
    shortDescription: "Phones, SSDs & dead devices",
    icon: "💾",
    serviceHref: "/data-recovery",
    relatedTopics: ["dead phone recovery", "board repair", "storage access"],
  },
  {
    slug: "microsoldering",
    name: "Microsoldering",
    description:
      "Board-level repair techniques—IC replacement, trace repair, and component-level diagnostics.",
    shortDescription: "IC work, traces & component repair",
    icon: "🔬",
    serviceHref: "/board-repair",
    relatedTopics: ["board damage", "charging IC", "HDMI repair", "training"],
  },
  {
    slug: "board-repair",
    name: "Board Repair",
    description:
      "Motherboard and logic board repair—power rails, short detection, and component failures.",
    shortDescription: "Logic boards & power rails",
    icon: "🧩",
    serviceHref: "/board-repair",
    relatedTopics: ["microsoldering", "phone board damage", "console HDMI"],
  },
  {
    slug: "hdmi-repair",
    name: "HDMI Repair",
    description:
      "HDMI port replacement vs encoder chip failure on consoles and laptops—symptoms and repair paths.",
    shortDescription: "Ports, encoders & display output",
    icon: "📺",
    serviceHref: "/console-repair",
    relatedTopics: ["PS5 HDMI", "encoder failure", "no video output"],
  },
  {
    slug: "liquid-damage",
    name: "Liquid Damage",
    description:
      "How liquid corrodes electronics, what to do immediately, and realistic recovery expectations.",
    shortDescription: "Corrosion, spills & recovery",
    icon: "💧",
    relatedTopics: ["board damage", "charging failure", "diagnostics"],
  },
  {
    slug: "training-education",
    name: "Training & Education",
    description:
      "Repair education, diagnostic workflows, and hands-on training for aspiring technicians.",
    shortDescription: "Courses, diagnostics & skill building",
    icon: "🎓",
    serviceHref: "/training",
    relatedTopics: ["microsoldering", "diagnostic repair", "board repair"],
  },
];

export function getCategoryBySlug(
  slug: KnowledgeCategorySlug,
): KnowledgeCategory | undefined {
  return KNOWLEDGE_CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryPath(slug: KnowledgeCategorySlug): string {
  return `/knowledge/category/${slug}`;
}
