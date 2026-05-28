import type { FaqItem } from "@/lib/seo/types";

type AeoSectionProps = {
  items: readonly FaqItem[];
  title?: string;
  id?: string;
};

/** Answer-engine optimized Q&A blocks (visible; FAQ schema should include same items). */
export function AeoSection({
  items,
  title = "Quick answers",
  id = "quick-answers",
}: AeoSectionProps) {
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
            itemScope
            itemType="https://schema.org/Question"
          >
            <h3 className="text-base font-semibold text-foreground" itemProp="name">
              {item.question}
            </h3>
            <div
              className="mt-2 text-sm leading-relaxed text-muted"
              itemScope
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
            >
              <p itemProp="text">{item.answer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
