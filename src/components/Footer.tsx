import Link from 'next/link';
import { FaFacebook, FaInstagram, FaMedium, FaDiscord } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import './styles/Footer.css';

interface SocialInfo {
  label: string;
  icon: IconType;
  href: string;
}

const socials: SocialInfo[] = [
  { label: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/shopspero/' },
  { label: 'Facebook',  icon: FaFacebook,  href: 'https://www.facebook.com/shopspero/' },
  { label: 'Medium',    icon: FaMedium,    href: 'https://shopspero.medium.com/' },
  { label: 'Discord',   icon: FaDiscord,   href: 'https://discord.gg/XPGyEFzpzH' },
];

const navLinks = [
  { label: 'Designs', href: '/designs' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about-us' },
  { label: 'Team', href: '/team' },
  { label: 'Statement of Faith', href: '/statement-of-faith' },
];

export default function Footer() {
  return (
    <footer className="spero-footer">
      <div className="spero-footer-inner">
        <div className="spero-footer-col spero-footer-col--brand">
          <Link href="/" className="spero-footer-mark">SPERO</Link>
          <p className="spero-footer-tagline">
            A college student-run, gospel-centered apparel project.
          </p>
        </div>

        <nav className="spero-footer-col">
          <p className="eyebrow">Explore</p>
          <ul className="spero-footer-links">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="spero-footer-col">
          <p className="eyebrow">Connect</p>
          <a href="mailto:shopspero@gmail.com" className="spero-footer-email">
            shopspero@gmail.com
          </a>
          <ul className="spero-footer-socials">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="spero-footer-bar">
        <p>© {new Date().getFullYear()} Spero</p>
        <p className="spero-footer-verse">Matthew 10:29-31</p>
      </div>
    </footer>
  );
}
