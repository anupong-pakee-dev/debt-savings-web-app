import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";
import { CategoryType } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const newCategorySchema = z.object({
    type: z.string().uppercase(),
    name: z.string(),
})

export const GET = async (req: Request) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload & { id: string };
    if (!decoded) return NextResponse.json({success: false}, {status: 400});

    const { searchParams } = new URL(req.url);
    const typeParams = searchParams.get("type")
    if (!typeParams) return NextResponse.json({success: false}, { status: 400 });

    const data = await prisma.category.findMany({
        where: { type: typeParams as CategoryType },
        select: {
            id: true,
            name: true
        }
    })

    return NextResponse.json({success: true, data})
}

export const POST = async (req: Request) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload & { id: string }
    if (!decoded) return NextResponse.json({success: false}, {status: 400});

    const body = await req.json();

    const parsed = newCategorySchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, error: z.treeifyError(parsed.error) }, { status: 400 });
    const { name, type } = parsed.data;

    const data = await prisma.category.create({
        data: {
            type: type as CategoryType,
            name,
            userId: decoded.id
        }
    })

    return NextResponse.json({success: true, data})
}