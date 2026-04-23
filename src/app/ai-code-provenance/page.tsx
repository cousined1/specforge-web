import { buildMeta } from '@/components/seo/PageMeta';
import Link from 'next/link';

export const metadata = buildMeta({
  title: 'AI Code Provenance Explainer',
  description: 'Understand AI code provenance and why engineering teams need to track what AI generated, when, and with what model.',
  canonical: '/ai-code-provenance/',
});

export default function AICodeProvenancePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">AI code provenance</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          When AI generates code, someone still owns the outcome. AI code provenance means knowing what was generated, by which model, from what prompt, and who reviewed it.
        </p>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <Feature title="What is AI code provenance?" body="It is the practice of attributing code changes to a specific model, prompt, and human reviewer. Provenance creates accountability in a world where code can be written by machines." />
        <Feature title="Why it matters" body="Organizations need to know what AI is doing in their codebase. Provenance supports security reviews, IP management, and governance workflows that assume human authorship by default." />
        <Feature title="How SpecGetter tracks it" body="SpecGetter tags AI-generated diffs by model, prompt, and approver. It links every generated change to a decision chain so teams can review, audit, and govern AI usage." />
        <Feature title="Getting started" body="Connect your Git provider, configure a policy rule, and enable AI provenance tagging. SpecGetter begins classifying diffs automatically as teams commit and merge." />
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
