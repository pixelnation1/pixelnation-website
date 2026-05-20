type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  alt?: boolean;
};

export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  alt = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-12 sm:py-16 md:py-20 ${alt ? "bg-card" : ""} ${className}`}
    >
      <div className="mx-auto max-w-6xl min-w-0 px-4">
        <div className="mb-6 max-w-2xl sm:mb-8 md:mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-base leading-relaxed text-muted">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
