import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import NotFound from '@/components/NotFound';

export const metadata = {
  title: 'Not Found - Spero',
};

const navLinks = [
  { title: 'SPERO', href: '/' },
  { title: 'TEAM', href: '/team' },
  { title: 'DESIGNS', href: '/designs' },
  { title: 'SHOP', href: '/shop' },
];

export default function Page() {
  return (
    <>
      <NavBar links={navLinks} />
      <main>
        <NotFound />
      </main>
      <Footer />
    </>
  );
}
