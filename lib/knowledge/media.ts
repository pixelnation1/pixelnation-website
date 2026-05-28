import type { ContentBlock, KnowledgeCategorySlug } from "@/lib/knowledge/types";

/** Demo / placeholder IDs that must never render. */
const BLOCKED_YOUTUBE_VIDEO_IDS = new Set([
  "dQw4w9WgXcQ",
  "jNQXAC9IVRw",
  "oHg5SJYRHA0",
]);

/** Brand images — OK for cards/OG, not for in-article figures or galleries. */
export const PLACEHOLDER_CONTENT_IMAGE_PATHS = new Set([
  "/images/pixellogo.png",
  "/images/coverlogo.png",
]);

const CATEGORY_HERO_IMAGES: Partial<Record<KnowledgeCategorySlug, string>> = {
  "phone-repair": "/images/phonerepairlogo.png",
  "console-repair": "/images/gameconsolerepair2.png",
  "computer-repair": "/images/computerrepair.png",
  "data-recovery": "/images/datarecovery2.png",
  microsoldering: "/images/microsoldering.png",
  "board-repair": "/images/motherboardrepair2.png",
  "hdmi-repair": "/images/gameconsolerepair2.png",
  "liquid-damage": "/images/microsoldering.png",
  "training-education": "/images/boardrepair.png",
};

const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

export function isPlaceholderContentImage(src: string): boolean {
  return PLACEHOLDER_CONTENT_IMAGE_PATHS.has(src);
}

/** Validates a YouTube video ID from article content — no URLs, no demo IDs. */
export function parseApprovedYouTubeVideoId(videoId: string): string | null {
  const id = videoId.trim();
  if (!YOUTUBE_ID_PATTERN.test(id)) return null;
  if (BLOCKED_YOUTUBE_VIDEO_IDS.has(id)) return null;
  return id;
}

export function isApprovedYouTubeBlock(
  block: Extract<ContentBlock, { type: "youtube" }>,
): boolean {
  const id = parseApprovedYouTubeVideoId(block.videoId);
  if (!id) return false;
  return block.title.trim().length > 0;
}

function isApprovedGalleryBlock(
  block: Extract<ContentBlock, { type: "gallery" }>,
): boolean {
  const validItems = block.items.filter(
    (item) =>
      item.before !== item.after &&
      !isPlaceholderContentImage(item.before) &&
      !isPlaceholderContentImage(item.after) &&
      item.alt.trim().length > 0,
  );
  return validItems.length > 0;
}

function isApprovedImageBlock(
  block: Extract<ContentBlock, { type: "image" }>,
): boolean {
  if (isPlaceholderContentImage(block.src)) return false;
  return block.alt.trim().length > 0;
}

/** Strip invalid media blocks before render (defense in depth). */
export function sanitizeArticleContent(
  content: readonly ContentBlock[],
): ContentBlock[] {
  return content.flatMap((block): ContentBlock[] => {
    switch (block.type) {
      case "youtube":
        return isApprovedYouTubeBlock(block) ? [block] : [];
      case "gallery": {
        if (!isApprovedGalleryBlock(block)) return [];
        const items = block.items.filter(
          (item) =>
            item.before !== item.after &&
            !isPlaceholderContentImage(item.before) &&
            !isPlaceholderContentImage(item.after),
        );
        return items.length ? [{ ...block, items }] : [];
      }
      case "image":
        return isApprovedImageBlock(block) ? [block] : [];
      default:
        return [block];
    }
  });
}

export function resolveArticleHeroImage(
  image: string | undefined,
  category: KnowledgeCategorySlug,
): string | undefined {
  if (image && !isPlaceholderContentImage(image)) return image;
  return CATEGORY_HERO_IMAGES[category];
}
