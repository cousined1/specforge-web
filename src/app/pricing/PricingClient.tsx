'use client';

import { useState } from 'react';
import { pricing, company } from '@/config/site';
import { stripe } from '@/config/site';
import Link from 'next/link';

export default function PricingClient() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <section className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">Pricing</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          Transparent pricing for teams that take governance seriously. No hidden fees. Cancel anytime.
        </p>
      </section>

      <section className="mt-10 flex items-center justify-center gap-3">
        <span className={`text-sm ${!annual ? 'text-white' : 'text-muted'}`}>Monthly</span>
        <button
          type="button"
          role="switch"
          aria-checked={annual}
          onClick={() => setAnnual(!annual)}
          className="relative inline-flex h-6 w-11 items-center rounded-full border border-surface bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Toggle annual billing"
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-primary transition-transform ${annual ? 'translate-x-6' : 'translate-x-1'}`}
          ></span>
        </button>
        <span className={`text-sm ${annual ? 'text-white' : 'text-muted'}`}>Annual</span>
        <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Save up to 20%</span>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-3">
        {pricing.plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-8 ${plan.popular ? 'border-primary bg-surface' : 'border-surface bg-surface'}`}
          >
            {plan.popular && <p className="mb-4 text-xs font-bold uppercase text-primary">Most popular</p>}
            <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
            <p className="mt-2 text-sm text-muted">{plan.tagline}</p>
            <div className="mt-6 flex items-baseline gap-2">
              {annual && plan.annualPrice !== null ? (
                <>
                  <span className="text-4xl font-extrabold text-white">${Math.round(plan.annualPrice / 12)}</span>
                  <span className="text-sm text-muted">/month</span>
                </>
              ) : plan.monthlyPrice !== null ? (
                <>
                  <span className="text-4xl font-extrabold text-white">${plan.monthlyPrice}</span>
                  <span className="text-sm text-muted">/month</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-white">Custom</span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted">
              {annual && plan.annualPrice !== null
                ? `$${plan.annualPrice} billed annually`
                : plan.annualPrice !== null
                  ? `$${plan.annualPrice}/year when billed annually`
                  : 'Contact sales for a quote'}
            </p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-accent">
                  <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-primary"></span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href={plan.href}
                className="block rounded-md bg-primary py-3 text-center text-sm font-semibold text-background hover:bg-secondary"
              >
                {plan.cta}
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-xl font-bold text-white">Billing disclosures</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          <li>{stripe.renewNotice}</li>
          <li>{stripe.taxNotice}</li>
          <li>{stripe.limitNotice}</li>
          <li>{stripe.enterpriseNotice}</li>
          <li>{stripe.processingNotice}</li>
          <li>{stripe.changeNotice}</li>
          <li>{stripe.responsibilityNotice}</li>
        </ul>
        <p className="mt-4 text-xs text-muted">
          {company.fullIdentity} · {company.email} · {company.phone}
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-xl font-bold text-white">Frequently asked questions</h2>
        <div className="mt-6 space-y-6">
          <FaqItem
            question="Can I switch between monthly and annual billing?"
            answer="Yes. You can change your billing interval at any time from your billing settings. When switching to annual, you will be credited for any unused time on your current plan."
          />
          <FaqItem
            question="What happens when I cancel?"
            answer="Your subscription remains active until the end of the current billing period. After that, your account reverts to read-only access. You can export your data at any time before cancellation."
          />
          <FaqItem
            question="Do you offer refunds?"
            answer="We do not offer refunds for partial billing periods. If you are on an annual plan and cancel within 30 days of renewal, contact us for a prorated refund."
          />
          <FaqItem
            question="What if I need more repositories or team members?"
            answer="Contact us to discuss a custom plan that fits your scale. Enterprise plans include unlimited team members and repository coverage."
          />
          <FaqItem
            question="Is SpecGetter SOC 2 compliant?"
            answer="We are working toward SOC 2 Type II compliance. We do not claim compliance readiness or guarantee audit outcomes."
          />
          <FaqItem
            question="What is the procurement process for enterprise plans?"
            answer="Enterprise plans typically require a custom order form or MSA. Our team will work with your procurement and legal teams to align on terms, security review, and onboarding timelines."
          />
        </div>
      </section>
    </>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-xl border border-surface bg-surface p-6">
      <h3 className="text-base font-semibold text-white">{question}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{answer}</p>
    </div>
  );
}
