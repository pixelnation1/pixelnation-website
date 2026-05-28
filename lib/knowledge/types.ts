import type { FaqItem } from "@/lib/seo/types";

export type KnowledgeCategorySlug =
  | "phone-repair"
  | "console-repair"
  | "computer-repair"
  | "data-recovery"
  | "microsoldering"
  | "board-repair"
  | "hdmi-repair"
  | "liquid-damage"
  | "training-education";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; id: string; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "highlightedAnswer"; question: string; answer: string }
  | { type: "pullQuote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "youtube"; videoId: string; title: string }
  | {
      type: "gallery";
      items: { before: string; after: string; alt: string }[];
    };

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type KnowledgeCategory = {
  slug: KnowledgeCategorySlug;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  serviceHref?: string;
  relatedTopics: string[];
};

export type KnowledgeArticle = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: KnowledgeCategorySlug;
  datePublished: string;
  dateModified?: string;
  image?: string;
  keywords: string[];
  /** Conversational / voice-search queries this article answers */
  conversationalQueries: string[];
  /** Direct answer for featured snippets and AEO */
  featuredAnswer: string;
  readTimeMinutes: number;
  featured?: boolean;
  popular?: boolean;
  relatedServicePaths: string[];
  relatedArticleSlugs: string[];
  faq: FaqItem[];
  content: ContentBlock[];
  authorName?: string;
};
