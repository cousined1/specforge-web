'use client';

import { useState } from 'react';
import { useCookieConsent, type CookieCategory } from '@/contexts/CookieConsentContext';
import Link from 'next/link';

interface CookieSettingsProps {
  privacyPolicyUrl?: string;
}

export default function CookieSettings({ privacyPolicyUrl = '/privacy/' }: CookieSettingsProps) {
  const { necessary, analytics, marketing, preferences, updateConsent } = useCookieConsent();
  const [isOpen, setIsOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const categories: { key: CookieCategory; label: string; description: string; required: boolean }[] = [
    {
      key: 'necessary',
      label: 'Necessary',
      description: 'Essential cookies for core functionality.',
      required: true,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      description: 'Help us understand how visitors interact with our site.',
      required: false,
    },
    {
      key: 'marketing',
      label: 'Marketing',
      description: 'Track visitors across websites for advertising.',
      required: false,
    },
    {
      key: 'preferences',
      label: 'Preferences',
      description: 'Enable personalized features like language preferences.',
      required: false,
    },
  ];

  const currentValues = { necessary, analytics, marketing, preferences };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-muted hover:text-white transition-colors underline"
      >
        Cookie Settings
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div className="w-full max-w-md rounded-xl border border-surface bg-surface shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 id="cookie-settings-title" className="text-lg font-semibold text-white">
              Cookie Settings
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.key} className="flex items-start gap-3">
                <div className="mt-1">
                  <input
                    type="checkbox"
                    id={`settings-cookie-${cat.key}`}
                    checked={currentValues[cat.key]}
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
                  <label htmlFor={`settings-cookie-${cat.key}`} className="text-sm font-medium text-white cursor-pointer">
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

          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-muted">
              <Link href={privacyPolicyUrl} className="underline hover:text-white">
                Privacy Policy
              </Link>
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-accent hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background hover:bg-accent/90 transition-colors"
              >
                {saved ? 'Saved!' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
