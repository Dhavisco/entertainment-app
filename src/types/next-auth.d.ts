// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      firstName?: string | null; // Extend with firstName
    };
  }

  interface User {
    id: string;
    email: string;
    firstName?: string | null; // Extend with firstName
  }

  interface AdapterUser {
    firstName?: string | null; // Extend with firstName
  }
}
