import { j } from "./__internals/j"
import { auth } from "@/lib/auth/better-auth";
import { db } from "@/lib/db";
import { HTTPException } from "hono/http-exception";

const authMiddleware = j.middleware(async ({ c, next }) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
        throw new HTTPException(401, { message: "Unauthorized, caught from middleware" })
    }
    const user = await db.user.findUnique({
        where: {
            id: session?.user.id
        }
    })
    if (!user) {
        throw new HTTPException(401, { message: "Unauthorized, caught from middleware" })
    }
    return next({ user, session })
})

export const baseProcedure = j.procedure
export const publicProcedure = baseProcedure
export const privateProcedure = baseProcedure.use(authMiddleware)
