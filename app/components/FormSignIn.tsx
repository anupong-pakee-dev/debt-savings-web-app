"use client"

import React from "react";
import axios from "axios";
import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/navigation"
import { Button, Input } from "./Components"

const schems = z.object({
    email: z.email("Invalid email format"),
    password: z
        .string()
        .min(6, "The password must be at least 6 characters long.")
        .regex(/[A-Z]/, "At least one letter must be capitalized.")
        .regex(/[a-z]/, "At least one lowercase letter must be included.")
        .regex(/[0-9]/, "There must be at least one number.")
})

export default function FormSignIn() {
    const [data, setData] = React.useState({
        email: "",
        password: ""
    })

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const parsed = schems.safeParse(data);
        if (!parsed.success) {
            console.log(z.treeifyError(parsed.error));
            return;
        }

        await axios.post(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/signin/" + "en", parsed.data)
            .then((res) => {
                console.log(res.data);
                router.push("/dashboard")
            })
            .catch((res) => console.error(res))
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center p-2 mb-4 border-2 rounded-2xl">
                <label className="text-sm w-18 md:w-16">อีเมล์: </label>
                <Input type="email" name="email" className="pl-2" placeholder="example@example.com" onChange={handleChange} />
            </div>
            <div className="flex items-center p-2 mb-4 border-2 rounded-2xl">
                <label className="text-sm w-18 md:w-16">รหัสผ่าน: </label>
                <Input type="password" name="password" className="pl-2" placeholder="กรอกรหัสผ่านของคุณ" onChange={handleChange} />
            </div>
            <div className="flex justify-between items-center p-2 mb-4">
                <Link href={"/auth/forgotpassword"}>ลืมรหัสผ่าน</Link>
                <Link href={"/auth/signup"}>สมัครใช้งาน</Link>
            </div>
            <Button type="submit" className="cursor-pointer text-black">เข้าสู่ระบบ</Button>
        </form>
    )
}