type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-card-border">
      <div className="relative aspect-video w-full bg-background">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading="lazy"
        />
      </div>
      <figcaption className="border-t border-card-border px-4 py-2 text-sm text-muted">
        {title}
      </figcaption>
    </figure>
  );
}
