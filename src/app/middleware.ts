import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {

    const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
            baseURL: request.nextUrl.origin,
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        },
    );
    if (!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    console.log("BUT THERE IS SESSION IN MIDDLEWARE, ", session)
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard"],
};
