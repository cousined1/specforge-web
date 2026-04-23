import { buildMeta } from '@/components/seo/PageMeta';

export const metadata = buildMeta({
  title: 'BART task graph (preview)',
  description: 'Preview of the SpecGetter BART task graph. Not yet available.',
  canonical: '/bart-task-graph/',
  noindex: true,
});

export default function BARTTaskGraphLayout({ children }: { children: React.ReactNode }) {
  return children;
}
