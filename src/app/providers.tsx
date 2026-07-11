'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { cormorant, lexendDeca } from '@/app/fonts';

const theme = extendTheme({
  // Align Chakra's responsive breakpoints with the site's canonical system
  // (see globals.css): mobile <640 · tablet 640–1023 · laptop 1024–1439 · desktop ≥1440.
  breakpoints: {
    sm: '640px',
    md: '1024px',
    lg: '1440px',
    xl: '1920px',
    '2xl': '2560px',
  },
  styles: {
    global: {
      body: lexendDeca.style,
    },
  },
  components: {
    Heading: {
      baseStyle: cormorant.style,
    },
    Link: {
      variants: {
        underline: {
          display: 'inline-block',
          position: 'relative',
          _after: {
            content: '""',
            position: 'absolute',
            width: '100%',
            transform: 'scaleX(0)',
            height: '1.5px',
            bottom: 0,
            left: 0,
            transformOrigin: 'bottom right',
            backgroundColor: 'gray.800',
            transition: 'transform 0.25s ease-out',
          },
          _hover: {
            textDecoration: 'none',
            _after: {
              transform: 'scaleX(1)',
              transformOrigin: 'bottom left',
            },
          },
        },
      },
    },
  },
});

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
