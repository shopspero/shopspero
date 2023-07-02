'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, baseTheme, extendTheme } from '@chakra-ui/react';

import { Lexend_Deca } from 'next/font/google';
import { Tenor_Sans } from 'next/font/google';

const lexendDeca = Lexend_Deca({ subsets: ['latin'] });
const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'] });

const theme = extendTheme({
  styles: {
    global: {
      body: lexendDeca.style,
    },
  },
  components: {
    Heading: {
      baseStyle: tenorSans.style,
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
            height: '2px',
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

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
