import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const REQUEST_VALIDATOR = z.object({
    id: z.string(),
}).strict()

export const POST = async (req: NextRequest) => {
    try {
        const authHeader = req.headers.get('Authorization');

        if (!authHeader) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        if (!authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'Invalid Authorization header format. Expected "Bearer <API_KEY>" ' }, { status: 401 });
        }

        const apiKey = authHeader.split(" ")[1]

        if (!apiKey || apiKey.trim() == '') {
            return NextResponse.json({ message: 'Invalid API Key' }, { status: 401 });
        }

        const user = await db.user.findUnique({
            where: {
                apiKey: apiKey
            },
            include: {
                //EventCategories: true
            }
        })

        if (!user) {
            return NextResponse.json({ message: 'Invalid API Key' }, { status: 401 });
        }
    } catch (error) {
        console.log(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.message }, { status: 422 });
        }

        return NextResponse.json({ message: 'An error occurred', error: error }, { status: 500 });

    }
}
