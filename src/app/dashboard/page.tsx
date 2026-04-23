'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { insforge } from '@/lib/insforge';

interface UserProfile {
  name?: string;
  email?: string;
}

interface User {
  id: string;
  email: string;
  profile?: UserProfile;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutError, setLogoutError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await insforge.auth.getCurrentUser();
        if (cancelled) return;
        if (error || !data?.user) {
          router.push('/login/');
          return;
        }
        setUser(data.user as User);
      } catch (err) {
        if (cancelled) return;
        console.error('Auth check failed', err);
        router.push('/login/');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleLogout() {
    try {
      setLogoutError('');
      const { error } = await insforge.auth.signOut();
      if (error) {
        setLogoutError(error.message || 'Logout failed');
        return;
      }
      router.push('/');
    } catch (err) {
      console.error('Logout failed', err);
      setLogoutError('Logout failed. Please try again.');
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-muted">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            Welcome back, {user?.profile?.name || user?.email || 'User'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {logoutError && (
            <span className="text-sm text-red-400">{logoutError}</span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-surface px-4 py-2 text-sm font-medium text-white hover:bg-surface"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card
          title="Repositories"
          value="0"
          description="Connect your first repository to get started."
        />
        <Card
          title="Policy checks"
          value="0"
          description="No policy runs yet. Configure rules in settings."
        />
        <Card
          title="AI provenance tags"
          value="0"
          description="Enable AI provenance tagging to see data here."
        />
      </div>

      <div className="mt-10 rounded-xl border border-surface bg-surface p-8 text-center">
        <h2 className="text-xl font-semibold text-white">Getting started</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
          Your workspace is ready. Connect a Git provider, configure policies,
          and invite your team to begin generating provenance and policy data.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            href="/product/"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-background hover:bg-secondary"
          >
            Explore features
          </Link>
          <Link
            href="/pricing/"
            className="rounded-md border border-surface px-5 py-2.5 text-sm font-medium text-white hover:bg-background"
          >
            View plans
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-surface bg-surface p-6">
      <p className="text-xs font-semibold uppercase text-muted">{title}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </div>
  );
}
