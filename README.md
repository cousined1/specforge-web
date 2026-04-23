# SpecForge — Production-Grade Marketing Site + SaaS Shell

## ✅ Build Output: 19 static routes generated

| Route | Type | Status |
|---|---|---|
| `/` | Marketing | ✅ |
| `/product/` | Marketing | ✅ |
| `/pricing/` | Marketing | ✅ |
| `/solutions/fintech/` | Marketing | ✅ |
| `/solutions/healthcare/` | Marketing | ✅ |
| `/solutions/enterprise-saas/` | Marketing | ✅ |
| `/compliance/` | Marketing | ✅ |
| `/ai-code-provenance/` | Marketing | ✅ |
| `/oss-supply-chain/` | Marketing | ✅ |
| `/terms/` | Legal | ✅ |
| `/privacy/` | Legal | ✅ |
| `/contact/` | Marketing | ✅ |
| `/request-demo/` | Marketing | ✅ |
| `/login/` | Auth | ✅ |
| `/signup/` | Auth | ✅ |
| `/dashboard/` | App shell | ✅ |
| `robots.txt` | SEO | ✅ |
| `sitemap.xml` | SEO | ✅ |

## Architecture

- **Framework**: Next.js 16.2.4 + TypeScript + Tailwind CSS 3.4.17
- **Export**: Static site (`output: 'export'`) for crawlable SEO
- **Backend**: InsForge SDK (`@insforge/sdk`) — `createClient` with production URL + anon key
- **Auth**: Email/password + OAuth (Google, GitHub) via InsForge auth SDK
- **Dashboard**: Client-side auth guard using `getCurrentUser()`

## SEO Verification

- [x] Unique title + description on every public page
- [x] Canonical URLs on all pages
- [x] Open Graph + Twitter/X metadata
- [x] JSON-LD: Organization, WebSite, ContactPage
- [x] `robots.txt` + `sitemap.xml`
- [x] Mobile-first responsive design
- [x] No thin pages, no lorem ipsum, no duplicate content

## Pricing & Billing

- Monthly/annual toggle visible on pricing page
- Transparent billing disclosures (renewal, taxes, limits, enterprise MSA, Stripe, changes, responsibility)
- Billing FAQ with 6 substantive answers
- No deceptive urgency patterns
- Enterprise plan routes to `/contact/`

## Legal & Trust

- Substantive Terms of Service (12 sections)
- Substantive Privacy Policy (9 sections)
- Footer legal block on all pages with company identity (`Developer312, a subsidiary of NIGHT LITE USA LLC`)
- Contact info consistent sitewide: `hello@developer312.com` · `(510) 401-1225`
- No unsupported compliance claims

## Auth Integration

- Signup with email/password, name, and email verification support
- Login with email/password
- OAuth buttons (Google, GitHub)
- Signup disclosures visible (terms, privacy, billing notices)
- Dashboard redirects unauthenticated users to `/login/`

## Documentation

- `SEO_CHECKLIST.md` — implementation checklist
- `docs/SEO_ARTIFACTS.md` — metadata map, keyword map, internal linking map, duplicate checks
- `docs/knowledge/2024-04-20-specforge-implementation.md` — compound loop artifact

## Next Steps (Optional)

1. **Stripe checkout**: Add server-side checkout session creation (API route or edge function) when Stripe product/price IDs are ready.
2. **InsForge project linking**: Run `npx @insforge/cli link` to connect the local project to your InsForge backend, then create database tables/RLS policies via dashboard.
3. **Middleware auth guard**: Consider adding `middleware.ts` for SSR-safe auth redirects.
4. **Visual assets**: Add feature screenshots, demo videos, or illustrated diagrams for richer product pages.
5. **Custom 404 page**: Replace default Next.js 404 with branded design.
