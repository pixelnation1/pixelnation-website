import { ProductImage } from "@/components/shop/ProductImage";
import { ShopifyButton } from "@/components/shop/ShopifyButton";
import { resolveShopImage, type ShopProductCard as ShopProductCardData } from "@/lib/shop";

type ShopProductCardProps = {
  product: ShopProductCardData;
  priorityImage?: boolean;
};

export function ShopProductCard({ product, priorityImage }: ShopProductCardProps) {
  const imageSrc = resolveShopImage(product.imageStem);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card transition hover:border-accent-secondary/50">
      <div className="relative aspect-[4/3] border-b border-card-border bg-background/60">
        <ProductImage
          src={imageSrc}
          alt={product.imageAlt}
          priority={priorityImage}
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-foreground">{product.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {product.description}
        </p>
        <div className="mt-5">
          <ShopifyButton
            ariaLabel={`Shop ${product.title} on the PixelNation Shopify store`}
          >
            Shop on Shopify
          </ShopifyButton>
        </div>
      </div>
    </article>
  );
}
