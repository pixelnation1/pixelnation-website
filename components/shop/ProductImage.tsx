"use client";

import Image from "next/image";
import { useState } from "react";
import { SHOP_IMAGE_FALLBACK } from "@/lib/shop";

type ProductImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
};

function fallbackChain(src: string): string[] {
  const chain = [src];
  if (src.endsWith(".jpg")) chain.push(src.replace(/\.jpg$/, ".png"));
  if (!chain.includes(SHOP_IMAGE_FALLBACK)) chain.push(SHOP_IMAGE_FALLBACK);
  return chain;
}

export function ProductImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: ProductImageProps) {
  const [index, setIndex] = useState(0);
  const candidates = fallbackChain(src);
  const currentSrc = candidates[Math.min(index, candidates.length - 1)]!;

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      className="object-contain object-center p-3"
      sizes={sizes}
      priority={priority}
      onError={() => {
        setIndex((current) =>
          current < candidates.length - 1 ? current + 1 : current,
        );
      }}
    />
  );
}
