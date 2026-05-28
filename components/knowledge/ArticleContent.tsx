import Image from "next/image";
import type { ContentBlock } from "@/lib/knowledge/types";
import { BeforeAfterGallery } from "./BeforeAfterGallery";
import { HighlightedAnswer } from "./HighlightedAnswer";
import { PullQuote } from "./PullQuote";
import { YouTubeEmbed } from "./YouTubeEmbed";

type ArticleContentProps = {
  content: readonly ContentBlock[];
};

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
            return (
              <figure key={index} className="overflow-hidden rounded-2xl border border-card-border">
                <div className="relative aspect-video w-full bg-background">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="border-t border-card-border px-4 py-2 text-sm text-muted">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "youtube":
            return (
              <YouTubeEmbed key={index} videoId={block.videoId} title={block.title} />
            );
          case "gallery":
            return <BeforeAfterGallery key={index} items={block.items} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
