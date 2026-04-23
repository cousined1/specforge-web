'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setNeedsVerification(false);

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const { data, error: signInError } = await insforge.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });
    setLoading(false);

    if (signInError) {
      const msg = signInError.message?.toLowerCase() || '';
      if (msg.includes('email') && msg.includes('confirm')) {
        setNeedsVerification(true);
      }
      setError(signInError.message || 'Invalid credentials');
      return;
    }

    if (data?.accessToken) {
      router.push('/dashboard/');
    } else {
      setError('Unable to complete sign in. Please try again.');
    }
  }

  async function handleOAuth(provider: 'google' | 'github') {
    try {
      const { data, error: oauthError } = await insforge.auth.signInWithOAuth({
        provider,
        redirectTo: `${window.location.origin}/dashboard/`,
      });
      if (oauthError) {
        setError(oauthError.message || 'OAuth failed');
        return;
      }
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('OAuth error:', err);
      setError('OAuth sign-in failed. Please try again.');
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 md:py-24">
      <div className="rounded-2xl border border-surface bg-surface p-8">
        <h1 className="text-2xl font-bold text-white">Log in</h1>
        {error && (
          <div role="alert" className="mt-4 rounded-md border border-red-400/20 bg-red-400/10 p-3">
            <p className="text-sm text-red-400">{error}</p>
            {needsVerification && (
              <p className="mt-1 text-xs text-red-300">
                Check your email for a verification link, or{' '}
                <Link href="/signup/" className="underline">sign up</Link> again.
              </p>
            )}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-accent">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-surface bg-background px-3 py-2 text-sm text-white outline-none focus:border-primary"
              placeholder="you@company.com"
              disabled={loading}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-accent">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-surface bg-background px-3 py-2 text-sm text-white outline-none focus:border-primary"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-background hover:bg-secondary disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Log in'}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-surface"></div>
          <span className="text-xs text-muted">or</span>
          <div className="h-px flex-1 bg-surface"></div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            disabled={loading}
            className="w-full rounded-md border border-surface py-2.5 text-sm font-medium text-white hover:bg-background disabled:opacity-50"
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth('github')}
            disabled={loading}
            className="w-full rounded-md border border-surface py-2.5 text-sm font-medium text-white hover:bg-background disabled:opacity-50"
          >
            Continue with GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Do not have an account?{' '}
          <Link href="/signup/" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
