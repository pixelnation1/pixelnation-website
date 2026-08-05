"use client";

import Image from "next/image";
import { useState } from "react";

type TradeProductImageProps = {
  src?: string | null;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  itemId?: string;
};

function isUsableTradeImage(src?: string | null): src is string {
  if (!src?.trim()) return false;
  if (src.includes("pixellogo")) return false;
  return true;
}

export function TradeProductImage({
  src,
  alt,
  priority = false,
  className = "object-contain object-center p-5",
  sizes = "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw",
  itemId,
}: TradeProductImageProps) {
  const usable = isUsableTradeImage(src);
  const imageSrc = usable ? src : "";
  const [failed, setFailed] = useState(!usable);

  if (failed || !imageSrc) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#f7f9fc] px-4 text-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="text-[#7a8fa3]"
        >
          <rect
            x="3"
            y="6"
            width="18"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="12" r="1.5" fill="currentColor" />
          <circle cx="16" cy="12" r="1.5" fill="currentColor" />
          <path
            d="M10 12h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-xs font-medium text-[#5b7285]">Image coming soon</p>
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => {
        if (process.env.NODE_ENV === "development") {
          console.warn("[trade-image] failed to load", itemId ?? alt, imageSrc);
        }
        setFailed(true);
      }}
    />
  );
}
