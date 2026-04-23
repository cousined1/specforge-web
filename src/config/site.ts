export const company = {
  name: 'Developer312',
  parentOrg: 'NIGHT LITE USA LLC',
  fullIdentity: 'Developer312, a subsidiary of NIGHT LITE USA LLC',
  email: 'hello@developer312.com',
  phone: '(510) 401-1225',
  productName: 'SpecGetter',
  baseUrl: 'https://specgetter-web-production.up.railway.app',
};

export const stripe = {
  processingNotice: 'Stripe processes billing information securely.',
  renewNotice: 'Subscriptions renew automatically until canceled.',
  taxNotice: 'Taxes may apply unless otherwise stated.',
  limitNotice: 'Plan features and usage limits are defined in the product or order form.',
  enterpriseNotice: 'Enterprise plans may require a custom order form or MSA.',
  changeNotice: 'Service availability and feature roadmap are subject to change.',
  responsibilityNotice: 'Customers are responsible for evaluating suitability for their compliance and legal obligations.',
};

export const pricing = {
  currency: 'USD',
  billingInterval: 'month',
  plans: [
    {
      name: 'Starter',
      tagline: 'For small engineering teams validating provenance workflows',
      monthlyPrice: 49,
      annualPrice: 470,
      features: [
        'Up to 10 team members',
        'Provenance tracking for 5 repositories',
        'AI-generated code detection',
        'Basic OSS license scanning',
        'Email support',
        'Community Slack access',
      ],
      cta: 'Start free trial',
      href: '/signup/',
      popular: false,
    },
    {
      name: 'Team',
      tagline: 'For scaling orgs needing policy controls, collaboration, and audit trails',
      monthlyPrice: 199,
      annualPrice: 1910,
      features: [
        'Up to 50 team members',
        'Unlimited repositories',
        'Policy enforcement rules engine',
        'Advanced OSS compliance reporting',
        'Audit trails and change logs',
        'Priority email and chat support',
        'CI/CD pipeline integrations',
        'Custom policy templates',
      ],
      cta: 'Start free trial',
      href: '/signup/',
      popular: true,
    },
    {
      name: 'Enterprise',
      tagline: 'For regulated environments, procurement review, advanced controls, and custom terms',
      monthlyPrice: null,
      annualPrice: null,
      features: [
        'Unlimited team members',
        'Unlimited repositories',
        'SSO/SAML authentication',
        'Custom SLA and MSA',
        'Dedicated support engineer',
        'On-premise deployment option',
        'Advanced analytics and reporting',
        'Custom integrations and API access',
        'Procurement-friendly billing',
      ],
      cta: 'Contact sales',
      href: '/contact/',
      popular: false,
    },
  ],
};

export const metaDefaults = {
  titleTemplate: '%s | SpecGetter',
  defaultTitle: 'SpecGetter — Software Provenance and Governance Platform',
  defaultDescription: 'SpecGetter helps organizations document what AI generated, what open-source components are present, and whether shipped code aligns with internal governance expectations.',
  image: '/og-image.png',
};

export const navLinks = {
  product: [
    { label: 'Platform', href: '/product/' },
    { label: 'Pricing', href: '/pricing/' },
  ],
  solutions: [
    { label: 'FinTech', href: '/solutions/fintech/' },
    { label: 'Healthcare', href: '/solutions/healthcare/' },
    { label: 'Enterprise SaaS', href: '/solutions/enterprise-saas/' },
  ],
  explainers: [
    { label: 'AI Code Provenance', href: '/ai-code-provenance/' },
    { label: 'OSS Supply Chain Risk', href: '/oss-supply-chain/' },
    { label: 'Compliance', href: '/compliance/' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms/' },
    { label: 'Privacy Policy', href: '/privacy/' },
    { label: 'Contact', href: '/contact/' },
  ],
};
