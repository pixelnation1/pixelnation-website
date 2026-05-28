import type { PeopleAlsoAskItem } from "@/lib/faq/types";
import { FaqAnswer } from "@/components/faq/FaqAnswer";

type PeopleAlsoAskProps = {
  items: readonly PeopleAlsoAskItem[];
  title?: string;
  id?: string;
};

/** Visible Q&A blocks for featured snippets — JSON-LD FAQ is emitted separately once per page. */
export function PeopleAlsoAsk({
  items,
  title = "People also ask",
  id = "people-also-ask",
}: PeopleAlsoAskProps) {
  if (!items.length) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <h2 id={`${id}-heading`} className="text-2xl font-bold sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <article
            key={item.question}
            className="rounded-xl border border-card-border bg-card p-5"
          >
            <h3 className="text-base font-semibold text-foreground">{item.question}</h3>
            <div className="mt-2">
              <FaqAnswer item={item} variant="inline" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
