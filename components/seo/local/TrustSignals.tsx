import { TRUST_ITEMS } from "@/lib/site";
import { Section } from "@/components/Section";

const EXTRA_SIGNALS = [
  "Board-level and microsoldering capability",
  "Mail-in repair across Kansas",
  "Clear quotes before work begins",
  "AEO-friendly repair guidance on every page",
] as const;

type TrustSignalsProps = {
  cityName?: string;
};

export function TrustSignals({ cityName }: TrustSignalsProps) {
  const items = cityName
    ? [
        ...TRUST_ITEMS.slice(0, 3),
        `Serving ${cityName} and surrounding areas`,
        ...EXTRA_SIGNALS.slice(0, 2),
      ]
    : [...TRUST_ITEMS, ...EXTRA_SIGNALS];

  return (
    <Section
      id="trust"
      title="Why customers trust PixelNation"
      subtitle="Professional repair with transparent communication."
      alt
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-xl border border-card-border bg-card px-4 py-4 text-sm text-muted"
          >
            <span
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-secondary"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
