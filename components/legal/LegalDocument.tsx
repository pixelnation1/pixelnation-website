import Link from "next/link";

type LegalSectionLike = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

type LegalDocumentProps = {
  title: string;
  effectiveDate: string;
  intro: readonly string[];
  sections: readonly LegalSectionLike[];
  breadcrumbLabel: string;
};

export function LegalDocument({
  title,
  effectiveDate,
  intro,
  sections,
  breadcrumbLabel,
}: LegalDocumentProps) {
  return (
    <article>
      <section
        className="border-b border-card-border bg-gradient-to-b from-accent-muted via-accent-secondary-muted to-background py-12 sm:py-16"
        aria-labelledby="legal-heading"
      >
        <div className="mx-auto max-w-3xl px-4">
          <nav className="mb-3 text-xs text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{breadcrumbLabel}</span>
          </nav>
          <h1
            id="legal-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted">Effective date: {effectiveDate}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <div className="space-y-4 text-base leading-relaxed text-muted">
          {intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <nav className="mt-10 rounded-xl border border-card-border bg-card p-5" aria-label="On this page">
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
            On this page
          </p>
          <ul className="mt-3 columns-1 gap-x-8 space-y-2 text-sm text-muted sm:columns-2">
            {sections.map((section) => (
              <li key={section.id} className="break-inside-avoid">
                <a href={`#${section.id}`} className="hover:text-accent-secondary">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 64)}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-card-border pt-6 text-sm text-muted">
          Related:{" "}
          <Link href="/privacy-policy" className="text-accent-secondary hover:underline">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/terms-of-service" className="text-accent-secondary hover:underline">
            Terms of Service
          </Link>
          {" · "}
          <Link href="/contact" className="text-accent-secondary hover:underline">
            Contact
          </Link>
        </p>
      </div>
    </article>
  );
}
