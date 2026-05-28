import { Section } from "@/components/Section";

type QuickAnswer = { question: string; answer: string };

type QuickAnswersProps = {
  items: readonly QuickAnswer[];
};

/** AEO / featured-snippet friendly concise answers */
export function QuickAnswers({ items }: QuickAnswersProps) {
  if (items.length === 0) return null;

  return (
    <Section
      id="quick-answers"
      title="Quick answers"
      subtitle="Direct answers for common repair questions."
    >
      <dl className="space-y-4">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-xl border border-card-border bg-card px-5 py-4"
          >
            <dt className="font-semibold text-foreground">{item.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
