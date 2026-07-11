import { Providers } from '@/app/providers';
import { cormorant, lexendDeca } from '@/app/fonts';
import './globals.css';

export const metadata = {
  title: 'Spero',
  description:
    'A college student-run philanthropic fashion company aimed to share the gospel.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lexendDeca.variable} ${cormorant.variable}`}>
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
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
