import { SHOPIFY_STORE_URL } from "@/lib/shop";

type ShopifyButtonProps = {
  children: React.ReactNode;
  ariaLabel: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

const variants = {
  primary:
    "bg-accent text-background hover:bg-accent-hover shadow-lg shadow-accent/25",
  secondary:
    "bg-card border border-accent-secondary/40 text-foreground hover:border-accent-secondary hover:text-accent-secondary",
  outline:
    "border border-card-border text-foreground hover:border-accent-secondary hover:text-accent-secondary",
} as const;

export function ShopifyButton({
  children,
  ariaLabel,
  variant = "primary",
  className = "",
}: ShopifyButtonProps) {
  return (
    <a
      href={SHOPIFY_STORE_URL}
      className={`inline-flex min-h-11 w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors sm:w-auto ${variants[variant]} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
