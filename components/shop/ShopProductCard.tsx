import Image from "next/image";
import { SHOPIFY_STORE_URL } from "@/lib/shop-page";

type ShopProductCardProps = {
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  keyword?: string;
  priority?: boolean;
};

export function ShopProductCard({
  title,
  category,
  description,
  image,
  imageAlt,
  keyword,
  priority = false,
}: ShopProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card transition hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
      <div className="flex h-56 shrink-0 items-center justify-center bg-background p-4">
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-contain object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-secondary">
          {category}
        </p>
        {keyword ? (
          <p className="mt-0.5 text-[10px] font-medium text-muted">{keyword}</p>
        ) : null}
        <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {description}
        </p>
        <a
          href={SHOPIFY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background transition hover:bg-accent-hover"
        >
          View on Shopify
        </a>
      </div>
    </article>
  );
}
