import Image from "next/image";
import { isPlaceholderContentImage } from "@/lib/knowledge/media";

type GalleryItem = {
  before: string;
  after: string;
  alt: string;
};

type BeforeAfterGalleryProps = {
  items: GalleryItem[];
};

export function BeforeAfterGallery({ items }: BeforeAfterGalleryProps) {
  const validItems = items.filter(
    (item) =>
      item.before !== item.after &&
      !isPlaceholderContentImage(item.before) &&
      !isPlaceholderContentImage(item.after) &&
      item.alt.trim().length > 0,
  );

  if (!validItems.length) return null;

  return (
    <div className="space-y-6" role="group" aria-label="Before and after repair gallery">
      {validItems.map((item, index) => (
        <figure
          key={index}
          className="grid gap-4 rounded-2xl border border-card-border bg-card p-4 sm:grid-cols-2"
        >
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Before
            </p>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-background">
              <Image
                src={item.before}
                alt={`${item.alt} — before repair`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 640px) 100vw, 400px"
              />
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
              After
            </p>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-background">
              <Image
                src={item.after}
                alt={`${item.alt} — after repair`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 640px) 100vw, 400px"
              />
            </div>
          </div>
          <figcaption className="text-sm text-muted sm:col-span-2">{item.alt}</figcaption>
        </figure>
      ))}
    </div>
  );
}
