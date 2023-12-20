import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const navLinks = [
  { title: 'SPERO', href: '/' },
  { title: 'TEAM', href: '/team' },
  { title: 'DESIGNS', href: '/designs' },
  { title: 'SHOP', href: '/shop' },
];

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar links={navLinks} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
