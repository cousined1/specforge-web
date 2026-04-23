import { buildMeta } from '@/components/seo/PageMeta';
import { company } from '@/config/site';

export const metadata = buildMeta({
  title: 'Privacy Policy',
  description: `Privacy Policy for ${company.productName}. Operated by ${company.fullIdentity}.`,
  canonical: '/privacy/',
});

export default function PrivacyPage() {
  const effectiveDate = 'April 20, 2026';

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <article className="prose prose-invert max-w-none">
        <h1>Privacy Policy</h1>
        <p className="text-muted">Effective date: {effectiveDate}</p>

        <p>
          {company.fullIdentity} (“we,” “us,” or “our”) operates {company.productName} (“the Service”). This Privacy Policy explains how we collect, use, store, and protect your personal information.
        </p>

        <h2>1. Information we collect</h2>
        <p>
          We collect information you provide directly, such as your name, email address, and billing details. We also collect technical information including IP addresses, browser types, and usage data.
        </p>

        <h2>2. How we use your information</h2>
        <p>
          We use your information to provide and improve the Service, process payments, communicate with you, and comply with legal obligations. We do not sell your personal information.
        </p>

        <h2>3. Data storage and security</h2>
        <p>
          We use commercially reasonable safeguards to protect your data. Data is stored on infrastructure provided by our hosting partners, with encryption in transit and at rest where applicable.
        </p>

        <h2>4. Cookies and tracking</h2>
        <p>
          We use essential cookies to operate the Service and analytics cookies to understand usage. You can control cookie preferences through your browser settings.
        </p>

        <h2>5. Third-party services</h2>
        <p>
          We use Stripe for billing processing and InsForge for backend infrastructure. These providers have their own privacy policies and are bound by data processing agreements where applicable.
        </p>

        <h2>6. Data retention</h2>
        <p>
          We retain your data for as long as your account is active or as needed to provide the Service. You may request deletion of your account and associated data by contacting us.
        </p>

        <h2>7. Your rights</h2>
        <p>
          Depending on your jurisdiction, you may have rights to access, correct, or delete your personal information. Contact us to exercise these rights.
        </p>

        <h2>8. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post the updated policy on this page with a new effective date.
        </p>

        <h2>9. Contact</h2>
        <p>
          For privacy-related questions or requests, contact us at {company.email} or {company.phone}.
        </p>
      </article>
    </div>
  );
}
