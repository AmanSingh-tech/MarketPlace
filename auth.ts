import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/utils/db";

// Default export for NextAuth API route
export const { 
    handlers: 
        {GET, POST}, 
    auth, 
    signIn,
    signOut,
    } = NextAuth({
    pages: {
        error: "/auth/error",
        signIn: "/auth/signin"
    },
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "awhvish" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {  
                if (!credentials) return null;

                // Find the user in the database by username
                const user = await db.user.findUnique({
                    where: { username: credentials.username as string },
                });

                // If user exists and password is correct, return user
                if (user && user.password && await bcrypt.compare(credentials.password as string, user.password)) {
                    return {
                        ...user,
                        id: user.id.toString(), // Convert id to string
                    };
                }
                // Return null if authentication fails
                return null;
            },
        }),
    ],
    callbacks:{
        async signIn({user, account}) {
            if (account?.provider == "credentials") return true;
            //add 2fa stuff
            console.log("User logged in")
            return true;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
});