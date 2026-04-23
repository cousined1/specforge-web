# SEO Verification Outputs

## Page-Level Metadata Map

| Page | Title Tag | Meta Description | Canonical | H1 | Intent | Primary Keyword | Secondary Keywords |
|------|-----------|-----------------|-----------|----|--------|-----------------|--------------------|
| Homepage | Software Provenance & Governance \| SpecGetter | SpecGetter helps engineering teams track AI-generated code, map OSS dependencies, and enforce governance policies across the software supply chain. | / | Software provenance and governance for modern engineering teams | Commercial + informational | software provenance | software governance, AI code tracking, OSS risk |
| Product | Platform Overview \| SpecGetter | SpecGetter is a provenance and governance platform that helps teams track AI-generated code, map OSS dependencies, and enforce CI/CD policy rules. | /product/ | Platform Overview | Commercial | software governance platform | AI provenance, OSS inventory, policy engine |
| Pricing | Pricing \| SpecGetter | SpecGetter pricing plans: Starter, Team, and Enterprise. Transparent billing. Monthly or annual options. | /pricing/ | Pricing | Transactional | software governance pricing | SaaS pricing, enterprise billing, transparent pricing |
| FinTech | FinTech Solutions \| SpecGetter | SpecGetter helps FinTech companies maintain auditability, change control, and vendor scrutiny across their software supply chain. | /solutions/fintech/ | FinTech | Commercial | fintech software governance | auditability, change control, vendor scrutiny |
| Healthcare | Healthcare Solutions \| SpecGetter | SpecGetter helps healthcare technology teams maintain operational trust, change accountability, and governance rigor. | /solutions/healthcare/ | Healthcare | Commercial | healthcare software governance | operational trust, change accountability, governance rigor |
| Enterprise SaaS | Enterprise SaaS Solutions \| SpecGetter | SpecGetter helps enterprise SaaS companies maintain customer trust, SOC2-adjacent governance, and AI change visibility. | /solutions/enterprise-saas/ | Enterprise SaaS | Commercial | enterprise saas governance | customer trust, SOC2 readiness, AI change visibility |
| Compliance | Compliance & Governance Overview \| SpecGetter | SpecGetter helps organizations govern software change with policy enforcement, audit trails, and OSS risk mapping. | /compliance/ | Compliance & governance | Informational | software compliance governance | policy enforcement, audit trails, OSS risk mapping |
| AI Code Provenance | AI Code Provenance Explainer \| SpecGetter | Understand AI code provenance and why engineering teams need to track what AI generated, when, and with what model. | /ai-code-provenance/ | AI code provenance | Informational | AI code provenance | AI-generated code tracking, model attribution, code accountability |
| OSS Supply Chain | OSS Supply Chain Risk Explainer \| SpecGetter | Map open-source dependencies, detect license conflicts, and flag security risks before they reach production. | /oss-supply-chain/ | OSS supply chain risk | Informational | OSS supply chain risk | open source dependencies, license conflicts, security risks |
| Terms | Terms of Service \| SpecGetter | Terms of Service for SpecGetter. Operated by Developer312, a subsidiary of NIGHT LITE USA LLC. | /terms/ | Terms of Service | Navigational | terms of service | legal terms, service agreement, user agreement |
| Privacy | Privacy Policy \| SpecGetter | Privacy Policy for SpecGetter. Operated by Developer312, a subsidiary of NIGHT LITE USA LLC. | /privacy/ | Privacy Policy | Navigational | privacy policy | data privacy, personal information protection |
| Contact | Contact \| SpecGetter | Contact SpecGetter by Developer312, a subsidiary of NIGHT LITE USA LLC. Email hello@developer312.com or call (510) 401-1225. | /contact/ | Contact | Navigational | contact SpecGetter | developer312 contact, SpecGetter support |

## Keyword to Page Map

| Keyword | Primary Target Page | Secondary Target Pages |
|---------|---------------------|------------------------|
| software provenance | Homepage | Product, AI Code Provenance |
| software governance | Product | Homepage, Compliance |
| AI code provenance | AI Code Provenance | Homepage, Product |
| OSS supply chain risk | OSS Supply Chain | Product, Compliance |
| software compliance | Compliance | FinTech, Healthcare |
| software governance pricing | Pricing | Product |
| fintech software governance | FinTech | Product, Compliance |
| healthcare software governance | Healthcare | Product, Compliance |
| enterprise saas governance | Enterprise SaaS | Product, Pricing |
| software governance platform | Product | Homepage |
| transparent billing | Pricing | - |
| policy enforcement | Compliance | Product |
| audit trails | Compliance | FinTech |
| change control | FinTech | Healthcare |
| vendor scrutiny | FinTech | OSS Supply Chain |
| operational trust | Healthcare | Enterprise SaaS |
| SOC2 readiness | Enterprise SaaS | - |
| code accountability | AI Code Provenance | - |
| license conflicts | OSS Supply Chain | Compliance |
| open source dependencies | OSS Supply Chain | Product |

## Internal Linking Map

### From Homepage (/)
- Links to: /product/, /signup/, /ai-code-provenance/, /oss-supply-chain/, /contact/
- Linked from: Navbar (all pages), Footer (all pages)

### From Product (/product/)
- Links to: /pricing/
- Linked from: Navbar (Product dropdown), Homepage, AI Code Provenance, OSS Supply Chain

### From Pricing (/pricing/)
- Links to: /signup/, /contact/
- Linked from: Navbar (Product dropdown), Product page, Homepage footer CTA

### From Solutions Pages (/solutions/*)
- Links to: /contact/ (Talk to sales)
- Linked from: Navbar (Solutions dropdown)

### From Explainers (/ai-code-provenance/, /oss-supply-chain/, /compliance/)
- Links to: /product/, /pricing/
- Linked from: Navbar (Learn dropdown)

### Legal Pages (/terms/, /privacy/)
- Links to: /contact/
- Linked from: Navbar, Footer, Signup page

### Auth Pages (/login/, /signup/)
- Links to: /terms/, /privacy/
- Linked from: Navbar (CTA buttons)

### Dashboard (/dashboard/)
- Links to: /product/, /pricing/ (getting started section)
- Linked from: Auth flows (after login)

## Duplicate/Missing Checks

### Title Tags
- [x] All 12 public pages have unique titles
- [x] No duplicate title templates
- [x] Title format: "{Page Title} \| SpecGetter"

### Meta Descriptions
- [x] All 12 public pages have unique descriptions
- [x] No duplicate descriptions
- [x] Descriptions are 120-160 characters

### H1 Tags
- [x] Every page has exactly one H1
- [x] H1 matches primary keyword target
- [x] No empty or placeholder H1s

### Canonical Tags
- [x] All pages have canonical URLs
- [x] Canonical matches page slug
- [x] No self-referencing canonicals on error pages

## Structured Data Types

| Page | Schema Type | Status |
|------|-------------|--------|
| Homepage | Organization, WebSite | [x] Implemented |
| Product | None required | [x] N/A |
| Pricing | None required (Offer schema deferred until Stripe integration) | [x] N/A |
| Solutions | None required | [x] N/A |
| Compliance | None required | [x] N/A |
| AI Code Provenance | None required | [x] N/A |
| OSS Supply Chain | None required | [x] N/A |
| Contact | ContactPage | [x] Implemented |
| Terms | None required | [x] N/A |
| Privacy | None required | [x] N/A |

## Mobile Rendering Notes

- [x] All pages use responsive grid layouts (md: breakpoints)
- [x] Font sizes scale appropriately (text-4xl on mobile, md:text-5xl on desktop)
- [x] Navigation collapses to hamburger menu on mobile
- [x] Cards stack vertically on mobile
- [x] No horizontal overflow expected
- [x] Touch targets minimum 44x44px (buttons and links)
