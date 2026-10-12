import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { getUserByEmail, type Permission } from './users';

export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          // Legacy shared-password login keeps full access while it's phased out.
          return {
            id: '0',
            name: 'shopspero',
            email: 'shopspero@gmail.com',
            permissions: ['*'] as Permission[],
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === 'credentials') {
        return true;
      }
      if (account?.provider === 'google' && user.email) {
        // Only allow Google sign-in for users on the allowlist.
        return !!(await getUserByEmail(user.email));
      }
      return false;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'credentials' && user) {
        token.permissions = (user as { permissions?: Permission[] }).permissions ?? [];
      } else if (account?.provider === 'google' && user?.email) {
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
