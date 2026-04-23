import { buildMeta } from '@/components/seo/PageMeta';
import Link from 'next/link';

export const metadata = buildMeta({
  title: 'OSS Supply Chain Risk Explainer',
  description: 'Map open-source dependencies, detect license conflicts, and flag security risks before they reach production.',
  canonical: '/oss-supply-chain/',
});

export default function OSSSupplyChainPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">OSS supply chain risk</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Modern software is built on open-source foundations. That creates speed—and risk. SpecForge helps teams see what they depend on, what those dependencies depend on, and whether any of it introduces liability.
        </p>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <Feature title="Dependency inventory" body="Automatically map the full dependency tree across repositories. Surface transitive dependencies that would otherwise go unnoticed in manual reviews." />
        <Feature title="License conflict detection" body="Compare open-source licenses against your internal approval list. Flag copyleft, unapproved, or ambiguous licenses before they enter your codebase." />
        <Feature title="Deprecation and maintenance flags" body="Detect unmaintained packages, outdated versions, and packages with known security advisories. Prioritize remediation by blast radius." />
        <Feature title="CI/CD integration" body="Run supply chain checks in your build pipeline. Fail the build when a dependency violates policy, and surface remediation steps to the developer." />
      </section>

      <section className="mt-16">
        <Link href="/product/" className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-background hover:bg-secondary">Explore the platform</Link>
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
