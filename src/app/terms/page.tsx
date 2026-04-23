import { buildMeta } from '@/components/seo/PageMeta';
import { company } from '@/config/site';

export const metadata = buildMeta({
  title: 'Terms of Service',
  description: `Terms of Service for ${company.productName}. Operated by ${company.fullIdentity}.`,
  canonical: '/terms/',
});

export default function TermsPage() {
  const effectiveDate = 'April 20, 2026';

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <article className="prose prose-invert max-w-none">
        <h1>Terms of Service</h1>
        <p className="text-muted">Effective date: {effectiveDate}</p>

        <p>
          These Terms of Service (“Terms”) govern your access to and use of {company.productName} (“the Service”), operated by {company.fullIdentity} (“we,” “us,” or “our”). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
        </p>

        <h2>1. Service description</h2>
        <p>
          SpecForge is a software provenance and governance platform that helps organizations track AI-generated code, inventory open-source dependencies, and enforce internal policy rules. The Service is provided on an “as is” and “as available” basis.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          You must be at least 18 years old and capable of forming a binding contract to use the Service. If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization.
        </p>

        <h2>3. Accounts and security</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately of any unauthorized use.
        </p>

        <h2>4. Acceptable use</h2>
        <p>
          You agree not to: (a) reverse engineer the Service; (b) use the Service to violate any law; (c) interfere with the integrity or performance of the Service; (d) attempt to gain unauthorized access to the Service or its systems.
        </p>

        <h2>5. Fees and billing</h2>
        <p>
          Subscriptions renew automatically until canceled. Taxes may apply unless otherwise stated. Plan features and usage limits are defined in the product or order form. Enterprise plans may require a custom order form or MSA. Stripe processes billing information.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          You retain ownership of any data you submit to the Service. We retain ownership of the Service, including all code, designs, and trademarks. You are granted a limited, non-exclusive, non-transferable license to use the Service during the term of your subscription.
        </p>

        <h2>7. Disclaimer of warranties</h2>
        <p>
          The Service is provided without warranties of any kind, express or implied. We do not guarantee that the Service will be uninterrupted, secure, or error-free. Nothing on this site constitutes legal advice or a guarantee of compliance readiness.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, our liability is limited to the amount you paid for the Service in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.
        </p>

        <h2>9. Termination</h2>
        <p>
          We may suspend or terminate your access if you violate these Terms. You may cancel your subscription at any time. Fees paid are non-refundable unless required by law.
        </p>

        <h2>10. Governing law</h2>
        <p>
          These Terms are governed by the laws of the State of California, without regard to conflict of law principles.
        </p>

        <h2>11. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. We will post the updated Terms on this page with a new effective date. Your continued use of the Service after changes constitutes acceptance.
        </p>

        <h2>12. Contact</h2>
        <p>
          For questions about these Terms, contact us at {company.email} or {company.phone}.
        </p>
      </article>
    </div>
  );
}
