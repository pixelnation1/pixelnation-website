type HighlightedAnswerProps = {
  question: string;
  answer: string;
};

/** Featured-snippet / AEO optimized direct answer block */
export function HighlightedAnswer({ question, answer }: HighlightedAnswerProps) {
  return (
    <aside
      className="rounded-2xl border-l-4 border-accent bg-accent-muted/40 p-5 sm:p-6"
      aria-label="Key answer"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
        Quick answer
      </p>
      <h3 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">{question}</h3>
      <p className="mt-3 text-base leading-relaxed text-foreground/90">{answer}</p>
    </aside>
  );
}
