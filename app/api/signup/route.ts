import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const emailSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export const POST = async (req: Request) => {
  const body = await req.json();

  let html_th: string;
  let html_en: string;

  const { searchParams } = new URL(req.url);
  const languageParams = searchParams.get("language");
  if (!languageParams)
    return NextResponse.json({ success: false }, { status: 400 });

  const parsed = emailSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );

  try {
    html_en = fs.readFileSync(
      path.join(process.cwd(), "app", "templates", "verify_en.html"),
      "utf-8",
    );
    html_th = fs.readFileSync(
      path.join(process.cwd(), "app", "templates", "verify_th.html"),
      "utf-8",
    );
  } catch (error) {
    console.log("Template read error: ", error);
    return NextResponse.json(
      { success: false, message: "Template read error" },
      { status: 500 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (user)
    return NextResponse.json(
      { success: false, message: "Email already exits" },
      { status: 400 },
    );

  const token = await jwt.sign(
    { email: parsed.data.email },
    process.env.JWT_SECRET!,
    { expiresIn: "30m" },
  );

  const html = (languageParams === "en" ? html_en : html_th)
    .replaceAll("APP_NAME", "Debt & Savings")
    .replace("LOGO_URL", process.env.LOGO_URL!)
    .replace(
      "{{VERIFY_URL}}",
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/auth/profiles?email=${parsed.data.email}`,
    );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `Debt & Savings Web App <no-reply@${process.env.NEXT_PUBLIC_DOMAIN_URL}>`,
      to: parsed.data.email,
      subject:
        languageParams === "en" ? "Verify your email" : "ยืนยันอีเมลของคุณ",
      html,
    });
  } catch (error) {
    console.log("Email send failed: ", error);
    return NextResponse.json(
      { success: false, message: "Email send failed" },
      { status: 500 },
    );
  }

  await prisma.emailToken.create({
    data: {
      email: parsed.data.email,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30),
    },
  });

  const res = NextResponse.json({ success: true });

  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 30,
  });

  return res;
};
