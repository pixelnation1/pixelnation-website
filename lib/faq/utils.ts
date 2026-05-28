import type { FaqItem } from "@/lib/seo/types";
import type { EnrichedFaqItem, PeopleAlsoAskItem } from "@/lib/faq/types";

/** Merge FAQ lists; first occurrence wins (dedupes by question text). */
export function mergeFaqs(...groups: readonly (readonly FaqItem[])[]): FaqItem[] {
  const seen = new Set<string>();
  const out: FaqItem[] = [];
  for (const group of groups) {
    for (const item of group) {
      const key = item.question.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ question: item.question, answer: item.answer, links: item.links });
    }
  }
  return out;
}

export function takeFaqs(items: readonly FaqItem[], count: number): FaqItem[] {
  return items.slice(0, Math.max(0, count));
}

export function toSchemaFaqs(items: readonly FaqItem[]): FaqItem[] {
  return items.map(({ question, answer }) => ({ question, answer }));
}

/** PAA-style subset: prefer explicit items, then map conversational queries to answers. */
export function buildPeopleAlsoAsk(
  faqs: readonly FaqItem[],
  conversationalQueries: readonly string[] = [],
  featuredAnswer?: string,
  limit = 5,
): PeopleAlsoAskItem[] {
  const items: PeopleAlsoAskItem[] = [];

  if (conversationalQueries.length > 0 && featuredAnswer) {
    items.push({
      question: conversationalQueries[0]!,
      answer: featuredAnswer,
    });
  }

  for (const faq of faqs) {
    if (items.length >= limit) break;
    if (items.some((i) => i.question === faq.question)) continue;
    items.push(faq);
  }

  for (const query of conversationalQueries.slice(1)) {
    if (items.length >= limit) break;
    if (items.some((i) => i.question === query)) continue;
    const match = faqs.find((f) =>
      f.question.toLowerCase().includes(query.slice(0, 20).toLowerCase()),
    );
    if (match) items.push(match);
  }

  return items.slice(0, limit);
}

export function stripLinksForSchema(items: readonly EnrichedFaqItem[]): FaqItem[] {
  return toSchemaFaqs(items);
}
