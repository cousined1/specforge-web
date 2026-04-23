import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { company, metaDefaults } from '@/config/site';
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import CookieConsentWrapper from '@/components/cookie-consent/CookieConsentWrapper';
import ChatWidget from '@/components/chatbot/ChatWidget';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: { default: metaDefaults.defaultTitle, template: metaDefaults.titleTemplate },
  description: metaDefaults.defaultDescription,
  metadataBase: new URL(company.baseUrl),
  openGraph: {
    siteName: company.productName,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0C10',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.name,
  description: company.fullIdentity,
  url: company.baseUrl,
  email: company.email,
  telephone: company.phone,
  parentOrganization: {
    '@type': 'Organization',
    name: 'NIGHT LITE USA LLC',
  },
  sameAs: [company.baseUrl],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: company.productName,
  url: company.baseUrl,
  publisher: {
    '@type': 'Organization',
    name: company.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd id="ld-site" data={[organizationSchema, websiteSchema]} />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-accent antialiased">
        <CookieConsentProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsentWrapper />
          <ChatWidget />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
