import Link from "next/link";
import { CITIES, type CityData } from "@/lib/locations/cities";
import { Section } from "@/components/Section";

type NearbyAreasProps = {
  city: CityData;
  serviceSlug?: string;
};

export function NearbyAreas({ city, serviceSlug }: NearbyAreasProps) {
  const nearby = city.nearbySlugs
    .map((slug) => CITIES[slug])
    .filter(Boolean);

  if (nearby.length === 0) return null;

  return (
    <Section
      id="nearby-areas"
      title="Nearby areas we serve"
      subtitle={`${city.name} and surrounding Kansas communities.`}
      alt
    >
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nearby.map((near) => {
          const href = serviceSlug
            ? `/locations/${near.slug}/${serviceSlug}`
            : `/locations/${near.slug}`;
          return (
            <li key={near.slug}>
              <Link
                href={href}
                className="flex min-h-11 flex-col rounded-xl border border-card-border bg-background/50 px-4 py-3 transition hover:border-accent-secondary/50 hover:text-accent"
              >
                <span className="font-medium text-foreground">{near.regionLabel}</span>
                <span className="mt-1 text-sm text-muted">
                  {serviceSlug ? "View local service page" : "Repair services"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-sm text-muted">
        PixelNation is based in {CITIES.emporia.regionLabel} and serves customers
        across Kansas through mail-in repair and regional support.
      </p>
    </Section>
  );
}
