import { SITE } from "@/lib/site";
import { MEET_PIXELNATION, OUR_MISSION } from "@/lib/brand-story";

export const ABOUT_METADATA = {
  title:
    "About PixelNation | Repair, Trading Cards & Community in Emporia, KS",
  description:
    "Learn about PixelNation in Emporia, KS—professional electronics repair, trading cards, gaming community, technology education, and honest local service since 2007.",
  path: "/about",
  canonical: "https://www.pixelnation.co/about",
} as const;

export const HERO_BULLETS = [
  "Professional electronics repair",
  "Microsoldering & board-level work",
  "Data recovery and console repair",
  "Trading cards and gaming community",
  "Buy, sell & trade interest",
  "Technology education and local events",
] as const;

export const STORY_SECTIONS = [
  {
    id: "how-we-started",
    title: "How PixelNation started",
    paragraphs: [
      `PixelNation began with a love of technology and a stubborn refusal to treat every broken device as disposable. Since 2007, the work has been hands-on: diagnosing real faults, repairing what can be repaired, and telling customers the truth about what is—and is not—worth fixing.`,
      `What started as dedicated repair service grew into deeper specialties—microsoldering, data recovery, appliance diagnostics, and training that teaches practical bench skills. Along the way, gaming stayed close to the culture of the shop: consoles on the bench, conversations about cards and play, and a belief that technology is more meaningful when people share it.`,
    ],
  },
  {
    id: "why-we-repair",
    title: "Why we repair",
    paragraphs: [
      `Repair is respect—for the device, for the customer's money, and for the photos, files, and memories stored inside. Replacement culture is convenient for manufacturers; it is not always right for people.`,
      `We repair because careful diagnostics can save a phone, revive a console, recover a hard drive, or restore a computer someone still needs for work or school. When board-level work is required, we say so. When replacement is the wiser path, we say that too. Honesty is part of the repair.`,
    ],
  },
  {
    id: "why-gaming-matters",
    title: "Why gaming matters",
    paragraphs: [
      `Gaming is not a distraction from technology—it is one of the best reasons people connect through it. Trading card games, video games, and shared tables create friendships, friendly competition, and a welcoming way for newcomers to learn.`,
      `PixelNation is expanding trading cards, accessories, buy/sell/trade interest, and community events because gaming belongs next to repair—not behind it. We want Emporia to have a place where fixing a Switch and finding a booster pack can live under the same roof.`,
    ],
  },
  {
    id: "building-community",
    title: "Building a community",
    paragraphs: [
      `A good local shop is more than a counter and a queue. It is a place people return to—because they were treated fairly, because someone explained a repair without jargon, or because they found others who love the same games.`,
      `As PixelNation grows toward a larger location with more room for inventory, tables, and events, the community goal stays simple: be welcoming to beginners and experienced players, collectors and casual groups, families and competitive minds. Help people. Make room for them.`,
    ],
  },
  {
    id: "our-vision",
    title: "Our vision",
    paragraphs: [
      `We see PixelNation as a lasting technology, gaming, and community brand in ${SITE.address.region}—professional electronics repair, trading cards, video games, local events, buy/sell/trade, and technology education working together.`,
      `The larger location will give that vision more room. Until details like address and opening date are confirmed, we will not invent them. What we can promise is the direction: repair done right, games people love, and a place worth visiting.`,
    ],
  },
] as const;

export const OUR_VALUES = [
  {
    title: "Honesty",
    text: "Clear diagnostics, clear options, and no pressure to buy what you do not need.",
  },
  {
    title: "Craft",
    text: "Respect for careful work—from screen swaps to microsoldering and recovery cases.",
  },
  {
    title: "Hospitality",
    text: "A shop and community that feel approachable, whether you are new or experienced.",
  },
  {
    title: "Stewardship",
    text: "Repair when it makes sense. Teach skills that last. Build something the community can trust.",
  },
  {
    title: "Curiosity",
    text: "Keep learning—better tools, better methods, better ways to serve gamers and customers.",
  },
  {
    title: "Belonging",
    text: "Technology and gaming are better when people share them in person.",
  },
] as const;

export const WHAT_WE_OFFER = [
  {
    title: "Phone Repair",
    description: "Screens, batteries, charging ports, and board-level phone faults.",
    href: "/phone-repair",
    keyword: "Phone Repair Emporia KS",
  },
  {
    title: "Computer Repair",
    description: "Laptops, desktops, Macs, gaming PCs, and performance upgrades.",
    href: "/computer-repair",
    keyword: "Computer Repair Emporia KS",
  },
  {
    title: "Appliance Repair",
    description: "Diagnostics and repair for household and specialty appliances.",
    href: "/appliance-repair",
    keyword: "Appliance Repair Emporia KS",
  },
  {
    title: "Game Console Repair",
    description: "HDMI, power, overheating, and internal console faults.",
    href: "/console-repair",
    keyword: "Console Repair Emporia KS",
  },
  {
    title: "Data Recovery",
    description: "Photos, documents, and files from failed phones, drives, and storage.",
    href: "/data-recovery",
    keyword: "Data Recovery Emporia KS",
  },
  {
    title: "Board Repair & Microsoldering",
    description: "Charging ports, HDMI, traces, shorts, and component-level rework.",
    href: "/board-repair",
    keyword: "Board Repair Emporia KS",
  },
  {
    title: "Trading Cards & Gaming",
    description: "Sealed products, singles interest, accessories, and community play.",
    href: "/trading-cards",
    keyword: "Trading Cards Emporia KS",
  },
  {
    title: "Buy, Sell & Trade",
    description: "Collection reviews for eligible cards, games, consoles, and accessories.",
    href: "/buy-sell-trade",
    keyword: "Sell Trading Cards Emporia",
  },
  {
    title: "Training Courses",
    description: "Hands-on microsoldering and board repair courses for technicians.",
    href: "/training-courses",
    keyword: "Microsoldering Training",
  },
  {
    title: "Software & Web Development",
    description:
      "Custom websites, SaaS platforms, business automation, client portals, and dashboards.",
    href: "/software-development",
    keyword: "Custom Software Development",
  },
] as const;

/** About-page highlights — complements the full /why-choose-pixelnation page. */
export const WHY_CHOOSE = [
  {
    title: "Advanced board-level diagnostics",
    text: "Microsoldering, power rail testing, and connector rework when standard part swaps are not enough.",
  },
  {
    title: "Real-world technical experience",
    text: "Repairs backed by years of hands-on work across phones, computers, consoles, appliances, and boards.",
  },
  {
    title: "Data recovery expertise",
    text: "Structured paths to recover important files when devices will not boot or storage fails.",
  },
  {
    title: "Gaming & trading cards",
    text: "A growing local destination for sealed products, singles interest, accessories, and community play.",
  },
  {
    title: "Local support in Emporia, Kansas",
    text: "Straightforward communication and dependable service from a shop rooted in the community.",
  },
  {
    title: "Hands-on training",
    text: "Practical courses that teach diagnostics and microsoldering skills technicians can use immediately.",
  },
] as const;

export const ABOUT_FAQ = [
  {
    question: "When was PixelNation established?",
    answer:
      "PixelNation has been serving customers with hands-on repair expertise since 2007, growing from everyday device repair into advanced diagnostics, data recovery, training, and a trading-card and gaming community.",
  },
  {
    question: "What makes PixelNation different from other repair shops?",
    answer:
      "PixelNation combines local repair service with board-level microsoldering, data recovery, appliance diagnostics, professional training, and an expanding trading-card and gaming presence—solving hard technical problems while building a welcoming community.",
  },
  {
    question: "Does PixelNation offer training for other technicians?",
    answer:
      "Yes. PixelNation offers hands-on microsoldering and board repair training for shop owners, technicians, and entrepreneurs through structured courses in Emporia, Kansas.",
  },
  {
    question: "Is PixelNation only a repair shop?",
    answer:
      "Repair remains a core strength, but PixelNation is becoming a broader technology, gaming, and community brand—including trading cards, events interest, buy/sell/trade, and education alongside professional electronics repair.",
  },
] as const;

export const AEO_ANSWERS = [
  {
    question: "What is PixelNation?",
    answer:
      "PixelNation is a technology, gaming, and community business in Emporia, Kansas specializing in professional electronics repair, data recovery, board-level microsoldering, trading cards, and local gaming community experiences—plus training and software services.",
  },
  {
    question: "Does PixelNation offer repair training?",
    answer:
      "Yes. PixelNation provides hands-on microsoldering and board repair training for technicians and business owners.",
  },
  {
    question: "Where is PixelNation located?",
    answer:
      "PixelNation is based in Emporia, Kansas and also offers nationwide mail-in services.",
  },
] as const;

export { MEET_PIXELNATION, OUR_MISSION };
