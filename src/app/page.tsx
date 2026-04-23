import { buildMeta } from '@/components/seo/PageMeta';
import { company } from '@/config/site';
import Link from 'next/link';

export const metadata = buildMeta({
  title: 'Software Provenance & Governance',
  description:
    'SpecGetter helps engineering teams track AI-generated code, map open-source components, and enforce governance policies across the software supply chain.',
  canonical: '/',
});

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
          Software provenance and governance for modern engineering teams
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-loose text-muted md:text-xl md:leading-loose">
          Document what AI generated. Map open-source exposure. Enforce policy before it ships. SpecGetter gives teams visibility into the software supply chain so you can ship with confidence.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup/"
            className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-background hover:bg-secondary"
          >
            Get started
          </Link>
          <Link
            href="/product/"
            className="rounded-md border border-surface px-6 py-3 text-base font-medium text-white hover:border-accent"
          >
            Explore the platform
          </Link>
        </div>
      </section>

      <section className="mt-20 grid gap-8 md:grid-cols-3">
        <FeatureCard
          title="Provenance tracking"
          body="Know which changes came from AI assistance versus human authors. SpecGetter tags AI-generated diffs and links them back to prompts, models, and approval chains."
        />
        <FeatureCard
          title="OSS risk mapping"
          body="Automatically inventory open-source packages, detect license conflicts, and flag deprecated or unmaintained dependencies before they reach production."
        />
        <FeatureCard
          title="Policy enforcement"
          body="Define governance rules for code review, licensing, security scanning, and provenance requirements. Block merges that violate policy."
        />
      </section>

      <section className="mt-20">
        <div className="rounded-2xl border border-surface bg-surface p-8 md:p-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Built for teams that ship fast—and need to ship responsibly.
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            SpecGetter integrates into Git-based workflows and CI/CD pipelines. It surfaces provenance at every commit, validates governance rules at pull request time, and creates an auditable record of what reached production and why.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/ai-code-provenance/" className="text-primary hover:underline">Learn about AI code provenance →</Link>
            <Link href="/oss-supply-chain/" className="text-primary hover:underline">Explore OSS supply chain risk →</Link>
          </div>
        </div>
      </section>

      <section className="mt-20 text-center">
        <h2 className="text-2xl font-bold text-white">Ready to see what is in your codebase?</h2>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup/" className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-background hover:bg-secondary">
            Start free trial
          </Link>
          <Link href="/contact/" className="rounded-md border border-surface px-6 py-3 text-base font-medium text-white hover:border-accent">
            Talk to sales
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted">
          No credit card required. {company.fullIdentity}
        </p>
      </section>
    </div>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-surface bg-surface p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
