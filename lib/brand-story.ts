import { SITE } from "@/lib/site";

/** Shared brand-story copy used across homepage, About, and related pages. */

export const MEET_PIXELNATION = {
  title: "Meet PixelNation",
  subtitle:
    "A local place for repair, gaming, and people who care about technology that lasts.",
  paragraphs: [
    `PixelNation grew out of a simple belief: technology deserves to be repaired—not thrown away the moment something goes wrong. When a phone stops charging, a console loses video, or a hard drive fails, the right answer is often careful diagnosis and honest work, not a rushed replacement.`,
    `Gaming has always been about bringing people together. Trading cards, video games, and shared tables create friendships, friendly competition, and a reason to show up in person. That spirit belongs alongside the repair bench—not as a side note, but as part of who we are becoming in ${SITE.address.region}.`,
    `Today PixelNation is a technology, gaming, and community brand. We still do the hard work—electronics repair, microsoldering, data recovery, and game console repair—and we are expanding into trading cards, local play, events, buy/sell/trade, and technology education. Through all of it, the goal stays the same: help people, tell the truth about options, and make technology feel personal again.`,
  ],
} as const;

export const OUR_MISSION = {
  title: "Our mission",
  subtitle: "Repair. Education. Community. Technology. Gaming. Learning. Innovation.",
  body: `PixelNation exists to keep devices working, people learning, and communities connected. We repair what can be repaired. We teach practical skills that survive trends. We make space for gaming, trading cards, and gatherings that feel welcoming. We treat technology as something to understand—not just consume—and we innovate where it helps real customers, not where it looks impressive on paper.`,
  pillars: [
    {
      title: "Repair",
      text: "Diagnose carefully, explain clearly, and fix what is worth fixing.",
    },
    {
      title: "Education",
      text: "Share real bench skills so more people can solve hard problems.",
    },
    {
      title: "Community",
      text: "Build a place locals want to visit—for service, play, and belonging.",
    },
    {
      title: "Technology",
      text: "Respect the tools people rely on for work, school, and daily life.",
    },
    {
      title: "Gaming",
      text: "Celebrate cards, consoles, and the joy of playing together.",
    },
    {
      title: "Learning & innovation",
      text: "Keep growing—better diagnostics, better service, better experiences.",
    },
  ],
} as const;

export const PHOTO_SLOTS = [
  {
    id: "repair-bench",
    label: "Repair Bench",
    description: "Future photo of diagnostics and hands-on repair work.",
  },
  {
    id: "microsoldering",
    label: "Microsoldering",
    description: "Future photo of board-level and precision repair.",
  },
  {
    id: "store-interior",
    label: "Store Interior",
    description: "Future photo of the PixelNation space customers walk into.",
  },
  {
    id: "game-nights",
    label: "Game Nights",
    description: "Future photo of community play and local events.",
  },
  {
    id: "trading-cards",
    label: "Trading Cards",
    description: "Future photo of sealed products, singles, and browsing.",
  },
  {
    id: "customers",
    label: "Customers & Community",
    description: "Future photo celebrating the people who make PixelNation feel like home.",
  },
] as const;

export const HOME_CLOSING_CTA = {
  title: "PixelNation is ready to help",
  body: `Whether you need your phone repaired, your console fixed, your computer upgraded, or you're looking for your next favorite trading card game—PixelNation is ready to help. Bring a device, ask a question, or just stop by to see what we're building in Emporia.`,
} as const;
