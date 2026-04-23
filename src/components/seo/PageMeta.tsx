import { Metadata } from 'next';
import { company, metaDefaults } from '@/config/site';

export interface PageMetaInput {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function buildMeta(input: PageMetaInput = {}): Metadata {
  const pageTitle = input.title ?? undefined;
  const fullTitle = pageTitle ? `${pageTitle} | ${company.productName}` : metaDefaults.defaultTitle;
  const description = input.description || metaDefaults.defaultDescription;
  const canonical = input.canonical ? `${company.baseUrl}${input.canonical}` : undefined;
  const ogImage = input.ogImage || metaDefaults.image;

  return {
    title: pageTitle ?? { absolute: metaDefaults.defaultTitle },
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(input.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || company.baseUrl,
      siteName: company.productName,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    metadataBase: new URL(company.baseUrl),
  };
}
