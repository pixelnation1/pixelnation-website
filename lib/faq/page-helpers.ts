import type { RepairPageId } from "@/lib/faq/repair-pages";
import { getTrainingFaqs, resolveRepairPageFaqs, toSchemaFaqs } from "@/lib/faq/resolve";
import type { FaqItem } from "@/lib/seo/types";

function bundle(items: readonly FaqItem[]) {
  return { items, schema: toSchemaFaqs(items) };
}

/** Visible + schema FAQ bundle for legacy repair landing pages. */
export function getRepairPageFaqBundle(page: RepairPageId) {
  return bundle(resolveRepairPageFaqs(page, 10));
}

export function getTrainingFaqBundle() {
  return bundle(getTrainingFaqs(10));
}
