"use server";

import { loginSchema } from "@/app/schemas/index";
import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";

import { AuthError } from "next-auth";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { cp } from "fs";

export const login = async (values: z.infer<typeof loginSchema>, callbackUrl?: string | null) => {
    const validatedFields = loginSchema.safeParse(values);

    if(!validatedFields.success) {
        return {
            error: "Invalid email or password!"
        };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password) {
        return {
            error: "Email does not exist!"
        };
    }

    if(!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);

        // console.log(verificationToken);

        await sendVerificationEmail(
            verificationToken?.email as string,
            verificationToken?.token as string
        );

        return {
            success: "Confirmation email sent!",
        };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        });

        return {
            success: "Logged in successfully!"
        };
    } catch (error) {
        if(error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid email or password!"
                    };
                case "CallbackRouteError":
                    return {
                        error: "Callback route error!"
                    }
                default:
                    return {
                        error: "Something went wrong!"
                    };
            }
        }
        throw error;
    }
};