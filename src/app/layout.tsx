import { Providers } from '@/app/providers';

import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Spero',
  description:
    'A UC Berkeley student-run philanthropic fashion company aimed to share the gospel.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>
          <div
            style={{
              minHeight: '100vh',
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
            }}
          >
            <NavBar />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
