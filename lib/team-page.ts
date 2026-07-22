import { SITE } from "@/lib/site";

export const TEAM_METADATA = {
  title: "Meet the Team | PixelNation Emporia KS",
  description:
    "Meet the PixelNation team in Emporia, Kansas. Learn about our founder role, culture, beliefs, and how we grow with repair, gaming, and community service.",
  path: "/team",
} as const;

export const TEAM_HERO = {
  title: "Meet the team",
  subtitle: `The people behind PixelNation’s repair craft, gaming community, and honest local service in ${SITE.address.region}.`,
} as const;

/**
 * Expandable team roster. Do not invent employee names.
 * Add real people here when ready—photo optional.
 */
export const FOUNDER = {
  role: "Founder",
  headline: "Building PixelNation with repair craft and community heart",
  bio: [
    `PixelNation’s founder leads with the same principles that started the business: diagnose carefully, repair honestly, and treat every customer like a neighbor. The work spans professional electronics repair, microsoldering, data recovery, console repair, and the growing trading-card and gaming side of the brand.`,
    `Names and portraits will be published here when the team chooses to share them publicly. Until then, this space represents the founder role—not a placeholder identity.`,
  ],
} as const;

export const FUTURE_TEAM = {
  title: "Future team",
  body: `As PixelNation expands inventory, play space, events, and day-to-day service, the team will grow carefully. New roles may include repair specialists, retail and gaming support, event hosts, and education partners. We will introduce real people here—never invented names—when they join.`,
  openingsNote:
    "Interested in future opportunities? Contact PixelNation and tell us how you would like to help.",
} as const;

export const CULTURE = {
  title: "Our culture",
  paragraphs: [
    `We value patience at the bench and welcome at the counter. Customers should feel safe asking questions, whether they need a phone fixed or are learning their first trading card game.`,
    `We celebrate craft—clean work, clear explanations, and follow-through. We also celebrate play: the fun of opening a booster, the rhythm of a game night, and the friendships that start around a table.`,
  ],
  traits: [
    "Helpful without pressure",
    "Curious and continuous learners",
    "Respectful of people’s time and money",
    "Welcoming to beginners and experts",
    "Proud of local roots in Emporia",
  ],
} as const;

export const BELIEFS = {
  title: "What we believe",
  items: [
    {
      title: "Repair over waste",
      text: "Many devices deserve a second chance when diagnosis is done well.",
    },
    {
      title: "Honesty builds trust",
      text: "Customers deserve options explained in plain language before work begins.",
    },
    {
      title: "Gaming brings people together",
      text: "Cards, consoles, and shared play strengthen community.",
    },
    {
      title: "Education multiplies impact",
      text: "Teaching repair skills helps shops, technicians, and the wider community.",
    },
    {
      title: "Local matters",
      text: "A great Emporia destination is worth building carefully and openly.",
    },
  ],
} as const;
