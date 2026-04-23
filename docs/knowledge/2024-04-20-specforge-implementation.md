---
title: "SpecGetter public site + SaaS shell implementation notes"
type: implementation
created: 2026-04-20
related_spec: master-prompt.txt
confidence: HIGH
stale_after: 30d
---

# SpecGetter Implementation Notes

## Key decisions

- **Stack**: Next.js 16.2.4 + TypeScript + Tailwind CSS 3.4.17. Chose static export (`output: 'export'`) for crawlable SEO without server runtime dependency.
- **Backend**: InsForge SDK (`@insforge/sdk`) with `createClient` pointing to `https://insforge-production-0d5a.up.railway.app`. Auth flows use `signInWithPassword`, `signUp`, `signInWithOAuth`, `getCurrentUser`, and `signOut` per InsForge TypeScript SDK docs.
- **Auth patterns**: Client-side auth guard on `/dashboard/` using `useEffect` + `getCurrentUser()`. Redirect unauthenticated users to `/login/`. OAuth buttons for Google and GitHub.
- **Design system**: Dark theme with custom Tailwind colors (`background`, `surface`, `primary`, `secondary`, `accent`, `muted`). Inter font via `next/font/google`. No decorative images or filler imagery.

## SEO decisions

- **Static export strategy**: All public pages are pre-rendered HTML. Google can index core content and metadata without executing JavaScript.
- **Metadata model**: `buildMeta()` helper in `src/components/seo/PageMeta.tsx` generates unique titles, descriptions, canonicals, Open Graph, and Twitter/X metadata per page.
- **JSON-LD**: Organization + WebSite schemas injected globally via `JsonLd` component in `layout.tsx`. ContactPage schema on `/contact/`.
- **Noindex**: `/dashboard/` marked `noindex, nofollow` via `layout.tsx` in the dashboard route to keep auth-only pages out of search results.
- **Sitemap**: `public/sitemap.xml` lists 12 public URLs with priorities and change frequencies. `robots.txt` points to sitemap and allows all.
- **Canonicals**: Every page has a canonical URL matching its slug. No trailing slash mismatches (all routes use `trailingSlash: true`).

## Legal copy decisions

- **Terms of Service**: 12 sections covering service description, eligibility, accounts, acceptable use, fees/billing, IP, disclaimer, limitation of liability, termination, governing law, changes, and contact.
- **Privacy Policy**: 9 sections covering data collection, usage, storage/security, cookies, third-party services, retention, user rights, changes, and contact.
- **Billing disclosures**: Visible on `/pricing/` and `/signup/`. Includes renewal, tax, usage limit, enterprise MSA, Stripe processing, change, and responsibility notices per master prompt requirements.
- **No unsupported claims**: No “guaranteed compliance,” “100% detection,” or “zero risk” language anywhere.

## Billing assumptions

- **Stripe scaffolding only**: Pricing config lives in `src/config/site.ts`. No live Stripe integration yet—CTAs route to `/signup/` or `/contact/`.
- **No checkout flow**: Billing success/cancel pages not built because Stripe product/price IDs and checkout session creation are not yet in scope.
- **Disclosures present**: All 7 required disclosures visible on pricing and signup pages.

## InsForge integration notes

- **Docs fetched via webfetch**: InsForge MCP CLI required browser OAuth and project linking, so I used `webfetch` on docs.insforge.dev to retrieve TypeScript SDK references for auth, database, storage, realtime, and deployment.
- **Auth SDK usage**: Verified against https://docs.insforge.dev/sdks/typescript/auth
  - `signUp` returns `{ data: { user, accessToken, requireEmailVerification }, error }`
  - `signInWithPassword` returns `{ data: { user, accessToken }, error }`
  - `signInWithOAuth` returns `{ data: { url }, error }`
  - `getCurrentUser` returns `{ data: { user }, error }`
  - `signOut` returns `{ error }`
- **No invented APIs**: All auth calls match documented method signatures exactly.

## Risks / open questions

- **Stripe checkout**: Need actual Stripe account product/price IDs and server-side checkout session route (or edge function) to create real billing flow.
- **InsForge project linking**: CLI install succeeded but `link` step was skipped because it required browser auth. The SDK client is pre-configured with the production URL and anon key; actual table creation / RLS policies still need to be done via InsForge dashboard or MCP after linking.
- **Dashboard auth guard**: Current implementation uses client-side redirect. For SSR safety, consider middleware-based auth check in `middleware.ts`.
- **No 404 custom page**: Using default Next.js 404. Could be enhanced with branded design.

## Deviations from plan

- **No blog or changelog**: Scope focused on marketing site + SaaS shell. Blog deferred.
- **No feature screenshots or demo videos**: Placeholder dashboard uses statistics cards and text-only CTAs. Visual assets can be added later without structural changes.
- **No Edge Functions or Storage integration yet**: Not needed for current marketing/auth scope.
