import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { adminAuth, db } from "@/lib/firebase-admin";

export const authOptions = {
  adapter: FirestoreAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const userRecord = await adminAuth.getUserByEmail(credentials.email);
          
          const verifyPasswordUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`;
          const resp = await fetch(verifyPasswordUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              returnSecureToken: true,
            }),
          });

          if (!resp.ok) return null;

          return {
            id: userRecord.uid,
            name: userRecord.displayName,
            email: userRecord.email
          };
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }: { user: { email: string }; account: { provider?: string } }) {
      if (account?.provider === "google") {
        try {
          await adminAuth.getUserByEmail(user.email!);
          return false; // Existing user - block Google sign-in
        } catch (error) {
          return true; // New user - allow Google sign-up
        }
      }
      return true;
    },
    session: ({ session, token }: { session: any; token: any }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  pages: {
    signIn: "/signin",
    // newUser: "/signup",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth({
  ...authOptions as NextAuthOptions,
  session: {
    strategy: "jwt" as const,
  }
});
export { handler as GET, handler as POST };
