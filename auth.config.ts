import credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/app/schemas";
import { getUserByEmail } from "@/data/user";
import { db } from "./lib/db";

export default {
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({user}) {
            await db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                    username: profile.login,
                };
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        credentials({
            async authorize(credentials) {
            const validatedFields = await loginSchema.safeParse(credentials);

            if(validatedFields.success) {
                const { email, password } = validatedFields.data;
                const user = await getUserByEmail(email);
                if(!user || !user.password) {
                    return null;
                }
                const passwordMatch = await bcrypt.compare(password, user.password);
                if(passwordMatch) {
                    return user;
                }}
            return null;
        }})
    ],
} satisfies NextAuthConfig