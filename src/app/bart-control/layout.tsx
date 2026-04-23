import { buildMeta } from '@/components/seo/PageMeta';

export const metadata = buildMeta({
  title: 'BART control panel (preview)',
  description: 'Preview of the SpecForge BART execution control panel. Not yet available.',
  canonical: '/bart-control/',
  noindex: true,
});

export default function BARTControlLayout({ children }: { children: React.ReactNode }) {
  return children;
}
