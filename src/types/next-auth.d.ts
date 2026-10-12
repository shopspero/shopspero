import type { DefaultSession } from 'next-auth';
import type { Permission } from '@/lib/users';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      permissions?: Permission[];
    };
  }

  interface User {
    permissions?: Permission[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    permissions?: Permission[];
  }
}
