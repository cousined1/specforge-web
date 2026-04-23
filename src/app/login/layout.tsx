import { buildMeta } from '@/components/seo/PageMeta';

export const metadata = buildMeta({
  title: 'Log in',
  description: 'Log in to your SpecGetter account.',
  canonical: '/login/',
  noindex: true,
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

