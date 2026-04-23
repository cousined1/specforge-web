import { describe, it, expect } from 'vitest';
import { buildMeta } from './PageMeta';
import { company, metaDefaults } from '@/config/site';

describe('buildMeta', () => {
  it('returns the default absolute title when no title is supplied', () => {
    const meta = buildMeta();
    expect(meta.title).toEqual({ absolute: metaDefaults.defaultTitle });
    expect(meta.description).toBe(metaDefaults.defaultDescription);
  });

  it('returns a raw page title so the root titleTemplate composes the suffix', () => {
    const meta = buildMeta({ title: 'Pricing' });
    expect(meta.title).toBe('Pricing');
  });

  it('prefixes canonical with the configured base URL and sets alternates', () => {
    const meta = buildMeta({ canonical: '/pricing/' });
    expect(meta.alternates).toEqual({
      canonical: `${company.baseUrl}/pricing/`,
    });
  });

  it('omits alternates when no canonical is provided', () => {
    const meta = buildMeta();
    expect(meta.alternates).toBeUndefined();
  });

  it('adds robots noindex/nofollow when noindex is true', () => {
    const meta = buildMeta({ noindex: true });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it('omits robots when noindex is falsy', () => {
    const meta = buildMeta({});
    expect(meta.robots).toBeUndefined();
  });

  it('composes the pre-suffixed title in OpenGraph and Twitter for social previews', () => {
    const meta = buildMeta({ title: 'Contact' });
    const expected = `Contact | ${company.productName}`;
    expect(meta.openGraph?.title).toBe(expected);
    expect(meta.twitter?.title).toBe(expected);
  });

  it('falls back to the default title for OG/Twitter when no title supplied', () => {
    const meta = buildMeta();
    expect(meta.openGraph?.title).toBe(metaDefaults.defaultTitle);
    expect(meta.twitter?.title).toBe(metaDefaults.defaultTitle);
  });

  it('uses the default OG image when no override is provided', () => {
    const meta = buildMeta();
    const images = meta.openGraph?.images as Array<{ url: string; width?: number; height?: number }>;
    expect(images?.[0]?.url).toBe(metaDefaults.image);
    expect(images?.[0]?.width).toBe(1200);
    expect(images?.[0]?.height).toBe(630);
  });

  it('applies a custom OG image override', () => {
    const meta = buildMeta({ ogImage: '/custom.png' });
    const images = meta.openGraph?.images as Array<{ url: string }>;
    expect(images?.[0]?.url).toBe('/custom.png');
    expect(meta.twitter?.images).toEqual(['/custom.png']);
  });

  it('sets openGraph url to canonical when canonical is provided, otherwise to baseUrl', () => {
    expect(buildMeta({ canonical: '/x/' }).openGraph?.url).toBe(`${company.baseUrl}/x/`);
    expect(buildMeta({}).openGraph?.url).toBe(company.baseUrl);
  });

  it('exposes metadataBase as a URL built from company.baseUrl', () => {
    const meta = buildMeta();
    expect(meta.metadataBase).toBeInstanceOf(URL);
    const base = meta.metadataBase as URL;
    expect(base.origin).toBe(new URL(company.baseUrl).origin);
  });
});

