import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const schems = z.object({
    categoryId: z.string(),
    amount: z.int32(),
    note: z.string(),
    date: z.date()
})

export const POST = async (req: Request) => {
    const body = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload & { id: string }

    const parsed = schems.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, error: z.treeifyError(parsed.error) }, { status: 400 });

    const { amount, note, date, categoryId } = parsed.data;

    const transaction = await prisma.transaction.create({
        data: {
            amount,
            note,
            date,
            categoryId,
            userId: decoded.id,
        }
    })
}