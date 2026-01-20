import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const emailSchema = z.object({
    email: z.email()
})

export const POST = async (req: Request) => {
    const body = await req.json();

    const parsed = emailSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten(), status: 400 });

    await prisma.user.create({
        data: parsed.data
    })
    return NextResponse.json({ message: "Register success" })
};