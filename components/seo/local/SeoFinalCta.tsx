import { Button } from "@/components/ui/Button";
import { finalCtaSection } from "@/components/layout/responsive";
import { SITE } from "@/lib/site";

type SeoFinalCtaProps = {
  headline: string;
  subtext?: string;
};

export function SeoFinalCta({ headline, subtext }: SeoFinalCtaProps) {
  return (
    <section className={finalCtaSection} aria-labelledby="seo-final-cta">
      <div className="mx-auto max-w-3xl min-w-0 px-4 text-center">
        <h2 id="seo-final-cta" className="text-2xl font-bold tracking-tight sm:text-3xl">
          {headline}
        </h2>
        {subtext ? (
          <p className="mt-4 text-base leading-relaxed text-muted">{subtext}</p>
        ) : null}
        <div className="cta-group mt-8 justify-center">
          <Button href="/contact">Start a Repair</Button>
          <Button href={SITE.phoneHref} variant="secondary" external>
            Call {SITE.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
