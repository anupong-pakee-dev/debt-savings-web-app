import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/app/lib/prisma';
import { z } from 'zod';
import { NextResponse } from 'next/server';

const schema = z.object({
    email: z.email("Invalid email format"),
    password: z
        .string()
        .min(6, "The password must be at least 6 characters long.")
        .regex(/[A-Z]/, "At least one letter must be capitalized.")
        .regex(/[a-z]/, "At least one lowercase letter must be included.")
        .regex(/[0-9]/, "There must be at least one number.")
})

export const POST = async (req: Request) => {
    const body = await req.json();

    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json(z.treeifyError(parsed.error), {status: 400});
    
    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
        where: { email }
    })
    if (!user) return NextResponse.json({ success: false, message: "Email not found" }, {status: 401});    

    const compare = await bcrypt.compare(password, user.password!);
    if (!compare) return NextResponse.json({success: false, message: "Password incorrect"}, {status: 401});

    const token = jwt.sign(
        {id: user.id, email},
        process.env.JWT_SECRET!,
        { expiresIn: "60m" }
    )

    const res = NextResponse.json({success: true});
    res.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60,
    })

    return res
}