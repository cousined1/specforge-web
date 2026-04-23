'use client';

import { useState } from 'react';
import { useCookieConsent, type CookieCategory } from '@/contexts/CookieConsentContext';
import Link from 'next/link';

interface CookieConsentBannerProps {
  privacyPolicyUrl?: string;
}

export default function CookieConsentBanner({ privacyPolicyUrl = '/privacy/' }: CookieConsentBannerProps) {
  const { hasConsented, acceptAll, rejectAll, updateConsent } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);

  if (hasConsented) return null;

  const categories: { key: CookieCategory; label: string; description: string; required: boolean }[] = [
    {
      key: 'necessary',
      label: 'Necessary',
      description: 'Essential cookies that enable core functionality like authentication, security, and accessibility. These cannot be disabled.',
      required: true,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      description: 'Help us understand how visitors interact with our site by collecting anonymous usage data. This helps us improve the platform.',
      required: false,
    },
    {
      key: 'marketing',
      label: 'Marketing',
      description: 'Used to track visitors across websites for advertising purposes. We do not currently use marketing cookies.',
      required: false,
    },
    {
      key: 'preferences',
      label: 'Preferences',
      description: 'Enable personalized features like language preferences and theme settings.',
      required: false,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:mx-6 lg:mx-auto lg:max-w-4xl"
    >
      <div className="rounded-xl border border-surface bg-surface shadow-2xl">
        <div className="p-6">
          <h2 id="cookie-consent-title" className="text-xl font-semibold text-white mb-2">
            We value your privacy
          </h2>
          <p className="text-sm text-muted mb-6">
            We use cookies to enhance your experience. You can choose which categories of cookies you want to allow.
          </p>

          {showPreferences ? (
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.key} className="flex items-start gap-3">
                  <div className="mt-1">
                    <input
                      type="checkbox"
                      id={`cookie-${cat.key}`}
                      checked={cat.required ? true : false}
                      disabled={cat.required}
                      onChange={(e) => {
                        if (!cat.required) {
                          updateConsent({ [cat.key]: e.target.checked });
                        }
                      }}
                      className="h-4 w-4 rounded border-surface bg-background text-accent focus:ring-accent disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor={`cookie-${cat.key}`} className="text-sm font-medium text-white cursor-pointer">
                      {cat.label}
                      {cat.required && (
                        <span className="ml-2 text-xs text-muted">(always on)</span>
                      )}
                    </label>
                    <p className="text-xs text-muted mt-0.5">{cat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className={`mt-6 flex flex-col gap-3 sm:flex-row sm:items-center ${showPreferences ? '' : 'justify-end'}`}>
            {showPreferences ? (
              <>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-4 py-2 text-sm font-medium text-accent hover:text-white transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    updateConsent({
                      analytics: false,
                      marketing: false,
                      preferences: false,
                    });
                  }}
                  className="px-4 py-2 text-sm font-medium text-accent hover:text-white transition-colors"
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={acceptAll}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background hover:bg-accent/90 transition-colors"
                >
                  Accept All
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2 text-sm font-medium text-accent hover:text-white transition-colors"
                >
                  Manage Preferences
                </button>
                <button
                  onClick={rejectAll}
                  className="rounded-lg border border-surface bg-background px-4 py-2 text-sm font-medium text-white hover:bg-surface transition-colors"
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={acceptAll}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background hover:bg-accent/90 transition-colors"
                >
                  Accept All
                </button>
              </>
            )}
          </div>

          <p className="mt-4 text-xs text-muted">
            By continuing, you agree to our{' '}
            <Link href={privacyPolicyUrl} className="underline hover:text-white">
              Privacy Policy
            </Link>
            . You can change your preferences at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
