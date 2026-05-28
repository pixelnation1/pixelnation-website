export { BLOG_POSTS, type BlogPost } from "@/lib/seo/blog";
export { getRelatedRepairLinks, RELATED_REPAIR_LINKS, type InternalLink } from "@/lib/seo/internal-links";
export { createPageMetadata, createPageMetadataFromLegacy } from "@/lib/seo/metadata";
export { getAllSitemapEntries, getSitemapUrls, PUBLIC_ROUTES, type SitemapEntry } from "@/lib/seo/routes";
export {
  articleSchema,
  breadcrumbListSchema,
  courseSchema,
  faqPageSchema,
  localBusinessForArea,
  localBusinessSchema,
  locationBreadcrumbs,
  organizationSchema,
  repairBreadcrumbs,
  repairServiceSchema,
  schemaAreaServedList,
  schemaCityArea,
  trainingBreadcrumbs,
  webSiteSchema,
} from "@/lib/seo/schema";
export {
  buildCanonical,
  CANONICAL_ORIGIN,
  DEFAULT_OG_IMAGE,
  pathFromCanonical,
  SEO_DEFAULTS,
} from "@/lib/seo/site-seo";
export type {
  AreaServedInput,
  ArticleSchemaInput,
  BreadcrumbItem,
  FaqItem,
  PageMetadataInput,
  RepairServiceSchemaInput,
} from "@/lib/seo/types";
