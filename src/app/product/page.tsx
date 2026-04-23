import { buildMeta } from '@/components/seo/PageMeta';
import Link from 'next/link';

export const metadata = buildMeta({
  title: 'Platform Overview',
  description: 'SpecGetter is a provenance and governance platform that helps teams track AI-generated code, map OSS dependencies, and enforce CI/CD policy rules.',
  canonical: '/product/',
});

export default function ProductPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">Platform Overview</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          SpecGetter gives engineering teams a single source of truth for what is in their software, where it came from, and whether it meets internal governance expectations.
        </p>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Feature title="AI Provenance" body="Tag and classify AI-generated code by model, prompt, and approver. Maintain an auditable trail of AI assistance across every commit and diff." />
        <Feature title="OSS Inventory" body="Map open-source dependencies, detect license conflicts, and flag unmaintained packages. Surface risk before it reaches production." />
        <Feature title="Policy Engine" body="Write governance rules that must pass before merge. Integrate with GitHub, GitLab, and Bitbucket to block policy violations at PR time." />
        <Feature title="CI/CD Integration" body="Inject policy checks into existing pipelines. Fail builds when provenance is missing, licenses are unapproved, or security thresholds are exceeded." />
        <Feature title="Audit Logging" body="Generate tamper-evident logs of every policy decision, code classification, and configuration change. Export for compliance review." />
        <Feature title="Role-Based Access" body="Configure teams, roles, and approval chains. Restrict sensitive operations and ensure changes are reviewed by the right people." />
      </section>

      <section className="mt-20 text-center">
        <Link href="/pricing/" className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-background hover:bg-secondary">View pricing</Link>
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
