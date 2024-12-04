import { z } from "zod";
import { router } from "../__internals/router";
import { privateProcedure, publicProcedure } from "../procedures";
import { db } from "@/lib/db";

export const userRouter = router({
    checkIfUsernameExists: publicProcedure.input(
        z.object({
            username: z.string()
        })
    ).query(
        async ({ c, ctx, input }) => {
            const user = await db.user.findFirst({ where: { username: input.username } });
            if (user) {
                return c.json({ exists: true });
            }
            return c.json({ exists: false });
        }
    ),
    // endpoint to update the username
    updateUsername: privateProcedure.input(
        z.object({
            username: z.string()
        })
    ).mutation(
        async ({ c, ctx, input }) => {
            const user = await db.user.update({
                where: { id: ctx.user.id },
                data: { username: input.username }
            });
            return c.json(user);
        }
    ),

    //endpoint to get user data
    getUser: privateProcedure.query(
        async ({ c, ctx }) => {
            const user = await db.user.findUnique({ where: { id: ctx.user.id } });
            return c.json(user);
        }
    )
})
