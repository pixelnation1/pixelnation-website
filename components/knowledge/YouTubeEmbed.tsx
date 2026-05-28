import { parseApprovedYouTubeVideoId } from "@/lib/knowledge/media";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const approvedId = parseApprovedYouTubeVideoId(videoId);
  if (!approvedId) return null;

  const safeTitle = title.trim() || "PixelNation repair video";

  return (
    <figure className="overflow-hidden rounded-2xl border border-card-border">
      <div className="relative aspect-video w-full bg-background">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${approvedId}`}
          title={safeTitle}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <figcaption className="border-t border-card-border px-4 py-2 text-sm text-muted">
        {safeTitle}
      </figcaption>
    </figure>
  );
}
