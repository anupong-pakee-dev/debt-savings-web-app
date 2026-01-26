import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/app/lib/prisma';
import { z } from 'zod';
import { NextResponse } from 'next/server';

const schema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(6, "รหัสผ่านต้องยาวอย่างน้อย 6 ตัว")
        .regex(/[A-Z]/, "ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
        .regex(/[a-z]/, "ต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว")
        .regex(/[0-9]/, "ต้องมีตัวเลขอย่างน้อย 1 ตัว")
})

export const POST = async (req: Request) => {
    const body = await req.json();

    const parsed = await schema.safeParse(body);
    if (!parsed.success) return NextResponse.json(z.treeifyError(parsed.error), {status: 400});

    const user = await prisma.user.findUnique({
        where: { email: parsed.data.email }
    })
    if (!user) return NextResponse.json({ success: false, message: "Email not found" }, {status: 401});

    const compare = await bcrypt.compare(parsed.data.password, user.password!);
    if (!compare) return NextResponse.json({success: false, message: "Password incorrect"}, {status: 401});

    const token = await jwt.sign(
        {email: parsed.data.email},
        process.env.JWT_SECRET!,
        { expiresIn: "60m" }
    )

    const res = NextResponse.json({success: true});

    res.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/dashboard",
        maxAge: 60 * 60,
    })

    return res
}