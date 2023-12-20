import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
