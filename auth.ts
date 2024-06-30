import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth accounts to sign in without email verification
            if (account?.provider !== "credentials") {
                return true;
            }

            // Ensure the user has verified their email
            const existingUser = await getUserById(user.id as string);

            if (!existingUser?.emailVerified) {
                return false;
            }

            // TODO: Add 2FA check here

            return true;
        },
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            return session;
        },
        async jwt({token}) {
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})