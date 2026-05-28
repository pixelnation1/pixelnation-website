import type { Metadata } from "next";
import { buildCanonical, DEFAULT_OG_IMAGE, SEO_DEFAULTS } from "@/lib/seo/site-seo";
import type { PageMetadataInput } from "@/lib/seo/types";

export function createPageMetadata(input: PageMetadataInput): Metadata {
  const canonical = buildCanonical(input.path);
  const ogImage = input.ogImage ?? DEFAULT_OG_IMAGE;
  const title = input.titleAbsolute ? { absolute: input.title } : input.title;

  return {
    title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical },
    robots: input.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    openGraph: {
      type: "website",
      locale: SEO_DEFAULTS.locale,
      siteName: SEO_DEFAULTS.siteName,
      title: input.title,
      description: input.description,
      url: canonical,
      images: [
        {
          url: ogImage,
          alt: `${SEO_DEFAULTS.siteName} — ${input.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [ogImage],
    },
  };
}

/** Map legacy `*_METADATA` objects that use `canonical` + optional `path`. */
export function createPageMetadataFromLegacy(meta: {
  title: string;
  description: string;
  path?: string;
  canonical?: string;
  ogImage?: string;
  titleAbsolute?: boolean;
  noIndex?: boolean;
}): Metadata {
  const path =
    meta.path ??
    (meta.canonical
      ? new URL(meta.canonical).pathname
      : "/");

  return createPageMetadata({
    title: meta.title,
    description: meta.description,
    path,
    ogImage: meta.ogImage,
    titleAbsolute: meta.titleAbsolute,
    noIndex: meta.noIndex,
  });
}
