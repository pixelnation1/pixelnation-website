import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

type ArticleCTAProps = {
  title?: string;
  description?: string;
};

export function ArticleCTA({
  title = "Need hands-on repair help?",
  description = `PixelNation provides diagnostics, board-level repair, and data recovery in ${SITE.address.region}.`,
}: ArticleCTAProps) {
  return (
    <section
      className="rounded-2xl border border-card-border bg-gradient-to-br from-accent-muted to-accent-secondary-muted p-6 sm:p-8"
      aria-labelledby="article-cta-heading"
    >
      <h2 id="article-cta-heading" className="text-xl font-bold text-foreground sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
        {description}
      </p>
      <div className="cta-group mt-6">
        <Button href="/contact">Start a Repair</Button>
        <Button href={`tel:${SITE.phone.replace(/\D/g, "")}`} variant="secondary">
          Call {SITE.phone}
        </Button>
        <Button href="/repairs" variant="outline">
          View Services
        </Button>
      </div>
    </section>
  );
}
