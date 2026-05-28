import type { KnowledgeArticle } from "@/lib/knowledge/types";
import { KNOWLEDGE_AUTHOR, PUBLISHED_2025_04 } from "./shared";

export const articleHdmiPortVsEncoder: KnowledgeArticle = {
  slug: "hdmi-port-vs-hdmi-encoder-failure",
  title: "HDMI Port vs HDMI Encoder Failure: How to Tell the Difference",
  description:
    "No HDMI signal can mean a bad port or a failed encoder chip. Learn symptoms, diagnostics, and repair costs for PS5, Xbox, and laptop video output.",
  excerpt:
    "A damaged HDMI port and a failed HDMI encoder produce similar no-video symptoms—only board diagnostics confirm which repair you actually need.",
  category: "hdmi-repair",
  datePublished: PUBLISHED_2025_04,
  featured: true,
  keywords: [
    "HDMI encoder failure",
    "HDMI port vs encoder",
    "PS5 no signal",
    "console video repair",
  ],
  conversationalQueries: [
    "HDMI port or encoder bad",
    "how to tell if HDMI encoder is dead",
    "PS5 HDMI encoder chip failure",
  ],
  featuredAnswer:
    "HDMI port failure usually shows physical damage or intermittent signal when wiggling the cable; HDMI encoder failure often presents as no video with a visually normal port and may follow power surges, overheating, or prior bad port repairs.",
  readTimeMinutes: 7,
  relatedServicePaths: ["/console-repair", "/board-repair"],
  relatedArticleSlugs: ["why-ps5-hdmi-ports-fail", "how-console-overheating-damages-components"],
  authorName: KNOWLEDGE_AUTHOR,
  faq: [
    {
      question: "Is encoder repair more expensive than port repair?",
      answer:
        "Generally yes—encoder work is microsoldering on the main board with higher labor and risk. Accurate diagnosis avoids paying for the wrong repair.",
    },
    {
      question: "Can a bad HDMI cable damage the encoder?",
      answer:
        "A severe ESD event or short from a damaged cable is possible but uncommon. Most encoder faults trace to board stress, heat, or collateral damage from a failing port.",
    },
    {
      question: "Do laptops have HDMI encoders too?",
      answer:
        "Laptops route video through the CPU/GPU and port hardware; similar no-output issues can be port, cable, or GPU-related—diagnostics differ by model.",
    },
  ],
  content: [
    {
      type: "paragraph",
      text: "Console owners often search for 'HDMI port repair' when the real fault is the encoder IC that processes video before it reaches the socket. Replacing the port alone will not fix an encoder failure—and vice versa.",
    },
    {
      type: "highlightedAnswer",
      question: "What is the difference between HDMI port and encoder failure?",
      answer:
        "The HDMI port is the physical connector you plug into; the encoder is a chip that generates the HDMI signal. Port issues show mechanical symptoms; encoder issues are electronic and require board-level testing.",
    },
    {
      type: "heading",
      level: 2,
      id: "comparison",
      text: "Side-by-Side Comparison",
    },
    {
      type: "list",
      items: [
        "Port failure: bent pins, loose housing, works at an angle",
        "Encoder failure: port looks normal, no signal on multiple TVs/cables",
        "Port repair: replace connector, verify pads",
        "Encoder repair: microsoldering IC, firmware-independent video test",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "diagnostics",
      text: "How Technicians Diagnose",
    },
    {
      type: "paragraph",
      text: "We inspect the port under magnification, measure continuity on data lanes, and test known-good HDMI paths. If the port is sound but no TMDS signal is present, encoder or related power rails are investigated.",
    },
    {
      type: "pullQuote",
      text: "Never assume the cheapest repair matches the actual fault—encoder and port work are not interchangeable.",
    },
  ],
};
