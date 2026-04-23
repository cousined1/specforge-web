'use client';

import { useCookieConsent } from '@/contexts/CookieConsentContext';
import CookieConsentBanner from '@/components/cookie-consent/CookieConsentBanner';
import CookieSettings from '@/components/cookie-consent/CookieSettings';

export default function CookieConsentWrapper() {
  const { hasConsented } = useCookieConsent();

  return (
    <>
      <CookieConsentBanner />
      {hasConsented && (
        <div className="fixed bottom-4 left-4 z-40">
          <CookieSettings />
        </div>
      )}
    </>
  );
}
