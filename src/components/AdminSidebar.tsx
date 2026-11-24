'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import './styles/AdminSidebar.css';

interface NavLink {
  title: string;
  href: string;
}

export default function AdminSidebar({
  links,
  signOutLink,
}: Readonly<{ links: NavLink[]; signOutLink: NavLink }>) {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-top">
        <NextLink href="/" className="admin-sidebar-logo">
          SPERO
        </NextLink>
        {links.map((link) => (
          <NextLink
            key={link.title}
            href={link.href}
            className={
              'admin-sidebar-link' +
              (pathname === link.href ? ' admin-sidebar-link--active' : '')
            }
          >
            {link.title}
          </NextLink>
        ))}
      </div>

      <NextLink href={signOutLink.href} className="admin-sidebar-signout">
        {signOutLink.title}
      </NextLink>
    </aside>
  );
}
