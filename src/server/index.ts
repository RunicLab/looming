import { Hono } from "hono"
import { cors } from "hono/cors"
import { handle } from "hono/vercel"
import { auth, AuthType } from "@/lib/auth/better-auth"


const api = new Hono<{
    Variables: {
        user: AuthType["$Infer"]["Session"]["user"] | null;
        session: AuthType["$Infer"]["Session"]["session"] | null;
    }
}>().basePath('/api').use(cors())
api.on(["POST", "GET"], "/auth/**", (c) => {
    return auth.handler(c.req.raw);
});

api.get("/health", async (c) => {
    if (c.get("user")) {
        return c.json({ message: `pong ${c.get("user")?.name}` })
    }
    return c.json({ message: "pong" });
})

const appRouter = api

appRouter.all("*", (c) => {
    console.log(`[404] Request raw: ${JSON.stringify(c.req.raw)}`);
    return c.json({
        error: `Route not found ${c.get("user")?.name}`,
        path: c.req.path,
        method: c.req.method
    }, 404);
});

export const httpHandler = handle(api)
export default api
export type AppType = typeof appRouter
