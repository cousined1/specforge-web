# Knowledge Artifact: SpecGetter Production Readiness Audit

**Phase:** Full 10-Phase Audit Completed
**Date:** April 23, 2026
**Protocol:** GODMYTHOSV9 Compound Engineering

---

## Architecture Synopsis

- **Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 3.x
- **Backend:** InsForge BaaS (auth, database, storage) via `@insforge/sdk`
- **Billing:** Stripe (client-side Stripe.js only — SAQ A scope)
- **Deployment:** Static export (`output: 'export'`) targeting Cloudflare Pages / Netlify
- **Security headers:** Platform-level via `public/_headers`

## Key Patterns Identified

### 1. InsForge Client Singleton
`src/lib/insforge.ts` uses a Proxy-based lazy singleton that throws on missing env vars.
This is the only SDK entry point — all auth, database, and storage calls flow through it.

### 2. SEO Metadata System
`buildMeta()` in `src/components/seo/PageMeta.tsx` is the single source of truth for all page
metadata. It composes titles, canonicals, OG, and Twitter cards. 12 unit tests verify correctness.

### 3. Cookie Consent Architecture
`CookieConsentContext.tsx` → `CookieConsentBanner.tsx` → `CookieSettings.tsx`
- Context provider wraps entire app in root layout
- Defaults all non-essential categories to `false`
- localStorage key: `SpecGetter_cookie_consent`

### 4. Contact Form Security
- Input sanitization strips `<>"'&`
- Client-side rate limiting (30s cooldown)
- Direct write to `contact_submissions` table via InsForge
- 5 unit tests covering XSS, validation, error handling, rate limiting

### 5. BART Preview Pattern
All BART routes use a shared `BARTPreview.tsx` component with props for eyebrow/title/description.
These are static marketing placeholders — no backend connectivity.

## Findings Summary

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Security | 0 | 1 | 3 | 4 |
| SEO | 0 | 0 | 2 | 3 |
| Compliance | 0 | 0 | 2 | 0 |

## Accepted Risks

1. **CSP `script-src 'unsafe-inline'`** — Required by Next.js static export. Mitigated by input sanitization.
2. **Client-side rate limiting** — Bypassable by page reload. Defense-in-depth only; server-side enforcement required.
3. **`NEXT_PUBLIC_INSFORGE_ANON_KEY` exposure** — Expected BaaS pattern. Security depends on InsForge RLS.

## Test Baseline

- **24 tests passing** across 3 test files
- **0 failures, 0 skipped**
- Coverage areas: ContactForm (5), Navbar (6), PageMeta (12)

## Lessons Learned

1. Static-exported Next.js apps shift most security responsibility to the edge platform and backend API
2. The `_headers` file pattern works well for Cloudflare Pages but must be adapted for other platforms
3. Cookie consent checkbox state in the banner view is hardcoded to `false` — cosmetic bug
4. The pricing page FAQs are well-structured and ready for FAQPage JSON-LD schema
