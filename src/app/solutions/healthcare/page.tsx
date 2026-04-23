import { buildMeta } from '@/components/seo/PageMeta';
import Link from 'next/link';

export const metadata = buildMeta({
  title: 'Healthcare Solutions',
  description: 'SpecForge helps healthcare technology teams maintain operational trust, change accountability, and governance rigor.',
  canonical: '/solutions/healthcare/',
});

export default function HealthcarePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">Healthcare</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Healthcare technology demands accountability at every layer. SpecForge helps teams track AI-generated logic, map dependencies, and enforce governance controls that support risk management and vendor assessments.
        </p>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <Feature title="Operational trust" body="Create an auditable record of what changed in systems that handle sensitive operations. Link every deployment to a policy decision and approver." />
        <Feature title="Change accountability" body="Know who authored, reviewed, and approved every change. Enforce separation of duties with role-based access and approval chains." />
        <Feature title="Governance rigor" body="Build governance frameworks that map to your internal risk model. Define checks for AI usage, OSS exposure, and security thresholds." />
        <Feature title="Procurement sensitivity" body="Provide procurement teams with clear visibility into third-party dependencies, AI assistance levels, and compliance posture." />
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
