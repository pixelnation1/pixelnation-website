import Image from "next/image";

type GalleryItem = {
  before: string;
  after: string;
  alt: string;
};

type BeforeAfterGalleryProps = {
  items: GalleryItem[];
};

export function BeforeAfterGallery({ items }: BeforeAfterGalleryProps) {
  return (
    <div className="space-y-6" role="group" aria-label="Before and after repair gallery">
      {items.map((item, index) => (
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
          <figcaption className="sm:col-span-2 text-sm text-muted">{item.alt}</figcaption>
        </figure>
      ))}
    </div>
  );
}
