import type { CityData } from "@/lib/locations/cities";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

type MailInSectionProps = {
  city: CityData;
  serviceName?: string;
};

export function MailInSection({ city, serviceName }: MailInSectionProps) {
  const title = serviceName
    ? `Mail-in ${serviceName} from ${city.name}`
    : `Mail-in repair from ${city.name}`;

  return (
    <Section
      id="mail-in"
      title={title}
      subtitle={
        city.isPrimaryLocation
          ? "Walk in or ship — we serve Emporia and the wider region."
          : "Ship securely to our Emporia, Kansas repair bench."
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-card-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Packaging tips</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Use rigid box and padding — no loose devices in envelopes.</li>
            <li>Include your name, phone, email, and symptom notes inside.</li>
            <li>Remove cases and note passcode if you want full testing.</li>
            <li>Use tracked shipping both ways.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-card-border bg-card p-6">
          <h3 className="font-semibold text-foreground">What happens next</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {city.driveTimeNote} We diagnose at {SITE.address.region}, send a
            quote before work begins, and keep you updated through repair and return
            shipping.
          </p>
          <div className="cta-group mt-6">
            <Button href="/contact">Start a Repair</Button>
            <Button href={SITE.phoneHref} variant="outline" external>
              Call {SITE.phone}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
