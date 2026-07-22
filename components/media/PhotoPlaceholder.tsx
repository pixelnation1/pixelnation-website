type PhotoPlaceholderProps = {
  label: string;
  description?: string;
  aspect?: "video" | "square" | "wide";
  className?: string;
};

/**
 * Structured slot for future real photography.
 * Swap this for next/image when a photo is ready—layout and aspect stay stable.
 */
export function PhotoPlaceholder({
  label,
  description = "Photo coming soon",
  aspect = "video",
  className = "",
}: PhotoPlaceholderProps) {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "wide"
        ? "aspect-[21/9]"
        : "aspect-video";

  return (
    <figure
      className={`relative flex ${aspectClass} w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-card-border/80 bg-background px-4 text-center ${className}`}
      aria-label={`${label} — ${description}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-muted via-transparent to-accent-secondary-muted opacity-70"
        aria-hidden
      />
      <p className="relative text-sm font-semibold tracking-wide text-foreground">
        {label}
      </p>
      <p className="relative mt-1 max-w-xs text-xs leading-relaxed text-muted">
        {description}
      </p>
      <figcaption className="sr-only">
        Placeholder for future {label.toLowerCase()} photography.
      </figcaption>
    </figure>
  );
}
