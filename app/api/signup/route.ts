import fs from "fs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const emailSchema = z.object({
    email: z.email()
})

let html_th = fs.readFileSync("../templates/verify_th.html", "utf8");
let html_en = fs.readFileSync("../templates/verify_en.html", "utf8");


export const POST = async (req: Request, { params }: { params: { language: string } }) => {
    const body = await req.json();

    const parsed = emailSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    const user = await prisma.user.findUnique({
        where: { email: parsed.data?.email }
    });
    if (user) return NextResponse.json({ message: "Email already exits" }, { status: 400 });
    
    const token = await jwt.sign({ email: parsed.data.email }, process.env.JWT_SECRET!, { expiresIn: "30m" });
    
    html_th = html_th.replaceAll("APP_NAME", "Debt & Savings").replace("LOGO_URL", process.env.LOGO_URL!).replace("{{VERIFY_URL}}", `${process.env.VERIFY_URL}/profile?token=${token}`);
    html_en = html_en.replaceAll("APP_NAME", "Debt & Savings").replace("LOGO_URL", process.env.LOGO_URL!).replace("{{VERIFY_URL}}", `${process.env.VERIFY_URL}/profile?token=${token}`);
    const html = params.language == "en" ? html_en : html_th;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `Debt & Savings Web App <no-reply@${process.env.DOMAIN}>`,
        to: parsed.data.email,
        subject: params.language == "en" ? "Verify your email" : "ยืนยันอีเมลของคุณ",
        html
    })

    await prisma.emailToken.create({
        data: {
            token,
        }
    })

    return NextResponse.json({ message: "Register success" });
};