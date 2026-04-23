import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const insertMock = vi.fn();
const fromMock = vi.fn((table: string) => {
  void table;
  return { insert: insertMock };
});

vi.mock('@/lib/insforge', () => ({
  insforge: {
    database: {
      from: (table: string) => fromMock(table),
    },
  },
}));

import ContactForm from './ContactForm';

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Name/), 'Alice Example');
  await user.type(screen.getByLabelText(/^Email/), 'alice@example.com');
  await user.type(screen.getByLabelText(/^Message/), 'Hello SpecGetter team.');
}

describe('ContactForm', () => {
  beforeEach(() => {
    insertMock.mockReset();
    fromMock.mockClear();
    insertMock.mockResolvedValue({ data: [{}], error: null });
  });

  it('reports validation errors for empty fields and does not call the SDK', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    expect(fromMock).not.toHaveBeenCalled();
    expect(insertMock).not.toHaveBeenCalled();
  });

  it('flags invalid email addresses', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^Name/), 'Alice');
    await user.type(screen.getByLabelText(/^Email/), 'not-an-email');
    await user.type(screen.getByLabelText(/^Message/), 'hi');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
    expect(fromMock).not.toHaveBeenCalled();
  });

  it('sets aria-invalid on fields that fail validation', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByLabelText(/^Name/)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/^Email/)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/^Message/)).toHaveAttribute('aria-invalid', 'true');
  });

  it('submits sanitized values to contact_submissions and shows success in the live region', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^Name/), '<script>Alice</script>');
    await user.type(screen.getByLabelText(/^Email/), 'alice@example.com');
    await user.type(screen.getByLabelText(/^Company/), 'Acme');
    await user.type(screen.getByLabelText(/^Message/), 'We need provenance tooling.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(fromMock).toHaveBeenCalledWith('contact_submissions');
    expect(insertMock).toHaveBeenCalledTimes(1);
    const payload = insertMock.mock.calls[0][0];
    expect(Array.isArray(payload)).toBe(true);
    expect(payload[0].name).toBe('scriptAlice/script');
    expect(payload[0].email).toBe('alice@example.com');
    expect(payload[0].company).toBe('Acme');
    expect(payload[0].message).toBe('We need provenance tooling.');

    const status = await screen.findByRole('status');
    expect(within(status).getByText(/thank you/i)).toBeInTheDocument();
  });

  it('surfaces a friendly error when the SDK returns an error', async () => {
    const user = userEvent.setup();
    insertMock.mockResolvedValueOnce({ data: null, error: { message: 'db down' } });
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    const status = await screen.findByRole('status');
    expect(within(status).getByText(/something went wrong/i)).toBeInTheDocument();
    errSpy.mockRestore();
  });

  it('rate-limits rapid submissions', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/thank you/i)).toBeInTheDocument();

    await fillValid(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    const status = await screen.findByRole('status');
    expect(within(status).getByText(/please wait/i)).toBeInTheDocument();
    expect(insertMock).toHaveBeenCalledTimes(1);
  });
});

