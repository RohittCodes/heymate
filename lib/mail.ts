import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_URL}/auth/verify-email?token=${token}`;

    await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL as string,
        to: email,
        subject: "Verify your email address",
        html: `
            <p>Click the link below to verify your email address:</p>
            <a href="${confirmLink}">Verify Email</a>
        `
    });
}   