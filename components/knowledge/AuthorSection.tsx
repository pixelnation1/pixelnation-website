import Image from "next/image";
import { SITE } from "@/lib/site";

type AuthorSectionProps = {
  authorName: string;
  datePublished: string;
  readTimeMinutes: number;
};

export function AuthorSection({
  authorName,
  datePublished,
  readTimeMinutes,
}: AuthorSectionProps) {
  const formattedDate = new Date(datePublished).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-wrap items-center gap-4 border-y border-card-border py-5">
      <div className="relative h-12 w-12 overflow-hidden rounded-full border border-card-border bg-card">
        <Image
          src="/images/pixellogo.png"
          alt={`${SITE.name} logo`}
          fill
          className="object-contain p-1"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{authorName}</p>
        <p className="text-xs text-muted">
          {SITE.name} · {SITE.address.region}
        </p>
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-muted">
        <time dateTime={datePublished}>{formattedDate}</time>
        <span aria-hidden>·</span>
        <span>{readTimeMinutes} min read</span>
      </div>
    </div>
  );
}
