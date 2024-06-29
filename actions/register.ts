"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

import { registerSchema } from "@/app/schemas/index";
import { getUserByEmail, getUserByUsername } from "@/data/user";

export const register = async (values: z.infer<typeof registerSchema>) => {
    const revalidatedFields = registerSchema.safeParse(values);

    if(!revalidatedFields.success) {
        return {
            error: "Invalid fields!"
        }
    }

    const { email, password, username } = revalidatedFields.data;
    const hashPassword = await bcrypt.hash(password, 10);

    const existingEmail = await getUserByEmail(email);

    if(existingEmail) {
        return {
            error: "Email already exists!"
        };
    }

    const existingUsername = await getUserByUsername(username);

    if(existingUsername) {
        return {
            error: "Username already exists!"
        };
    }

    await db.user.create({
        data: {
            username,
            email,
            password: hashPassword
        }
    });

    // TODO: Send email to user for verification

    return {
        success: "User created!"
    };
};