'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { company } from '@/config/site';

const productLinks = [
  { label: 'Platform', href: '/product/' },
  { label: 'Pricing', href: '/pricing/' },
];

const solutionLinks = [
  { label: 'FinTech', href: '/solutions/fintech/' },
  { label: 'Healthcare', href: '/solutions/healthcare/' },
  { label: 'Enterprise SaaS', href: '/solutions/enterprise-saas/' },
];

const explainerLinks = [
  { label: 'AI Code Provenance', href: '/ai-code-provenance/' },
  { label: 'OSS Supply Chain Risk', href: '/oss-supply-chain/' },
  { label: 'Compliance', href: '/compliance/' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          {company.productName}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavSection title="Product" links={productLinks} />
          <NavSection title="Solutions" links={solutionLinks} />
          <NavSection title="Learn" links={explainerLinks} />
          <Link href="/contact/" className="text-sm font-medium text-accent hover:text-white">
            Contact
          </Link>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/login/" className="text-sm font-medium text-accent hover:text-white">
            Log in
          </Link>
          <Link
            href="/signup/"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-background hover:bg-secondary"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-surface bg-background px-4 pb-6 md:hidden">
          <MobileSection title="Product" links={productLinks} onClick={() => setOpen(false)} />
          <MobileSection title="Solutions" links={solutionLinks} onClick={() => setOpen(false)} />
          <MobileSection title="Learn" links={explainerLinks} onClick={() => setOpen(false)} />
          <Link href="/contact/" className="block py-2 text-sm text-accent" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/login/" className="block py-2 text-sm text-accent" onClick={() => setOpen(false)}>Log in</Link>
            <Link href="/signup/" className="block rounded-md bg-primary py-2 text-center text-sm font-semibold text-background" onClick={() => setOpen(false)}>Get started</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavSection({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setShow(false);
      }}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium text-accent hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-expanded={show}
        aria-haspopup="menu"
        onClick={() => setShow((v) => !v)}
      >
        {title}
      </button>
      {show && (
        <div role="menu" className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-surface bg-surface p-2 shadow-xl">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              role="menuitem"
              className="block rounded px-3 py-2 text-sm text-accent hover:bg-background hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setShow(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileSection({ title, links, onClick }: { title: string; links: { label: string; href: string }[]; onClick: () => void }) {
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase text-muted">{title}</p>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="block py-2 text-sm text-accent" onClick={onClick}>
          {l.label}
        </Link>
      ))}
    </div>
  );
}
