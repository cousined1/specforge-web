import { buildMeta } from '@/components/seo/PageMeta';
import PricingClient from './PricingClient';

export const metadata = buildMeta({
  title: 'Pricing',
  description: 'SpecGetter pricing plans: Starter, Team, and Enterprise. Transparent billing. Monthly or annual options.',
  canonical: '/pricing/',
});

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <PricingClient />
    </div>
  );
}
