import { buildMeta } from '@/components/seo/PageMeta';

export const metadata = buildMeta({
  title: 'Sign up',
  description: 'Create a SpecForge account to start tracking provenance and governance across your software supply chain.',
  canonical: '/signup/',
  noindex: true,
});

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}

