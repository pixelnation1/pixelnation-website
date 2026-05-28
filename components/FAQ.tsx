import type { FaqItem } from "@/lib/seo/types";
import { FAQ_ITEMS } from "@/lib/site";

type FAQProps = {
  items?: readonly FaqItem[];
  id?: string;
  heading?: string;
};

export function FAQ({ items = FAQ_ITEMS, id = "faq", heading = "Frequently asked questions" }: FAQProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="sr-only">
        {heading}
      </h2>
      <div className="space-y-3" role="list">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-card-border bg-card"
            role="listitem"
          >
            <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="text-accent-secondary transition group-open:rotate-45" aria-hidden>
                  +
                </span>
              </span>
            </summary>
            <p className="border-t border-card-border px-5 py-4 text-sm leading-relaxed text-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
