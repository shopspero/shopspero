import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          return { id: '0', name: 'shopspero', email: 'shopspero@gmail.com' };
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
