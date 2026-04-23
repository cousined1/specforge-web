import { buildMeta } from '@/components/seo/PageMeta';
import Link from 'next/link';

export const metadata = buildMeta({
  title: 'FinTech Solutions',
  description: 'SpecGetter helps FinTech companies maintain auditability, change control, and vendor scrutiny across their software supply chain.',
  canonical: '/solutions/fintech/',
});

export default function FinTechPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">FinTech</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          FinTech moves fast—but regulators expect proof. SpecGetter helps FinTech teams maintain audit trails, enforce change control, and document what shipped and why.
        </p>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <Feature title="Auditability" body="Every commit, policy check, and classification is logged in a tamper-evident audit trail. Export records for regulatory review or internal governance audits." />
        <Feature title="Change control" body="Block merges that bypass approval chains. Ensure policy checks run before code reaches production. Document who reviewed what and when." />
        <Feature title="Vendor scrutiny" body="Inventory third-party and open-source components. Flag license conflicts, deprecated packages, and known security issues before they enter your stack." />
        <Feature title="Regulated workflows" body="Configure approval chains and role-based access that align with your internal risk and compliance framework." />
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
