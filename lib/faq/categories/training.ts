import type { EnrichedFaqItem } from "@/lib/faq/types";

export const TRAINING_FAQS: readonly EnrichedFaqItem[] = [
  {
    question: "Do you offer hands-on repair training?",
    answer:
      "Yes. PixelNation runs practical repair and board-level training in Emporia, Kansas—focused on diagnostics, soldering, and real bench workflows.",
    links: [{ label: "Training overview", href: "/training" }],
  },
  {
    question: "Who are training courses for?",
    answer:
      "Courses suit aspiring technicians, shop staff upskilling, and hobbyists ready for structured microsoldering—not casual one-off tips.",
    links: [{ label: "Training courses", href: "/training-courses" }],
  },
  {
    question: "Do I need my own tools for training?",
    answer:
      "Requirements vary by course. We list what is provided versus what to bring on each course page—contact us if you are unsure.",
  },
  {
    question: "Does training cover microsoldering?",
    answer:
      "Yes. Advanced courses include microscope work, hot air, charging IC paths, and connector rework aligned with shop-grade repair.",
    links: [{ label: "What is microsoldering?", href: "/knowledge/what-is-microsoldering" }],
  },
  {
    question: "How do I enroll in a PixelNation course?",
    answer:
      "Contact us for current schedules, pricing, and seat availability. We keep class sizes small for hands-on time.",
    links: [{ label: "Contact enrollment", href: "/contact" }],
  },
];
