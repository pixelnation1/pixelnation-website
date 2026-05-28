import type { ContentBlock, TocItem } from "@/lib/knowledge/types";

export function extractTocFromContent(content: readonly ContentBlock[]): TocItem[] {
  return content
    .filter((block): block is Extract<ContentBlock, { type: "heading" }> => block.type === "heading")
    .map((block) => ({
      id: block.id,
      text: block.text,
      level: block.level,
    }));
}
