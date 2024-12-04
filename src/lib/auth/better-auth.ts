import { CONFIG } from "@/utils/config";
import { db } from "@/lib/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins"

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled: true,
        async sendResetPassword(data, request) {
            // Send an email to the user with a link to reset their password
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    baseURL: CONFIG.URL,
    advanced: {
        crossSubDomainCookies: {
            enabled: true
        }
    },
    plugins: [
        username()
    ]
})

export type AuthType = typeof auth
