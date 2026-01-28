import React from "react";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const schems = z.object({
    email: z.email(),
    name: z.string(),
    password: z
        .string()
        .min(6, "รหัสผ่านต้องยาวอย่างน้อย 6 ตัว")
        .regex(/[A-Z]/, "ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
        .regex(/[a-z]/, "ต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว")
        .regex(/[0-9]/, "ต้องมีตัวเลขอย่างน้อย 1 ตัว")
})

export const POST = async (req: Request) => {
    const body = await req.json();    

    const parsed = schems.safeParse(body);
    console.log(parsed.data);
    
    if (!parsed.success) return NextResponse.json({ success: false, error: z.treeifyError(parsed.error)}, {status: 400});

    const { email, name, password } = parsed.data;

    const existing = await prisma.user.findUnique({
        where: { email }
    });
    if (existing) return NextResponse.json({ success: false, message: "Email already exits" });

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email,
            name,
            password: hashed
        }
    })

    const res = NextResponse.json({ success: true })

    return res
}