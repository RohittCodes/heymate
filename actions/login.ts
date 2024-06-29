"use server";

import { loginSchema } from "@/app/schemas/index";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(values);

    if(!validatedFields.success) {
        return {
            error: "Invalid email or password!"
        };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
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
                default:
                    return {
                        error: "Something went wrong!"
                    };
            }
        }
        throw error;
    }
};