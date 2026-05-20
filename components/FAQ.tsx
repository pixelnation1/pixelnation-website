import { FAQ_ITEMS } from "@/lib/site";

type FaqItem = { question: string; answer: string };

type FAQProps = {
  items?: readonly FaqItem[];
};

export function FAQ({ items = FAQ_ITEMS }: FAQProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-xl border border-card-border bg-card"
        >
          <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-4">
              {item.question}
              <span className="text-accent-secondary transition group-open:rotate-45">
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
  );
}
