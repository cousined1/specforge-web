'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookieConsentState extends CookieConsent {
  hasConsented: boolean;
  consentTimestamp?: string;
}

export interface CookieConsentActions {
  acceptAll: () => void;
  rejectAll: () => void;
  updateConsent: (consent: Partial<CookieConsent>) => void;
  resetConsent: () => void;
}

const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

const STORAGE_KEY = 'specforge_cookie_consent';

function getStoredConsent(): CookieConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as CookieConsentState;
    }
  } catch {
    // ignore parse errors
  }
  return null;
}

function storeConsent(state: CookieConsentState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

interface CookieConsentContextValue extends CookieConsentState, CookieConsentActions {}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CookieConsentState>(() => ({
    ...defaultConsent,
    hasConsented: false,
  }));

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) return;
    // Sync from localStorage (external system) after hydration to avoid SSR
    // markup mismatches. This is the supported pattern for external data and
    // does not cause cascading renders beyond the single hydration update.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(stored);
  }, []);

  const acceptAll = useCallback(() => {
    const newState: CookieConsentState = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      hasConsented: true,
      consentTimestamp: new Date().toISOString(),
    };
    setState(newState);
    storeConsent(newState);
  }, []);

  const rejectAll = useCallback(() => {
    const newState: CookieConsentState = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      hasConsented: true,
      consentTimestamp: new Date().toISOString(),
    };
    setState(newState);
    storeConsent(newState);
  }, []);

  const updateConsent = useCallback((consent: Partial<CookieConsent>) => {
    setState((prev) => {
      const newState: CookieConsentState = {
        ...prev,
        ...consent,
        necessary: consent.necessary ?? prev.necessary,
        hasConsented: true,
        consentTimestamp: new Date().toISOString(),
      };
      storeConsent(newState);
      return newState;
    });
  }, []);

  const resetConsent = useCallback(() => {
    const newState: CookieConsentState = {
      ...defaultConsent,
      hasConsented: false,
      consentTimestamp: undefined,
    };
    setState(newState);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        ...state,
        acceptAll,
        rejectAll,
        updateConsent,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return context;
}

export function useHasConsent(category: CookieCategory): boolean {
  const state = useCookieConsent();
  if (!state.hasConsented) return category === 'necessary';
  return state[category];
}
