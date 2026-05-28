type PullQuoteProps = {
  text: string;
  attribution?: string;
};

export function PullQuote({ text, attribution }: PullQuoteProps) {
  return (
    <blockquote className="relative rounded-2xl border border-card-border bg-card px-6 py-5 sm:px-8 sm:py-6">
      <span
        className="absolute left-4 top-3 text-4xl leading-none text-accent/40 sm:left-6"
        aria-hidden
      >
        "
      </span>
      <p className="pl-6 text-lg font-medium italic leading-relaxed text-foreground sm:pl-8 sm:text-xl">
        {text}
      </p>
      {attribution ? (
        <footer className="mt-3 pl-6 text-sm text-muted sm:pl-8">— {attribution}</footer>
      ) : null}
    </blockquote>
  );
}
