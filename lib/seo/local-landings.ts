import type { FaqItem } from "@/lib/seo/types";

export type LocalLandingSection = {
  heading: string;
  paragraphs: readonly string[];
};

export type LocalLandingPage = {
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: readonly string[];
  eyebrow: string;
  h1: string;
  intro: string;
  sections: readonly LocalLandingSection[];
  faqs: readonly FaqItem[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  relatedLinks: readonly { label: string; href: string; description?: string }[];
};

export const LOCAL_LANDING_PAGES: Record<string, LocalLandingPage> = {
  "game-console-repair-emporia-ks": {
    slug: "game-console-repair-emporia-ks",
    path: "/game-console-repair-emporia-ks",
    metaTitle: "Game Console Repair in Emporia KS | PixelNation",
    metaDescription:
      "Game console repair in Emporia, Kansas—PS5 HDMI issues, Xbox faults, Switch problems, and honest diagnostics from PixelNation.",
    keywords: [
      "game console repair Emporia KS",
      "PS5 repair Emporia",
      "Xbox repair Emporia",
    ],
    eyebrow: "Emporia, Kansas · Console repair",
    h1: "Game Console Repair in Emporia, KS",
    intro:
      "When a PlayStation, Xbox, Nintendo Switch, or other console fails in Emporia, you need clear diagnostics—not a vague promise. PixelNation repairs game consoles locally.",
    sections: [
      {
        heading: "Local repair for players who want their systems back",
        paragraphs: [
          "Common Emporia console jobs include HDMI and no-display faults, overheating, power issues, and port damage. We explain findings before work proceeds so you can decide repair versus replacement with real information.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you repair PS5 and Xbox consoles in Emporia?",
        answer:
          "Yes. PixelNation repairs PlayStation, Xbox, Nintendo Switch, Steam Deck, and related systems. HDMI and power faults are common requests.",
        links: [{ label: "Console Repair service", href: "/console-repair" }],
      },
      {
        question: "Can I get a same-day console repair?",
        answer:
          "Some issues qualify for faster turnaround; deeper board work may take longer. We estimate timing after diagnostics.",
      },

    ],
    primaryCta: { label: "Start a console repair", href: "/contact" },
    secondaryCta: { label: "Full console repair page", href: "/console-repair" },
    relatedLinks: [
      { label: "Console Repair", href: "/console-repair", description: "Full service details" },
      { label: "Board Repair", href: "/board-repair" },
      { label: "PS5 HDMI knowledge", href: "/knowledge/why-ps5-hdmi-ports-fail" },
    ],
  },

};

export const LOCAL_LANDING_SLUGS = Object.keys(LOCAL_LANDING_PAGES);

export function getLocalLanding(slug: string): LocalLandingPage | undefined {
  return LOCAL_LANDING_PAGES[slug];
}

export function isLocalLandingSlug(slug: string): boolean {
  return slug in LOCAL_LANDING_PAGES;
}
