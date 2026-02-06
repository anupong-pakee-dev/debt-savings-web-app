import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const schems = z.object({
    email: z.string().email("Invalid email format"),
    name: z.string(),
    password: z
        .string()
        .min(6, "The password must be at least 6 characters long.")
        .regex(/[A-Z]/, "At least one letter must be capitalized.")
        .regex(/[a-z]/, "At least one lowercase letter must be included.")
        .regex(/[0-9]/, "There must be at least one number.")
})

export const POST = async (req: Request) => {
    const body = await req.json();

    const parsed = schems.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, error: z.treeifyError(parsed.error) }, { status: 400 });
   
    const { email, name, password } = parsed.data;

    const existing = await prisma.user.findUnique({
        where: { email }
    });
    if (existing) return NextResponse.json({ success: false, message: "Email already exits" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashed
        }
    })
    await prisma.category.createMany({
        data: [
            { userId: user.id, type: "INCOME", name: "Salary" },
            { userId: user.id, type: "EXPENSE", name: "Food" },
            { userId: user.id, type: "EXPENSE", name: "Rent" },
            { userId: user.id, type: "EXPENSE", name: "Credit" },
        ]
    })

    const token = jwt.sign(
        { id: user.id, email },
        process.env.JWT_SECRET!,
        { expiresIn: "60m" })

    const res = NextResponse.json({ success: true })
    res.cookies.set("token", token)

    return res
}