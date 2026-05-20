import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent-hover shadow-lg shadow-accent/25",
  secondary:
    "bg-card border border-accent-secondary/40 text-foreground hover:border-accent-secondary hover:text-accent-secondary",
  outline:
    "border border-card-border text-foreground hover:border-accent-secondary hover:text-accent-secondary",
};

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
  ariaLabel,
}: ButtonProps) {
  const classes = `inline-flex min-h-11 w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors sm:w-auto ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
