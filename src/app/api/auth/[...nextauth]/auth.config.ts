import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        // Validate input
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
          where: { email },
        });

        //testing to check user info gotten
       

        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        // Return user object (exclude sensitive data)
        return { id: user.id, firstName: user.firstName, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
        id: token.id as string,
        firstName: token.firstName as string || "",
        email: token.email as string || "",
    };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom sign-in page
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};



