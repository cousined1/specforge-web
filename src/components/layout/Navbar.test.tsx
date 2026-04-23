import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { AnchorHTMLAttributes } from 'react';

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders product, solutions, and learn triggers collapsed by default', () => {
    render(<Navbar />);
    const triggers = ['Product', 'Solutions', 'Learn'];
    for (const name of triggers) {
      const button = screen.getByRole('button', { name });
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'menu');
    }
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens the Product dropdown on hover and flips aria-expanded', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const trigger = screen.getByRole('button', { name: 'Product' });

    await user.hover(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const menu = screen.getByRole('menu');
    expect(within(menu).getByRole('menuitem', { name: 'Platform' })).toHaveAttribute('href', '/product/');
    expect(within(menu).getByRole('menuitem', { name: 'Pricing' })).toHaveAttribute('href', '/pricing/');
  });

  it('closes the dropdown on unhover', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const trigger = screen.getByRole('button', { name: 'Solutions' });

    await user.hover(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.unhover(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('mobile hamburger toggles aria-expanded and renders #mobile-menu', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const hamburger = screen.getByRole('button', { name: /toggle menu/i });

    expect(hamburger).toHaveAttribute('type', 'button');
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(hamburger).toHaveAttribute('aria-controls', 'mobile-menu');
    expect(document.getElementById('mobile-menu')).toBeNull();

    await user.click(hamburger);

    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById('mobile-menu')).not.toBeNull();

    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById('mobile-menu')).toBeNull();
  });

  it('clicking a mobile nav link closes the mobile menu', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const hamburger = screen.getByRole('button', { name: /toggle menu/i });

    await user.click(hamburger);
    const menu = document.getElementById('mobile-menu');
    expect(menu).not.toBeNull();

    const contactLink = within(menu as HTMLElement).getByRole('link', { name: 'Contact' });
    await user.click(contactLink);

    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById('mobile-menu')).toBeNull();
  });

  it('exposes the primary auth links in the desktop bar', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation');
    const login = within(nav).getByRole('link', { name: /^log in$/i });
    const signup = within(nav).getByRole('link', { name: /get started/i });
    expect(login).toHaveAttribute('href', '/login/');
    expect(signup).toHaveAttribute('href', '/signup/');
  });
});

