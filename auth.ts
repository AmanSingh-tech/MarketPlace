"user"

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/utils/db";

const handler = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("Authorize called with credentials:", credentials);
                
                if (!credentials?.username || !credentials?.password) {
                    console.log("Missing credentials");
                    return null;
                }

                try {
                    const user = await db.user.findUnique({
                        where: { username: credentials.username }
                    });
                    console.log("Found user:", user);

                    if (!user || !user.password) {
                        console.log("No user found or no password");
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    console.log("Password match:", passwordMatch);

                    if (!passwordMatch) {
                        console.log("Password doesn't match");
                        return null;
                    }
                    return user;

                } catch (error) {
                    console.error("Error in authorize:", error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days (adjust as needed)
        updateAge: 24 * 60 * 60, // Update token every day
    },
    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
            token.email = user.email;
          }
          return token;
        },
        async session({ session, token }) {
          session.user.id = token.id;
          session.user.email = token.email;
          return session;
        },
      },
    secret: process.env.NAUTH_SECRET,
    debug: true,
});

export const { auth, signIn, signOut } = handler;
export { handler as GET, handler as POST };