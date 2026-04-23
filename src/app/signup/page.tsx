'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';
import { stripe, company } from '@/config/site';

const MIN_PASSWORD_LENGTH = 8;

function calculatePasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= MIN_PASSWORD_LENGTH) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function passwordStrengthLabel(score: number): string {
  if (score <= 2) return 'Weak';
  if (score <= 3) return 'Fair';
  if (score <= 4) return 'Good';
  return 'Strong';
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [pwScore, setPwScore] = useState(0);

  function handlePasswordChange(val: string) {
    setPassword(val);
    setPwScore(calculatePasswordStrength(val));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Name is required');
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      return;
    }
    if (calculatePasswordStrength(password) < 3) {
      setError('Password is too weak. Include uppercase, lowercase, numbers, and symbols.');
      return;
    }

    setLoading(true);
    const { data, error: signUpError } = await insforge.auth.signUp({
      email: trimmedEmail,
      password,
      name: trimmedName,
      redirectTo: `${window.location.origin}/login/`,
    });
    setLoading(false);

    if (signUpError) {
      const msg = signUpError.message || '';
      if (msg.toLowerCase().includes('already') && msg.toLowerCase().includes('registered')) {
        setError('An account with this email already exists. Please log in.');
      } else if (msg.toLowerCase().includes('weak')) {
        setError('Password is too weak. Please choose a stronger password.');
      } else {
        setError(msg || 'Sign up failed. Please try again.');
      }
      return;
    }

    if (data?.requireEmailVerification) {
      setCreated(true);
      return;
    }
    if (data?.accessToken) {
      router.push('/dashboard/');
      return;
    }
    setError('Something went wrong. Please try again.');
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

  if (created) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 md:py-24">
        <div className="rounded-2xl border border-surface bg-surface p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Check your email</h1>
          <p className="mt-4 text-sm text-muted">
            We sent a verification link to{' '}
            <span className="font-medium text-accent">{email}</span>. Click the link to activate your account.
          </p>
          <p className="mt-6 text-sm text-muted">
            Did not receive it? Check your spam folder or{' '}
            <button type="button" onClick={() => { setCreated(false); setEmail(''); }} className="text-primary underline">
              try again
            </button>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 md:py-24">
      <div className="rounded-2xl border border-surface bg-surface p-8">
        <h1 className="text-2xl font-bold text-white">Sign up</h1>
        {error && (
          <div role="alert" className="mt-4 rounded-md border border-red-400/20 bg-red-400/10 p-3">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="su-name" className="block text-sm font-medium text-accent">Name</label>
            <input
              id="su-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-surface bg-background px-3 py-2 text-sm text-white outline-none focus:border-primary"
              placeholder="Your name"
              disabled={loading}
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="su-email" className="block text-sm font-medium text-accent">Email</label>
            <input
              id="su-email"
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
            <label htmlFor="su-password" className="block text-sm font-medium text-accent">Password</label>
            <input
              id="su-password"
              type="password"
              required
              minLength={MIN_PASSWORD_LENGTH}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="mt-1 block w-full rounded-md border border-surface bg-background px-3 py-2 text-sm text-white outline-none focus:border-primary"
              disabled={loading}
              autoComplete="new-password"
            />
            {password && (
              <div className="mt-1">
                <div className="h-1 w-full rounded-full bg-surface">
                  <div
                    className={`h-1 rounded-full transition-all ${pwScore <= 2
                      ? 'w-1/4 bg-red-400'
                      : pwScore <= 3
                        ? 'w-2/4 bg-yellow-400'
                        : pwScore <= 4
                          ? 'w-3/4 bg-green-400'
                          : 'w-full bg-green-400'
                      }`}
                  />
                </div>
                <p className="mt-1 text-xs text-muted">
                  Strength:{' '}
                  <span className={`font-medium ${pwScore <= 2 ? 'text-red-400' : pwScore <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {passwordStrengthLabel(pwScore)}
                  </span>
                </p>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-background hover:bg-secondary disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-surface" />
          <span className="text-xs text-muted">or</span>
          <div className="h-px flex-1 bg-surface" />
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

        <div className="mt-6 border-t border-surface pt-4">
          <p className="text-xs leading-relaxed text-muted">
            By signing up, you agree to our <Link href="/terms/" className="underline">Terms of Service</Link> and <Link href="/privacy/" className="underline">Privacy Policy</Link>.
            {' '}{stripe.renewNotice} {stripe.taxNotice} {stripe.limitNotice}{' '}
            {stripe.processingNotice} {stripe.changeNotice}{' '}
            {stripe.responsibilityNotice}
          </p>
          <p className="mt-2 text-xs text-muted">{company.fullIdentity}</p>
        </div>
      </div>
    </div>
  );
}
