import type { KnowledgeArticle } from "@/lib/knowledge/types";
import { KNOWLEDGE_AUTHOR, PUBLISHED_2025_04 } from "./shared";

export const articleWhatHappensDiagnosticRepair: KnowledgeArticle = {
  slug: "what-happens-during-a-diagnostic-repair",
  title: "What Happens During a Diagnostic Repair? (Step-by-Step)",
  description:
    "A diagnostic repair identifies the real fault before parts are replaced. Learn PixelNation's intake, testing, quote, and approval workflow for phones, consoles, and laptops.",
  excerpt:
    "Diagnostics prevent wasted part swaps—technicians test power, storage, and display paths, then provide a clear repair quote before any major work begins.",
  category: "training-education",
  datePublished: PUBLISHED_2025_04,
  featured: true,
  keywords: [
    "repair diagnostic",
    "device diagnostic",
    "repair shop process",
    "repair quote",
  ],
  conversationalQueries: [
    "what is a diagnostic repair",
    "how does a repair shop diagnose my phone",
    "do I pay for diagnostics",
  ],
  featuredAnswer:
    "During a diagnostic repair, a technician documents symptoms, tests power and key subsystems (charge, display, storage, ports), identifies the failed component or board area, and provides a written quote—no major parts are replaced until you approve the repair plan.",
  readTimeMinutes: 5,
  relatedServicePaths: ["/contact", "/repairs", "/training"],
  relatedArticleSlugs: [
    "what-is-microsoldering",
    "signs-your-phone-has-board-damage",
    "can-data-be-recovered-from-a-dead-phone",
  ],
  authorName: KNOWLEDGE_AUTHOR,
  faq: [
    {
      question: "How long does a diagnostic take?",
      answer:
        "Many devices are assessed same-day or within 24–48 hours depending on queue and complexity. Board-level cases may need extended bench time.",
    },
    {
      question: "Is the diagnostic fee applied to repair?",
      answer:
        "Ask at intake—PixelNation policies may credit diagnostic fees toward approved repairs. You'll know before leaving the device.",
    },
    {
      question: "Can I decline repair after diagnostic?",
      answer:
        "Yes. You receive findings and can pick up the device or proceed with data-only options when applicable.",
    },
  ],
  content: [
    {
      type: "paragraph",
      text: "Customers often ask for a screen or battery replacement when the real issue is a charging IC, HDMI encoder, or corroded trace. Diagnostics exist to find the truth before money is spent on the wrong fix.",
    },
    {
      type: "highlightedAnswer",
      question: "What happens during a diagnostic repair?",
      answer:
        "Intake documents your symptoms → bench testing isolates the fault → you receive a quote with parts and labor → you approve → repair and verification → pickup with warranty details when applicable.",
    },
    {
      type: "heading",
      level: 2,
      id: "steps",
      text: "Step-by-Step at PixelNation",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Check-in: device condition, passcode policy, and symptom history",
        "Initial safety check: swelling battery, liquid, prior repair quality",
        "Subsystem tests: power draw, display path, ports, storage detection",
        "Findings report: photos or notes for board-level issues when helpful",
        "Quote and approval: clear options—repair, data-only, or decline",
        "Repair and QC: post-repair stress test before return",
      ],
    },
    {
      type: "pullQuote",
      text: "A good diagnostic saves you from buying two wrong screens and still having a dead phone.",
    },
    {
      type: "heading",
      level: 2,
      id: "what-to-bring",
      text: "What to Bring",
    },
    {
      type: "paragraph",
      text: "Bring the device, charger, and any error details (when it started, drops, liquid). For data recovery, know your Apple ID or Google account credentials if extraction requires them.",
    },
    {
      type: "heading",
      level: 2,
      id: "start-repair",
      text: "Start Your Diagnostic",
    },
    {
      type: "paragraph",
      text: "Contact PixelNation in Emporia, KS to schedule intake. Whether it's a phone, console, or laptop, diagnostics are the fastest path to an honest repair quote.",
    },
  ],
};
