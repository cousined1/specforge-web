import { buildMeta } from '@/components/seo/PageMeta';
import { company } from '@/config/site';
import ContactForm from '@/app/contact/ContactForm';

export const metadata = buildMeta({
  title: 'Request a Demo',
  description: 'Request a live demo of SpecGetter. See provenance tracking, policy enforcement, and OSS risk mapping in action.',
  canonical: '/request-demo/',
});

export default function RequestDemoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-6 md:py-24">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">Request a demo</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
          See how SpecGetter helps engineering teams track AI-generated code, map OSS dependencies, and enforce governance policies. We will respond within one business day.
        </p>
      </section>

      <section className="mt-12">
        <div className="rounded-2xl border border-surface bg-surface p-8">
          <ContactForm />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted">
            Prefer to email? Reach us at{' '}
            <a href="mailto:hello@developer312.com" className="text-primary hover:underline">
              {company.email}
            </a>{' '}
            or call{' '}
            <a href="tel:+15104011225" className="text-primary hover:underline">
              {company.phone}
            </a>.
          </p>
        </div>
      </section>
    </div>
  );
}
