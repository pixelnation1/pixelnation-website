/**
 * Legacy blog registry for sitemap. New authority content lives in
 * `lib/knowledge/articles` under `/knowledge/[slug]`.
 */
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
};

export const BLOG_POSTS: BlogPost[] = [];
