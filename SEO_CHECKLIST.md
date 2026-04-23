# SEO Implementation Checklist

## Metadata uniqueness
- [x] Every public page has a unique title tag (no duplicates)
- [x] Every public page has a unique meta description
- [x] Every public page has a canonical URL
- [x] Every public page has Open Graph metadata
- [x] Every public page has Twitter/X metadata
- [x] No placeholder lorem ipsum on any page

## Structured data
- [x] Organization JSON-LD in root layout (Developer312 / NIGHT LITE USA LLC)
- [x] WebSite JSON-LD in root layout
- [x] ContactPage JSON-LD on /contact/
- [x] Structured data matches visible content

## Technical SEO
- [x] sitemap.xml generated and placed in public/
- [x] robots.txt generated and placed in public/
- [x] All public pages are static/prerendered (crawlable)
- [x] Internal linking in Navbar + Footer on every page
- [x] Mobile-first responsive design (Tailwind classes)
- [x] Fast static export (no SSR blocking for critical content)

## Content quality
- [x] Every public page has exactly one H1
- [x] Distinct copy on every page (no doorways / no noun-swapping)
- [x] Content is scannable with meaningful H2 headings
- [x] No thin pages (all pages have substantive body copy)
- [x] Legal identity consistent sitewide (Developer312 identity)

## Billing / trust
- [x] Pricing page includes visible plan names, prices, features, billing frequency
- [x] Stripe billing disclosures visible on pricing page and signup form
- [x] Transparent billing disclosures (renewal, taxes, limits, enterprise MSA)
- [x] No deceptive urgency patterns
- [x] Terms of Service and Privacy Policy are substantive and specific

## Auth / app shell
- [x] Signup page includes billing/signup disclosures
- [x] Login and signup wired to InsForge auth SDK
- [x] Dashboard placeholder with auth guard (redirects if not authenticated)
- [x] OAuth (Google/GitHub) buttons present on auth pages
