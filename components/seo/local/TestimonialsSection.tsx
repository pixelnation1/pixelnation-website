import { Section } from "@/components/Section";

type Testimonial = {
  quote: string;
  context: string;
};

const BASE_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They explained what was wrong with my charging port and fixed it at the board level when another shop said replace the phone.",
    context: "Phone repair customer",
  },
  {
    quote:
      "Mail-in was straightforward — tracking both ways and updates when my PS5 HDMI was done.",
    context: "Console repair · mail-in",
  },
  {
    quote:
      "Recovered photos from a water-damaged phone I thought was gone. Honest about what was possible.",
    context: "Data recovery",
  },
];

const CITY_CONTEXT: Record<string, string> = {
  Wichita: "Wichita area",
  Topeka: "Topeka",
  Manhattan: "Manhattan / K-State area",
  Lawrence: "Lawrence",
  Salina: "Salina",
  "Kansas City": "KC metro",
  Emporia: "Emporia",
};

type TestimonialsSectionProps = {
  cityName?: string;
  serviceName?: string;
};

export function TestimonialsSection({ cityName, serviceName }: TestimonialsSectionProps) {
  const regionNote = cityName ? CITY_CONTEXT[cityName] ?? cityName : "Kansas";

  return (
    <Section
      id="reviews"
      title="What customers say"
      subtitle={
        serviceName
          ? `${serviceName} feedback from ${regionNote} and mail-in customers.`
          : `Repair feedback from ${regionNote} and across Kansas.`
      }
    >
      <ul className="grid gap-5 md:grid-cols-3">
        {BASE_TESTIMONIALS.map((t) => (
          <li
            key={t.context}
            className="rounded-xl border border-card-border bg-card p-5"
          >
            <blockquote className="text-sm leading-relaxed text-foreground">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted">
              {t.context}
              {cityName ? ` · ${regionNote}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
