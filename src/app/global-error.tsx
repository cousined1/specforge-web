'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log to external error monitoring service (e.g., Sentry, LogRocket)
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-accent">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-white">500</h1>
          <p className="mt-4 text-lg text-muted">Something went wrong on our end.</p>
          {process.env.NODE_ENV === 'development' && error.message && (
            <pre className="mx-auto mt-6 max-w-xl overflow-auto rounded-md border border-surface bg-surface p-4 text-left text-xs text-red-400">
              {error.message}
            </pre>
          )}
          <div className="mt-8 flex gap-4">
            <button
              onClick={reset}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-background hover:bg-secondary"
            >
              Try again
            </button>
            <Link
              href="/"
              className="rounded-md border border-surface px-5 py-2.5 text-sm font-medium text-white hover:bg-surface"
            >
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
