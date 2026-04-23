'use client';

import { useState, useRef } from 'react';
import { insforge } from '@/lib/insforge';
import { company } from '@/config/site';

const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_MS = 30000; // 30 seconds between submissions

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 500);
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General inquiry');
  const [message, setMessage] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const lastSubmitRef = useRef(0);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!isValidEmail(email)) next.email = 'Please enter a valid email address';
    if (!subject.trim()) next.subject = 'Subject is required';
    if (!message.trim()) next.message = 'Message is required';
    else if (message.length > MAX_MESSAGE_LENGTH)
      next.message = `Message must be under ${MAX_MESSAGE_LENGTH} characters`;

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const now = Date.now();
    if (now - lastSubmitRef.current < RATE_LIMIT_MS) {
      setStatus('error');
      setStatusMsg('Please wait a moment before submitting again.');
      return;
    }
    lastSubmitRef.current = now;

    setStatus('submitting');
    setStatusMsg('');
    setErrors({});

    const { error } = await insforge.database
      .from('contact_submissions')
      .insert([
        {
          name: sanitizeInput(name),
          email: sanitizeInput(email),
          subject: sanitizeInput(subject),
          company: sanitizeInput(companyName),
          message: message.trim().slice(0, MAX_MESSAGE_LENGTH),
        },
      ]);

    if (error) {
      setStatus('error');
      setStatusMsg('Something went wrong. Please try again later.');
      console.error('Contact form error:', error);
      return;
    }

    setStatus('success');
    setStatusMsg('Thank you. We will respond within one business day.');
    setName('');
    setEmail('');
    setSubject('General inquiry');
    setMessage('');
    setCompanyName('');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="cf-name" className="block text-sm font-medium text-accent">
          Name *
        </label>
        <input
          id="cf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-surface bg-background px-3 py-2 text-sm text-white outline-none focus:border-primary"
          placeholder="Your name"
          disabled={status === 'submitting'}
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'cf-name-error' : undefined}
        />
        {errors.name && <p id="cf-name-error" className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="cf-email" className="block text-sm font-medium text-accent">
          Email *
        </label>
        <input
          id="cf-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-surface bg-background px-3 py-2 text-sm text-white outline-none focus:border-primary"
          placeholder="you@company.com"
          disabled={status === 'submitting'}
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'cf-email-error' : undefined}
        />
        {errors.email && <p id="cf-email-error" className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="cf-subject" className="block text-sm font-medium text-accent">
          Subject *
        </label>
        <select
          id="cf-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1 block w-full rounded-md border border-surface bg-background px-3 py-2 text-sm text-white outline-none focus:border-primary"
          disabled={status === 'submitting'}
        >
          <option>General inquiry</option>
          <option>Sales</option>
          <option>Support</option>
          <option>Security report</option>
          <option>Privacy request</option>
          <option>Other</option>
        </select>
        {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="cf-company" className="block text-sm font-medium text-accent">
          Company
        </label>
        <input
          id="cf-company"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-surface bg-background px-3 py-2 text-sm text-white outline-none focus:border-primary"
          placeholder="Company name"
          disabled={status === 'submitting'}
          autoComplete="organization"
        />
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium text-accent">
          Message *
        </label>
        <textarea
          id="cf-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 block w-full rounded-md border border-surface bg-background px-3 py-2 text-sm text-white outline-none focus:border-primary"
          placeholder="Tell us about your governance goals..."
          disabled={status === 'submitting'}
          maxLength={MAX_MESSAGE_LENGTH}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
        />
        <p className="mt-1 text-right text-xs text-muted">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </p>
        {errors.message && <p id="cf-message-error" className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-background hover:bg-secondary disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </button>

      <div role="status" aria-live="polite" className="min-h-[1.25rem]">
        {status === 'success' && (
          <p className="text-sm text-green-400">{statusMsg}</p>
        )}
        {status === 'error' && <p className="text-sm text-red-400">{statusMsg}</p>}
      </div>

      <p className="mt-4 text-xs text-muted">
        Submissions are stored securely and reviewed within one business day.
        For sensitive issues, email{' '}
        <a href="mailto:hello@developer312.com" className="text-primary hover:underline">{company.email}</a>
        {' '}directly.
      </p>
    </form>
  );
}
