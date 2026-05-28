import type { ContentBlock } from "@/lib/knowledge/types";
import { KnowledgeArticleImage } from "@/components/knowledge/KnowledgeArticleImage";
import {
  isApprovedYouTubeBlock,
  isPlaceholderContentImage,
  parseApprovedYouTubeVideoId,
} from "@/lib/knowledge/media";
import { BeforeAfterGallery } from "./BeforeAfterGallery";
import { HighlightedAnswer } from "./HighlightedAnswer";
import { PullQuote } from "./PullQuote";
import { YouTubeEmbed } from "./YouTubeEmbed";

type ArticleContentProps = {
  content: readonly ContentBlock[];
};

function isValidGalleryBlock(
  block: Extract<ContentBlock, { type: "gallery" }>,
): boolean {
  return block.items.some(
    (item) =>
      item.before !== item.after &&
      !isPlaceholderContentImage(item.before) &&
      !isPlaceholderContentImage(item.after),
  );
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="knowledge-prose space-y-6">
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="text-base leading-relaxed text-muted sm:text-lg">
                {block.text}
              </p>
            );
          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={index}
                  id={block.id}
                  className="scroll-mt-28 pt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <h3
                key={index}
                id={block.id}
                className="scroll-mt-28 pt-2 text-xl font-semibold text-foreground"
              >
                {block.text}
              </h3>
            );
          case "list":
            if (block.ordered) {
              return (
                <ol
                  key={index}
                  className="list-decimal space-y-2 pl-6 text-base leading-relaxed text-muted sm:text-lg"
                >
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              );
            }
            return (
              <ul
                key={index}
                className="list-disc space-y-2 pl-6 text-base leading-relaxed text-muted sm:text-lg"
              >
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case "highlightedAnswer":
            return (
              <HighlightedAnswer
                key={index}
                question={block.question}
                answer={block.answer}
              />
            );
          case "pullQuote":
            return (
              <PullQuote
                key={index}
                text={block.text}
                attribution={block.attribution}
              />
            );
          case "image":
            if (isPlaceholderContentImage(block.src)) return null;
            return (
              <KnowledgeArticleImage
                key={index}
                src={block.src}
                alt={block.alt}
                caption={block.caption}
                variant="content"
              />
            );
          case "youtube":
            if (!isApprovedYouTubeBlock(block)) return null;
            if (!parseApprovedYouTubeVideoId(block.videoId)) return null;
            return (
              <YouTubeEmbed key={index} videoId={block.videoId} title={block.title} />
            );
          case "gallery":
            if (!isValidGalleryBlock(block)) return null;
            return (
              <BeforeAfterGallery
                key={index}
                items={block.items.filter(
                  (item) =>
                    item.before !== item.after &&
                    !isPlaceholderContentImage(item.before) &&
                    !isPlaceholderContentImage(item.after),
                )}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
