export type FaqItem = {
  question: string;
  answer: string;
};

export type BreadcrumbItem = {
  name: string;
  path?: string;
};

export type AreaServedInput = {
  cityName: string;
  stateName?: string;
};

export type RepairServiceSchemaInput = {
  name: string;
  description: string;
  serviceType: string;
  path: string;
  /** Optional catalog of sub-services for rich results */
  offers?: { name: string; description: string }[];
  /** Override default Emporia areaServed for local landing pages */
  areaServed?: AreaServedInput | readonly AreaServedInput[];
};

export type ArticleSchemaInput = {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
};

export type PageMetadataInput = {
  title: string;
  description: string;
  /** App route, e.g. `/computer-repair` */
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
  /** Use when title should not use the layout template suffix */
  titleAbsolute?: boolean;
  noIndex?: boolean;
  keywords?: string[];
};
