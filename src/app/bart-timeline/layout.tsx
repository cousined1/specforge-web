import { buildMeta } from '@/components/seo/PageMeta';

export const metadata = buildMeta({
  title: 'BART timeline (preview)',
  description: 'Preview of the SpecGetter BART execution timeline. Not yet available.',
  canonical: '/bart-timeline/',
  noindex: true,
});

export default function BARTTimelineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
