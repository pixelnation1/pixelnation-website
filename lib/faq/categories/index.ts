import type { FaqCategoryId } from "@/lib/faq/types";
import { BOARD_REPAIR_FAQS } from "./board";
import { COMPUTER_REPAIR_FAQS } from "./computer";
import { CONSOLE_REPAIR_FAQS } from "./console";
import { DATA_RECOVERY_FAQS } from "./data-recovery";
import { HDMI_REPAIR_FAQS } from "./hdmi";
import { LIQUID_DAMAGE_FAQS } from "./liquid";
import { MAIL_IN_REPAIR_FAQS } from "./mail-in";
import { MICROSOLDERING_FAQS } from "./microsoldering";
import { PHONE_REPAIR_FAQS } from "./phone";
import { TRAINING_FAQS } from "./training";

export {
  BOARD_REPAIR_FAQS,
  COMPUTER_REPAIR_FAQS,
  CONSOLE_REPAIR_FAQS,
  DATA_RECOVERY_FAQS,
  HDMI_REPAIR_FAQS,
  LIQUID_DAMAGE_FAQS,
  MAIL_IN_REPAIR_FAQS,
  MICROSOLDERING_FAQS,
  PHONE_REPAIR_FAQS,
  TRAINING_FAQS,
};

const CATEGORY_MAP: Record<FaqCategoryId, readonly import("@/lib/faq/types").EnrichedFaqItem[]> = {
  "phone-repair": PHONE_REPAIR_FAQS,
  "console-repair": CONSOLE_REPAIR_FAQS,
  "computer-repair": COMPUTER_REPAIR_FAQS,
  "data-recovery": DATA_RECOVERY_FAQS,
  microsoldering: MICROSOLDERING_FAQS,
  "board-repair": BOARD_REPAIR_FAQS,
  "hdmi-repair": HDMI_REPAIR_FAQS,
  "liquid-damage": LIQUID_DAMAGE_FAQS,
  "mail-in-repair": MAIL_IN_REPAIR_FAQS,
  training: TRAINING_FAQS,
};

export function getCategoryFaqs(category: FaqCategoryId) {
  return CATEGORY_MAP[category];
}
