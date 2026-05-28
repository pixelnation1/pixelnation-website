import Image from "next/image";

type KnowledgeArticleImageProps = {
  src: string;
  alt: string;
  caption?: string;
  /** `card` — hub/related previews; `content` — in-article figure */
  variant?: "content" | "card";
  priority?: boolean;
};

const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px";
const CONTENT_SIZES = "(max-width: 768px) 100vw, 720px";

export function KnowledgeArticleImage({
  src,
  alt,
  caption,
  variant = "content",
  priority = false,
}: KnowledgeArticleImageProps) {
  const isCard = variant === "card";

  const image = (
    <div className="relative aspect-video w-full bg-background">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-center p-2 sm:p-4"
        sizes={isCard ? CARD_SIZES : CONTENT_SIZES}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
      />
    </div>
  );

  if (isCard) {
    return image;
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-card-border">
      {image}
      {caption ? (
        <figcaption className="border-t border-card-border px-4 py-2 text-sm text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
