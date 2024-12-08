import { BOX_NAME_VALIDATOR } from "@/validators/box";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { z } from "zod";
import { db } from "@/lib/db";
import { parseColor } from "@/lib/utils";

export const boxRouter = router({
    createBox: privateProcedure.input(z.object({
        name: BOX_NAME_VALIDATOR,
        color: z.string().min(1, "Color is required.").regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
        description: z.string().optional()
    })).mutation(async ({ input, c, ctx }) => {

        const box = await db.box.create({
            data: {
                userId: ctx.user.id,
                name: input.name,
                color: parseColor(input.color),
                description: input.description
            }
        });

        return c.json(box);
    }),

    deleteBox: privateProcedure.input(z.object({
        boxId: z.string(),
    })).mutation(async ({ input, c, ctx }) => {

        const box = await db.box.delete({
            where: {
                userId: ctx.user.id,
                id: input.boxId,
            }
        });

        return c.json(box);
    }),


    getUserBox: privateProcedure.query(
        async ({ c, ctx }) => {
            const boxes = await db.box.findMany({
                where: { userId: ctx.user.id },
            })
            return c.json(boxes);
        }
    )

})
