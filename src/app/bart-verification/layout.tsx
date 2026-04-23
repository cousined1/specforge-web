import { buildMeta } from '@/components/seo/PageMeta';

export const metadata = buildMeta({
  title: 'BART verification (preview)',
  description: 'Preview of the SpecGetter BART verification checkpoints. Not yet available.',
  canonical: '/bart-verification/',
  noindex: true,
});

export default function BARTVerificationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
