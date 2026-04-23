import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-6xl font-extrabold text-white">404</h1>
      <p className="mt-4 text-lg text-muted">The page you are looking for does not exist or has been moved.</p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-background hover:bg-secondary"
        >
          Go home
        </Link>
        <Link
          href="/contact/"
          className="rounded-md border border-surface px-5 py-2.5 text-sm font-medium text-white hover:bg-surface"
        >
          Contact support
        </Link>
      </div>
    </div>
  );
}
