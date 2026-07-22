import Image from "next/image";
import type { TcgImage } from "@/lib/tcg/types";

type ProductImageGridProps = {
  images: readonly TcgImage[];
  /** Grid columns at large breakpoint (default 4) */
  columns?: 3 | 4;
  className?: string;
};

/**
 * Responsive grid of product photography. Images are contained (never
 * stretched or cropped) on a light backdrop so boxed products read clearly.
 */
export function ProductImageGrid({
  images,
  columns = 4,
  className = "",
}: ProductImageGridProps) {
  const lgCols = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <ul className={`grid grid-cols-2 gap-4 sm:grid-cols-3 ${lgCols} ${className}`}>
      {images.map((image) => (
        <li
          key={image.src}
          className="relative aspect-square overflow-hidden rounded-xl border border-card-border bg-white"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain p-3"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  );
}
