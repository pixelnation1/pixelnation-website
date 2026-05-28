import type { KnowledgeArticle } from "@/lib/knowledge/types";
import { KNOWLEDGE_AUTHOR, PUBLISHED_2025_03 } from "./shared";

export const articleCommonCausesLaptopNoDisplay: KnowledgeArticle = {
  slug: "common-causes-of-laptop-no-display",
  title: "Common Causes of Laptop No Display (Black Screen But Fans Spin)",
  description:
    "Laptop black screen causes include RAM, display cable, GPU, BIOS, and power faults. Learn how to narrow symptoms and when professional board repair is needed.",
  excerpt:
    "A laptop that powers on with fans but shows a black screen can fail at the RAM, display assembly, GPU, or motherboard power stage—each with different repair paths.",
  category: "computer-repair",
  datePublished: PUBLISHED_2025_03,
  image: "/images/laptopdisplay.png",
  imageAlt:
    "Laptop with display failure caused by damaged display cable or motherboard issue",
  featured: true,
  keywords: [
    "laptop no display",
    "laptop black screen",
    "laptop repair",
    "no video laptop",
  ],
  conversationalQueries: [
    "laptop turns on but screen is black",
    "why does my laptop have no display",
    "laptop fan spinning no picture",
  ],
  featuredAnswer:
    "Laptop no display is commonly caused by failed RAM or improper seating, a damaged display cable or hinge area, integrated GPU or CPU power faults, corrupted BIOS/UEFI, or liquid damage on the motherboard—fans spinning only mean partial power, not a healthy boot to video.",
  readTimeMinutes: 8,
  relatedServicePaths: ["/computer-repair", "/board-repair"],
  relatedArticleSlugs: [
    "how-liquid-damage-corrodes-electronics",
    "what-happens-during-a-diagnostic-repair",
  ],
  authorName: KNOWLEDGE_AUTHOR,
  faq: [
    {
      question: "Should I connect an external monitor first?",
      answer:
        "Yes—if external video works, the issue is likely the laptop panel, cable, or backlight. If external is also black, suspect RAM, GPU, or board power.",
    },
    {
      question: "Can a Windows update cause no display?",
      answer:
        "Rarely a permanent black screen; more often a driver issue recoverable in safe mode. Hardware no display persists across reboots and external monitors.",
    },
    {
      question: "Is no display always the GPU?",
      answer:
        "No. RAM, power sequencing, and display cables are equally common. Diagnostics isolate the stage before quoting GPU or board work.",
    },
  ],
  content: [
    {
      type: "paragraph",
      text: "You press power, hear fans, maybe see keyboard backlight—but the screen stays black. Before assuming the laptop is totaled, it helps to know which subsystem failed.",
    },
    {
      type: "highlightedAnswer",
      question: "What causes laptop no display?",
      answer:
        "Top causes: loose or failed RAM, broken display cable from hinge wear, failed backlight or panel, motherboard power rail faults, and dedicated GPU failures on gaming laptops.",
    },
    {
      type: "heading",
      level: 2,
      id: "quick-checks",
      text: "Quick Checks You Can Try",
    },
    {
      type: "list",
      items: [
        "Hard reset: disconnect battery (if accessible), hold power 30 seconds, reconnect",
        "Reseat RAM one stick at a time in each slot",
        "Connect HDMI/DisplayPort to an external monitor",
        "Listen for beep codes or caps lock LED toggle when pressing keys",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "hardware-causes",
      text: "Hardware Causes We See Most Often",
    },
    {
      type: "paragraph",
      text: "Hinge flex damages the eDP cable on many ultrabooks. Gaming laptops suffer VRM or GPU-related power faults after heat stress. Liquid spills corrode backlight circuits and RAM slots. Each needs a different repair—not a generic 'motherboard replacement' quote.",
    },
    {
      type: "image",
      src: "/images/laptopdisplay.png",
      alt: "Laptop with display failure caused by damaged display cable or motherboard issue",
      caption:
        "No-display laptops often trace to a damaged display cable at the hinge, a failed panel or backlight, or motherboard power to the GPU—each needs different diagnostics.",
    },
    {
      type: "heading",
      level: 2,
      id: "professional-diagnosis",
      text: "When to Book a Diagnostic",
    },
    {
      type: "paragraph",
      text: "If external video fails or RAM reseat does not help, professional diagnostics prevent buying wrong parts. PixelNation tests power rails, RAM, display path, and storage before recommending repair.",
    },
  ],
};
