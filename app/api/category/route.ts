import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";
import { CategoryType } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload & { id: String };
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