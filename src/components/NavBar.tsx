'use client';

import { useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import './styles/NavBar.css';

interface LinkInfo {
  title: string;
  // A plain link has `href`; a dropdown has `children` instead.
  href?: string;
  children?: { title: string; href: string }[];
}

function NavDropdown({ link }: { link: LinkInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="spero-nav-dropdown" ref={ref}>
      <button
        className="spero-nav-link spero-nav-dropdown-trigger"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        {link.title}
      </button>
      {isOpen && (
        <div className="spero-nav-dropdown-menu">
          {link.children!.map((child) => (
            <NextLink
              key={child.title}
              href={child.href}
              className="spero-nav-dropdown-menu-link"
              onClick={() => setIsOpen(false)}
            >
              {child.title}
            </NextLink>
          ))}
        </div>
      )}
    </div>
  );
}

function NavLinks({ links }: { links: LinkInfo[] }) {
  return (
    <>
      {links.map((link) =>
        link.children ? (
          <NavDropdown key={link.title} link={link} />
        ) : (
          <NextLink key={link.title} href={link.href!} className="spero-nav-link">
            {link.title}
          </NextLink>
        )
      )}
    </>
  );
}

export default function NavBar({ links }: Readonly<{ links: LinkInfo[] }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollingDown, setScrollingDown] = useState(false);
  const prevScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsAtTop(currentY < 8);
      setScrollingDown(currentY > prevScrollY.current);
      prevScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';

  // Transparent only over the hero image up top (home).
  const transparentEligible = isHomePage;
  const isTransparent = transparentEligible && isAtTop;

  const half = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, half);
  const rightLinks = links.slice(half);

  const navClass = [
    'spero-nav',
    isTransparent ? 'spero-nav--transparent' : 'spero-nav--solid',
    isOpen ? 'spero-nav--open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={navClass}>
        <div className="spero-nav-inner">
          <button
            className="spero-nav-burger"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className="spero-nav-links spero-nav-links--left">
            <NavLinks links={leftLinks} />
          </nav>

          <NextLink href="/" className="spero-nav-logo" aria-label="Spero home">
            SPERO
          </NextLink>

          <nav className="spero-nav-links spero-nav-links--right">
            <NavLinks links={rightLinks} />
          </nav>
        </div>

        <div className="spero-nav-mobile" aria-hidden={!isOpen}>
          {links.map((link) =>
            link.children ? (
              <div key={link.title} className="spero-nav-mobile-group">
                <span className="spero-nav-mobile-group-title">{link.title}</span>
                {link.children.map((child) => (
                  <NextLink
                    key={child.title}
                    href={child.href}
                    className="spero-nav-mobile-link spero-nav-mobile-link--child"
                    onClick={() => setIsOpen(false)}
                  >
                    {child.title}
                  </NextLink>
                ))}
              </div>
            ) : (
              <NextLink
                key={link.title}
                href={link.href!}
                className="spero-nav-mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </NextLink>
            )
          )}
        </div>
      </header>

      {/* Spacer when nav is solid so content isn't hidden under fixed nav */}
      {!transparentEligible && <div className="spero-nav-spacer" />}
    </>
  );
}
