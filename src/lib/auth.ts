import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getUserByEmail } from './users';

export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === 'google' && user.email) {
        // Only allow Google sign-in for users on the allowlist.
        return !!(await getUserByEmail(user.email));
      }
      return false;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'google' && user?.email) {
        const appUser = await getUserByEmail(user.email);
        token.permissions = appUser?.permissions ?? [];
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.permissions = token.permissions ?? [];
      }
      return session;
    },
  },
  theme: {
    colorScheme: 'light',
    logo: '/images/logo.png',
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
