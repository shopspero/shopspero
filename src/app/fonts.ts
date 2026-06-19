import { Cormorant_Garamond, Lexend_Deca } from 'next/font/google';

export const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-serif',
});
