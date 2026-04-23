import { buildMeta } from '@/components/seo/PageMeta';

export const metadata = buildMeta({
  title: 'BART escalations (preview)',
  description: 'Preview of the SpecGetter BART escalation queue. Not yet available.',
  canonical: '/bart-escalations/',
  noindex: true,
});

export default function BARTEscalationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
