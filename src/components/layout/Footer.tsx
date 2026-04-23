'use client';

import Link from 'next/link';
import { company } from '@/config/site';
import CookieSettings from '@/components/cookie-consent/CookieSettings';

export default function Footer() {
  return (
    <footer className="border-t border-surface bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="text-lg font-bold text-white">{company.productName}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Provenance and governance for modern software teams.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-muted">Product</p>
            <ul className="space-y-2">
              <li><Link href="/product/" className="text-sm text-accent hover:text-white">Platform</Link></li>
              <li><Link href="/pricing/" className="text-sm text-accent hover:text-white">Pricing</Link></li>
              <li><Link href="/contact/" className="text-sm text-accent hover:text-white">Contact Sales</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-muted">Solutions</p>
            <ul className="space-y-2">
              <li><Link href="/solutions/fintech/" className="text-sm text-accent hover:text-white">FinTech</Link></li>
              <li><Link href="/solutions/healthcare/" className="text-sm text-accent hover:text-white">Healthcare</Link></li>
              <li><Link href="/solutions/enterprise-saas/" className="text-sm text-accent hover:text-white">Enterprise SaaS</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-muted">Legal</p>
            <ul className="space-y-2">
              <li><Link href="/terms/" className="text-sm text-accent hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy/" className="text-sm text-accent hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/contact/" className="text-sm text-accent hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-surface pt-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} {company.productName} by {company.fullIdentity}. All rights reserved.
            </p>
            <div className="text-sm text-muted flex items-center gap-4">
              <span>{company.email} · {company.phone}</span>
              <CookieSettings />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">
            Trust starts with provenance. SpecForge helps teams understand and govern their software supply chain. Nothing on this site constitutes legal advice or a guarantee of compliance readiness.
          </p>
        </div>
      </div>
    </footer>
  );
}
