'use client';

import { useState, useEffect, useRef } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import './styles/NavBar.css';

interface LinkInfo {
  title: string;
  href: string;
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
  const isAboutPage = pathname === '/about-us';

  // Transparent only over hero images up top (home + about cover).
  const transparentEligible = isHomePage || isAboutPage;
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
            {leftLinks.map((link) => (
              <NextLink key={link.title} href={link.href} className="spero-nav-link">
                {link.title}
              </NextLink>
            ))}
          </nav>

          <NextLink href="/" className="spero-nav-logo" aria-label="Spero home">
            SPERO
          </NextLink>

          <nav className="spero-nav-links spero-nav-links--right">
            {rightLinks.map((link) => (
              <NextLink key={link.title} href={link.href} className="spero-nav-link">
                {link.title}
              </NextLink>
            ))}
          </nav>
        </div>

        <div className="spero-nav-mobile" aria-hidden={!isOpen}>
          {links.map((link) => (
            <NextLink
              key={link.title}
              href={link.href}
              className="spero-nav-mobile-link"
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </NextLink>
          ))}
        </div>
      </header>

      {/* Spacer when nav is solid so content isn't hidden under fixed nav */}
      {!transparentEligible && <div className="spero-nav-spacer" />}
    </>
  );
}
