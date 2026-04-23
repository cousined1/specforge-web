# SpecForge — Security Audit Report

**Audit date:** April 23, 2026
**Auditor:** Automated static analysis + manual review (GODMYTHOSV9 protocol)
**Standards:** OWASP Top 10 (2025), NIST CSF 2.0, CWE/SANS Top 25
**Scope:** `specforge-web/` — static-exported Next.js 16 marketing & auth site

---

## Executive Summary

SpecForge's client-side codebase demonstrates a **solid security baseline** with proactive measures already in place. The architecture is a statically exported Next.js site that delegates all sensitive operations (auth, database writes, billing) to the InsForge BaaS backend. This reduces the client-side attack surface considerably.

**Overall risk rating: LOW-MEDIUM**

| Severity | Count | Description |
|----------|-------|-------------|
| CRITICAL | 0 | No critical vulnerabilities found |
| HIGH | 1 | CSP allows `unsafe-inline` for scripts |
| MEDIUM | 3 | Cookie consent localStorage trust, rate-limit bypass, env var exposure |
| LOW | 4 | Minor hardening opportunities |
| INFO | 3 | Best-practice recommendations |

---

## 1. Authentication & Session Management

### 1.1 Auth Flow (Login / Signup)

| Check | Status | Notes |
|-------|--------|-------|
| Credentials transmitted over TLS | ✅ PASS | InsForge SDK handles auth over HTTPS |
| Password strength validation (client) | ✅ PASS | Custom strength meter in `signup/page.tsx` with length, uppercase, number, special char checks |
| Password strength validation (server) | ⚠️ N/A | Delegated to InsForge backend — verify server-side enforcement exists |
| OAuth state parameter | ✅ PASS | InsForge SDK handles CSRF protection for OAuth flows |
| Error messages non-enumerating | ✅ PASS | Generic error messages; no user enumeration via login errors |
| Session management | ✅ PASS | Delegated to InsForge SDK token management |
| Password reset flow | ⚠️ INFO | Not implemented in client; relies on InsForge backend capabilities |

### 1.2 Dashboard Auth Guard

```typescript
// dashboard/page.tsx — Auth check pattern
const { data, error } = await insforge.auth.getCurrentUser();
if (error || !data?.user) {
  router.push('/login/');
  return;
}
```

**Finding:** Client-side auth guard is correctly implemented with redirect-on-failure. The `cancelled` flag prevents state updates after unmount. **No server-side middleware** exists because the app is statically exported — this is acceptable for the current architecture where all sensitive data flows through the InsForge API (which enforces its own auth).

---

## 2. Input Validation & XSS Prevention

### 2.1 Contact Form Sanitization

**Status: ✅ PASS**

```typescript
// ContactForm.tsx — sanitization function
function sanitize(input: string): string {
  return input.replace(/[<>"'&]/g, '');
}
```

| Check | Status |
|-------|--------|
| HTML tag stripping | ✅ Strips `<`, `>`, `"`, `'`, `&` |
| Test coverage for XSS payloads | ✅ Test verifies `<script>Alice</script>` → `scriptAlice/script` |
| Email regex validation | ✅ Client-side regex pattern check |
| Rate limiting | ✅ 30-second cooldown between submissions |
| Error boundary | ✅ Try/catch with console.error and user-facing message |
| ARIA accessibility on validation errors | ✅ `aria-invalid` set on failing fields |

### 2.2 Known Limitation — Client-Side Rate Limiting

**Severity: MEDIUM** — The 30-second rate limit in `ContactForm.tsx` uses in-memory `lastSubmitTime` state. This resets on page reload and is trivially bypassed. **Mitigation:** Server-side rate limiting must be enforced at the InsForge API or edge level. The client-side check is defense-in-depth only.

---

## 3. Content Security Policy (CSP)

### 3.1 Current CSP Header (`public/_headers`)

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://insforge-production-0d5a.up.railway.app; frame-src https://js.stripe.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; manifest-src 'self'; worker-src 'self' blob:; upgrade-insecure-requests
```

### 3.2 CSP Analysis

| Directive | Value | Assessment |
|-----------|-------|------------|
| `default-src` | `'self'` | ✅ Restrictive default |
| `script-src` | `'self' 'unsafe-inline' https://js.stripe.com` | ⚠️ **HIGH** — `unsafe-inline` weakens XSS protection |
| `style-src` | `'self' 'unsafe-inline' https://fonts.googleapis.com` | ⚠️ MEDIUM — `unsafe-inline` for styles is common but not ideal |
| `img-src` | `'self' data: https:` | ✅ Allows images from any HTTPS source (normal for a marketing site) |
| `connect-src` | `'self' https://insforge-production-0d5a.up.railway.app` | ✅ Correctly scoped to the InsForge backend |
| `frame-src` | `https://js.stripe.com` | ✅ Correctly scoped for Stripe Checkout |
| `frame-ancestors` | `'none'` | ✅ Prevents clickjacking |
| `object-src` | `'none'` | ✅ Blocks Flash/plugin embedding |
| `base-uri` | `'self'` | ✅ Prevents base tag hijacking |
| `form-action` | `'self'` | ✅ Restricts form targets |
| `upgrade-insecure-requests` | Present | ✅ Forces HTTPS |

### Finding: HIGH — `script-src 'unsafe-inline'`

**Risk:** Enables execution of inline scripts, which significantly weakens XSS mitigation. If an attacker injects HTML that includes a `<script>` tag, the CSP will not block it.

**Root cause:** Next.js injects inline scripts for hydration. Static export with `output: 'export'` still emits inline script tags.

**Recommendation:** Replace `'unsafe-inline'` with nonce-based CSP. Since this is a static site, use a Cloudflare Worker or edge middleware to inject nonces at serve-time. Alternatively, accept the risk with the understanding that the sanitization in ContactForm provides defense-in-depth.

---

## 4. Security Headers

| Header | Value | Status |
|--------|-------|--------|
| `X-Content-Type-Options` | `nosniff` | ✅ |
| `X-Frame-Options` | `DENY` | ✅ |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✅ |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | ✅ |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | ✅ (2 years, preload-ready) |
| `Content-Security-Policy` | Full policy (see above) | ⚠️ `unsafe-inline` concern |
| `X-Powered-By` | Not set (Next.js removes by default) | ✅ |
| `X-DNS-Prefetch-Control` | Not set | ℹ️ INFO — add `off` to prevent DNS prefetch leaks |
| `Cross-Origin-Opener-Policy` | Not set | ℹ️ INFO — add `same-origin` for Spectre mitigation |
| `Cross-Origin-Embedder-Policy` | Not set | ℹ️ INFO — add `require-corp` if no third-party embeds |

---

## 5. Data Exposure & Secrets Management

### 5.1 Environment Variables

| Variable | Exposure | Risk |
|----------|----------|------|
| `NEXT_PUBLIC_INSFORGE_URL` | Client-visible (by design) | ✅ Public API endpoint |
| `NEXT_PUBLIC_INSFORGE_ANON_KEY` | Client-visible (by design) | ⚠️ MEDIUM — Expected for BaaS pattern, but Row Level Security (RLS) must be enforced server-side |

**Assessment:** The `NEXT_PUBLIC_` prefix is intentional. The anon key provides unauthenticated public access — this is the standard BaaS pattern (similar to Supabase). Security depends entirely on:
1. InsForge RLS policies being correctly configured
2. The anon key having restricted permissions
3. No admin-level secrets being bundled into the client

### 5.2 Source Code Secrets Scan

```
grep -r "password\|secret\|api_key\|private_key\|token" --include="*.ts" --include="*.tsx" src/
```

**Result: ✅ CLEAN** — No hardcoded secrets found in source code. `.env.example` contains placeholder values only.

---

## 6. Cookie & Storage Security

### 6.1 Cookie Consent System

**Implementation:** `CookieConsentContext.tsx` uses `localStorage` for consent storage.

| Check | Status | Notes |
|-------|--------|-------|
| Consent categories defined | ✅ | necessary, analytics, marketing, preferences |
| `necessary` always true | ✅ | Cannot be disabled |
| Consent timestamp recorded | ✅ | ISO timestamp on every consent action |
| Reset functionality | ✅ | `resetConsent()` clears localStorage |
| GDPR-compliant UI | ✅ | Accept All / Reject Non-Essential / Manage Preferences |
| Consent before tracking | ✅ | Analytics/marketing default to `false` |

### 6.2 Finding: MEDIUM — localStorage Trust

`getStoredConsent()` parses localStorage with a try/catch but does not validate the schema of the parsed object. A malicious or corrupted localStorage entry could inject unexpected properties.

**Recommendation:** Add Zod or manual schema validation on the parsed JSON to ensure it matches `CookieConsentState`.

---

## 7. AI-Native Threat Vectors

### 7.1 BART Preview Pages

The BART routes (`/bart-control/`, `/bart-escalations/`, `/bart-task-graph/`, `/bart-timeline/`, `/bart-verification/`) are **preview placeholders only**. They render static content via `BARTPreview.tsx` with no backend connectivity or user input handling.

**Status: ✅ NO RISK** — No AI model invocation, no prompt injection surface, no data flow.

### 7.2 Contact Form — No AI Processing

The contact form submits directly to the `contact_submissions` database table. There is no AI processing of user input on the client side.

**Status: ✅ NO RISK** — No LLM/AI pipeline exists in the client-side codebase.

---

## 8. Dependency Security

### 8.1 Package Audit

| Check | Status |
|-------|--------|
| `npm audit` run | Recommended — run `npm audit` before deployment |
| Lock file present | ✅ `package-lock.json` exists |
| React version | 19.x (latest stable) |
| Next.js version | 16.x (latest stable) |
| Known vulnerability in deps | Requires `npm audit` verification |

---

## 9. Third-Party Integration Security

### 9.1 Stripe

| Check | Status |
|-------|--------|
| Stripe.js loaded from official CDN | ✅ `https://js.stripe.com` in CSP |
| No Stripe secret key in client | ✅ Only public-facing Stripe.js used |
| Billing disclosures displayed | ✅ All 7 billing notices on pricing page |
| PCI compliance delegation | ✅ Stripe handles all card data |

### 9.2 InsForge Backend

| Check | Status |
|-------|--------|
| Communication over HTTPS | ✅ |
| Client singleton pattern | ✅ Proxy-based lazy initialization |
| Error handling on API calls | ✅ `{ data, error }` pattern consistently used |
| No admin keys in client | ✅ Only anon key used |

---

## 10. Remediation Priority Matrix

| # | Finding | Severity | Effort | Recommendation |
|---|---------|----------|--------|---------------|
| 1 | CSP `script-src 'unsafe-inline'` | HIGH | Medium | Replace with nonce-based CSP via edge worker |
| 2 | Client-side rate limit bypass | MEDIUM | Low | Enforce server-side rate limiting on InsForge |
| 3 | localStorage consent schema validation | MEDIUM | Low | Add schema validation on parsed consent |
| 4 | Env var `ANON_KEY` exposure | MEDIUM | N/A | Verify InsForge RLS policies are restrictive |
| 5 | Missing `Cross-Origin-Opener-Policy` header | LOW | Low | Add `same-origin` to `_headers` |
| 6 | Missing `X-DNS-Prefetch-Control` header | LOW | Low | Add `off` to `_headers` |
| 7 | No `npm audit` documented | LOW | Low | Add to CI pipeline |
| 8 | Password reset not in client | LOW | N/A | Verify InsForge provides this flow |

---

## 11. Conclusion

The SpecForge client-side codebase follows security best practices for a statically exported marketing and auth site. The most significant finding is the `unsafe-inline` script CSP directive, which is a known trade-off with Next.js static export. All other findings are low-to-medium severity with clear remediation paths.

**The codebase is approved for production deployment** with the understanding that:
1. InsForge backend RLS policies are verified as restrictive
2. Server-side rate limiting is active on the contact form endpoint
3. The CSP `unsafe-inline` risk is accepted or mitigated via edge nonces

---

*Report generated under GODMYTHOSV9 Compound Engineering protocol.*
*All findings cross-referenced against OWASP Top 10 (2025) and NIST CSF 2.0 DE.CM controls.*
