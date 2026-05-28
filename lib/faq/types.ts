import type { FaqItem, FaqLink } from "@/lib/seo/types";

export type { FaqItem, FaqLink };

export type FaqCategoryId =
  | "phone-repair"
  | "console-repair"
  | "computer-repair"
  | "data-recovery"
  | "microsoldering"
  | "board-repair"
  | "hdmi-repair"
  | "liquid-damage"
  | "mail-in-repair"
  | "training";

export type EnrichedFaqItem = FaqItem & {
  links?: readonly FaqLink[];
};

export type PeopleAlsoAskItem = {
  question: string;
  answer: string;
  links?: readonly FaqLink[];
};
