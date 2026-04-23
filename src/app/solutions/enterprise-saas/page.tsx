import { buildMeta } from '@/components/seo/PageMeta';
import Link from 'next/link';

export const metadata = buildMeta({
  title: 'Enterprise SaaS Solutions',
  description: 'SpecGetter helps enterprise SaaS companies maintain customer trust, SOC2-adjacent governance, and AI change visibility.',
  canonical: '/solutions/enterprise-saas/',
});

export default function EnterpriseSaaSPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">Enterprise SaaS</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Enterprise SaaS buyers expect transparency. SpecGetter helps vendors prove what is in their software, how it is governed, and who is accountable for change.
        </p>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <Feature title="Customer trust" body="Share a public-facing provenance report with prospects and customers. Show what AI-generated components exist, what OSS is included, and what policies are enforced." />
        <Feature title="SOC2-adjacent readiness" body="Document the controls your engineering team already uses. Export evidence for compliance questionnaires without duplicating work." />
        <Feature title="AI change visibility" body="When AI assists development, buyers want to know. SpecGetter surfaces AI usage by feature, model, and time range." />
        <Feature title="Release governance" body="Gate releases with policy checks that verify provenance, license approval, and security thresholds before shipping to customers." />
      </section>

      <section className="mt-16">
        <Link href="/contact/" className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-background hover:bg-secondary">Talk to sales</Link>
      </section>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-surface bg-surface p-6">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
