import type { KnowledgeArticle } from "@/lib/knowledge/types";
import { KNOWLEDGE_AUTHOR, PUBLISHED_2025_01 } from "./shared";

export const articleWhatIsMicrosoldering: KnowledgeArticle = {
  slug: "what-is-microsoldering",
  title: "What Is Microsoldering? A Complete Guide for Device Owners",
  description:
    "Microsoldering repairs failed ICs, traces, and connectors at the board level—beyond screens and batteries. Learn when you need it, how it works, and what to expect.",
  excerpt:
    "Microsoldering is precision board-level repair that fixes power, charging, and display faults when parts replacement alone cannot restore a device.",
  category: "microsoldering",
  datePublished: PUBLISHED_2025_01,
  image: "/images/pixellogo.png",
  keywords: [
    "microsoldering",
    "board level repair",
    "IC replacement",
    "trace repair",
    "phone won't charge",
  ],
  conversationalQueries: [
    "what is microsoldering",
    "do I need microsoldering for my phone",
    "difference between phone repair and microsoldering",
  ],
  featuredAnswer:
    "Microsoldering is the process of repairing or replacing tiny electronic components on a device's logic board using specialized tools—hot air stations, microscopes, and fine-tip soldering irons—when standard part swaps (screens, batteries) cannot fix the fault.",
  readTimeMinutes: 8,
  featured: true,
  popular: true,
  relatedServicePaths: ["/board-repair", "/phone-repair", "/training"],
  relatedArticleSlugs: [
    "signs-your-phone-has-board-damage",
    "what-causes-charging-port-failure",
    "what-happens-during-a-diagnostic-repair",
  ],
  authorName: KNOWLEDGE_AUTHOR,
  faq: [
    {
      question: "Is microsoldering the same as regular phone repair?",
      answer:
        "No. Regular phone repair typically replaces modular parts—screens, batteries, charging ports. Microsoldering works on the logic board itself: charging ICs, PMICs, display connectors, and damaged copper traces.",
    },
    {
      question: "How do I know if my device needs microsoldering?",
      answer:
        "Common signs include no power after a drop, charging that stops at a percentage, no display with a known-good screen, or liquid damage that persists after cleaning. A diagnostic identifies whether the fault is board-level.",
    },
    {
      question: "Is microsoldering worth it vs buying a new device?",
      answer:
        "For flagship phones, gaming consoles, and laptops with valuable data, board repair is often far cheaper than replacement. A technician can quote after diagnostics based on the failed component and labor.",
    },
    {
      question: "Can any repair shop do microsoldering?",
      answer:
        "Microsoldering requires specialized equipment, training, and practice. Shops without board-level capability may incorrectly recommend device replacement when the board is actually repairable.",
    },
  ],
  content: [
    {
      type: "paragraph",
      text: "If your phone charges intermittently, your PS5 shows no HDMI signal, or your laptop will not power on after liquid exposure, the problem may not be a simple part you can see—it may live on the logic board. That is where microsoldering comes in.",
    },
    {
      type: "highlightedAnswer",
      question: "What is microsoldering in simple terms?",
      answer:
        "Microsoldering is board-level repair: technicians use microscopes and precision heat to replace tiny chips (ICs), rebuild damaged traces, and restore power and data paths that modular part replacement cannot fix.",
    },
    {
      type: "heading",
      level: 2,
      id: "how-microsoldering-works",
      text: "How Microsoldering Works",
    },
    {
      type: "paragraph",
      text: "Modern phones, consoles, and laptops pack dozens of integrated circuits onto multilayer boards. When one IC fails—often from liquid, heat, or physical stress—symptoms appear at the user level: no charge, no image, random reboots. A microsoldering technician maps power rails, measures for shorts, and replaces or rebails the failed component.",
    },
    {
      type: "list",
      items: [
        "Diagnostic testing to isolate the failed rail or IC",
        "Board inspection under a microscope",
        "Removal of the failed component with controlled heat",
        "Pad cleaning and new component installation",
        "Post-repair verification of power, charge, and function",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "common-microsoldering-repairs",
      text: "Common Microsoldering Repairs",
    },
    {
      type: "paragraph",
      text: "At PixelNation, microsoldering covers phone charging ICs (Tristar/Hydra on iPhone, PMIC paths on Android), console HDMI ports and related power circuits, laptop no-power and no-display faults, and trace repair after corrosion or impact.",
    },
    {
      type: "pullQuote",
      text: "Board-level repair is often the difference between losing a device entirely and getting years more use from hardware you already own.",
      attribution: "PixelNation Repair Team",
    },
    {
      type: "heading",
      level: 3,
      id: "tools-used",
      text: "Tools Used in Microsoldering",
    },
    {
      type: "list",
      items: [
        "Stereo microscope (typically 7×–45× magnification)",
        "Hot air rework station for IC removal",
        "Fine-tip soldering iron and quality solder wire",
        "DC power supply with current limiting for safe bring-up",
        "Multimeter and board-view schematics for rail tracing",
      ],
    },
    {
      type: "youtube",
      videoId: "dQw4w9WgXcQ",
      title: "Introduction to board-level repair concepts",
    },
    {
      type: "heading",
      level: 2,
      id: "when-to-seek-help",
      text: "When to Seek Microsoldering Help",
    },
    {
      type: "paragraph",
      text: "Seek board-level repair when modular fixes have failed or symptoms point to power or data paths: device dead after drop, charge port replaced but still no charge, HDMI port looks fine but no signal, or liquid damage after initial cleaning. Start with a diagnostic so you get an accurate quote before committing to IC work.",
    },
  ],
};
