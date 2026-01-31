import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const schems = z.object({
    type: z.string().uppercase(),
    name: z.string(),
    userId: z.string(),
})

export const GET = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload & { id: String };
}