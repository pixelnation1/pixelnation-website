import Image from "next/image";

type ServiceCardImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

/** Banner-style service graphics: full image visible, no crop, navy backdrop. */
export function ServiceCardImage({ src, alt, priority = false }: ServiceCardImageProps) {
  return (
    <div className="flex h-44 w-full shrink-0 items-center justify-center overflow-hidden rounded-t-2xl border-b border-card-border bg-background p-3 sm:h-48">
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    </div>
  );
}
