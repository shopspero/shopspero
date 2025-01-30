import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const navLinks = [
  { title: 'ABOUT', href: '/about-us' },
  { title: 'TEAM', href: '/team' },
  { title: 'STATEMENT OF FAITH', href: '/statement-of-faith' },
  { title: 'SHOP', href: '/shop' },
  { title: 'DESIGNS', href: '/designs' },
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
