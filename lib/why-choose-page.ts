import { SITE } from "@/lib/site";
import { WHY_CHOOSE as HOME_WHY_CHOOSE } from "@/lib/homepage";

export const WHY_CHOOSE_METADATA = {
  title: "Why Choose PixelNation | Repair & Gaming in Emporia KS",
  description:
    "Why choose PixelNation in Emporia, Kansas—experienced repair specialists, board-level diagnostics, transparent pricing, trading cards, gaming community, and honest local service.",
  path: "/why-choose-pixelnation",
} as const;

export const WHY_CHOOSE_HERO = {
  title: "Why choose PixelNation",
  subtitle: `Experience, equipment, honesty, and community—reasons locals trust PixelNation for repair, trading cards, and more in ${SITE.address.region}.`,
} as const;

export const WHY_CHOOSE_FEATURES = HOME_WHY_CHOOSE;

export const WHY_CHOOSE_DEPTH = [
  {
    id: "experience",
    title: "Experience",
    body: `PixelNation has served customers with hands-on repair expertise since 2007. That experience shows up in the questions we ask, the faults we recognize, and the patience we bring to difficult cases across phones, computers, consoles, appliances, and boards.`,
  },
  {
    id: "equipment",
    title: "Equipment",
    body: `Meaningful repair requires the right tools—from everyday diagnostics to board-level work. We invest in equipment that supports careful evaluation and precise rework, because guessing with the wrong setup wastes time and risk.`,
  },
  {
    id: "diagnostics",
    title: "Diagnostics",
    body: `We start by reproducing the symptom and testing the paths that matter—power, data, display, charging, and control. Clear diagnostics lead to clear recommendations, so you understand the problem before you approve a repair.`,
  },
  {
    id: "board-repair",
    title: "Board repair",
    body: `When a part swap is not enough, board-level repair and microsoldering can restore charging circuits, HDMI ports, traces, and power faults other shops may decline. We explain when board work is appropriate—and when it is not.`,
  },
  {
    id: "customer-service",
    title: "Customer service",
    body: `Friendly support means listening first. Whether you walk in with a cracked screen, a collection to review, or a question about events, you should leave with clarity—not pressure.`,
  },
  {
    id: "community",
    title: "Community",
    body: `PixelNation is building a local destination for trading cards, gaming, and gatherings. Community is not a slogan here—it is the reason we are expanding tables, inventory, and welcoming spaces alongside the repair bench.`,
  },
  {
    id: "education",
    title: "Education",
    body: `Through hands-on training and everyday explanations at the counter, we share practical knowledge. Technology feels less intimidating when someone is willing to teach.`,
  },
  {
    id: "warranty",
    title: "Warranty",
    body: `Quality work deserves accountability. Ask us about warranty coverage for your specific repair—terms can vary by service and parts—and we will explain what is included before work proceeds.`,
  },
  {
    id: "quality",
    title: "Quality",
    body: `We prioritize parts and workmanship that support lasting results. Fast is good; lasting is better. When speed and quality both fit, we aim for both.`,
  },
  {
    id: "transparency",
    title: "Transparency",
    body: `Transparent pricing and no-pressure recommendations are non-negotiable. You should know the options, the risks, and the cost before we begin. Store-credit or trade conversations on the gaming side follow the same honesty.`,
  },
] as const;
