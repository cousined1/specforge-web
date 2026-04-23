import { buildMeta } from '@/components/seo/PageMeta';
import Link from 'next/link';

export const metadata = buildMeta({
  title: 'Compliance & Governance Overview',
  description: 'SpecGetter helps organizations govern software change with policy enforcement, audit trails, and OSS risk mapping.',
  canonical: '/compliance/',
});

export default function CompliancePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">Compliance &amp; governance</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Software governance is not a compliance checkbox—it is a continuous practice. SpecGetter helps teams define policies, enforce checks, and keep records that stand up to scrutiny.
        </p>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <Feature title="Policy definition" body="Write governance rules for AI usage, OSS licensing, security thresholds, and provenance requirements. Version policies and track changes over time." />
        <Feature title="Enforcement at merge" body="Integrate policy checks into GitHub, GitLab, and Bitbucket PR workflows. Block merges that violate policy until they are reviewed." />
        <Feature title="Audit trails" body="Generate tamper-evident logs of every policy decision, code classification, and configuration change. Export to external systems for compliance review." />
        <Feature title="OSS license mapping" body="Inventory open-source packages and surface license conflicts. Flag unapproved licenses before they are merged into production code." />
      </section>

      <section className="mt-16">
        <Link href="/pricing/" className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-background hover:bg-secondary">See plans</Link>
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
