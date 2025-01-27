import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const navLinks = [
  { title: 'SPERO', href: '/' },
  { title: 'ABOUT', href: '/about-us' },
  { title: 'STATEMENT OF FAITH', href: '/statement-of-faith' },
  { title: 'TEAM', href: '/team' },
  { title: 'DESIGNS', href: '/designs' },
  { title: 'SHOP', href: '/shop' },
  { title: 'FAQ', href: '/FAQ' },
];

export default function ExternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar links ={navLinks} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
