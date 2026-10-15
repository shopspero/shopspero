import type { DefaultSession } from 'next-auth';
import type { Permission } from '@/lib/users';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      permissions?: Permission[];
      title?: string;
    };
  }

  interface User {
    permissions?: Permission[];
    title?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    permissions?: Permission[];
    title?: string;
  }
}
