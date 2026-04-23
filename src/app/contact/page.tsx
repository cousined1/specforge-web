import { buildMeta } from '@/components/seo/PageMeta';
import { company } from '@/config/site';
import ContactForm from './ContactForm';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = buildMeta({
  title: 'Contact',
  description: 'Contact SpecGetter by Developer312, a subsidiary of NIGHT LITE USA LLC. Email hello@developer312.com or call (510) 401-1225.',
  canonical: '/contact/',
});

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact SpecGetter',
    url: `${company.baseUrl}/contact/`,
    mainEntity: {
      '@type': 'Organization',
      name: company.name,
      telephone: company.phone,
      email: company.email,
      url: company.baseUrl,
      parentOrganization: {
        '@type': 'Organization',
        name: 'NIGHT LITE USA LLC',
      },
    },
  };

  return (
    <>
      <JsonLd id="ld-contact" data={contactSchema} />
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <section>
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">Contact</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Reach out for sales, support, or general inquiries. We respond within one business day.
          </p>
        </section>

        <section className="mt-12 grid gap-12 md:grid-cols-2">
          <div className="max-w-xl">
            <div className="rounded-xl border border-surface bg-surface p-6">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Other ways to reach us</h2>
              <div className="mt-4 space-y-3 text-sm text-muted">
                <p>
                  <span className="font-medium text-accent">Email:</span>{' '}
                  <a href="mailto:hello@developer312.com" className="text-primary hover:underline">
                    hello@developer312.com
                  </a>
                </p>
                <p>
                  <span className="font-medium text-accent">Phone:</span>{' '}
                  <a href="tel:+15104011225" className="text-primary hover:underline">
                    (510) 401-1225
                  </a>
                </p>
                <p>
                  <span className="font-medium text-accent">Company:</span>{' '}
                  Developer312, a subsidiary of NIGHT LITE USA LLC
                </p>
                <p>
                  <span className="font-medium text-accent">Hours:</span>{' '}
                  Monday–Friday, 9:00 AM – 5:00 PM PT
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-surface bg-surface p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                For legal and privacy inquiries
              </h3>
              <p className="mt-2 text-sm text-muted">
                Email <a href="mailto:hello@developer312.com" className="text-primary hover:underline">hello@developer312.com</a> with &ldquo;Legal&rdquo; in the subject line.
              </p>
              <p className="mt-4 text-sm text-muted">
                To report a security issue, include &ldquo;Security&rdquo; in the subject line.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
