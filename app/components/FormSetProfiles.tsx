"use client"

import React from "react";
import axios from "axios";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "./Components"

const schems = z.object({
    name: z.string(),
    password: z
        .string()
        .min(6, "รหัสผ่านต้องยาวอย่างน้อย 6 ตัว")
        .regex(/[A-Z]/, "ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
        .regex(/[a-z]/, "ต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว")
        .regex(/[0-9]/, "ต้องมีตัวเลขอย่างน้อย 1 ตัว"),
    confirmPassword: z
        .string()
        .min(6, "รหัสผ่านต้องยาวอย่างน้อย 6 ตัว")
        .regex(/[A-Z]/, "ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
        .regex(/[a-z]/, "ต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว")
        .regex(/[0-9]/, "ต้องมีตัวเลขอย่างน้อย 1 ตัว"),
})

export default function FormSetProfiles() {
    const [data, setData] = React.useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    })
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailParams = searchParams.get("email");

    const [passwordMatch, setPasswordMatch] = React.useState(true);

    React.useEffect(() => {
        verifyToken()
    }, [])

    React.useEffect(() => {
        if (!data.confirmPassword) {
            setPasswordMatch(true)
        } else {
            setPasswordMatch(data.password === data.confirmPassword)
        }
    }, [data.password, data.confirmPassword])

    const verifyToken = async () => {
        await axios.get(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/verify")
            .then((res) => console.log(res.data))
            .catch((res) => {
                console.error(res);
                router.push("/auth/signin")
            })
    }

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

        const newData = {
            email: emailParams,
            name: parsed.data?.name,
            password: parsed.data?.password,
        }

        await axios.post(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/user", newData)
            .then((res) => {
                console.log(res.data);
                router.push("/dashboard");
            })
            .catch((res) => console.error(res))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center px-4 py-4 mt-4 mb-4 border-2 rounded-2xl">
                <label className="text-sm w-10">ชื่อ: </label>
                <Input type="text" name="name" className="pl-2" placeholder="กรอกชื่อของคุณ" onChange={handleChange} />
            </div>
            <div className="flex items-center px-4 py-4 mt-4 mb-4 border-2 rounded-2xl">
                <label className="text-sm w-20">รหัสผ่าน: </label>
                <Input type="password" name="password" className="pl-2" placeholder="ความยาวขั้นต่ำ 6 ตัวอักษร" onChange={handleChange} />
            </div>
            <div className="flex items-center px-4 py-4 mt-4 mb-4 border-2 rounded-2xl" style={!passwordMatch ? { borderColor: "red" } : { borderColor: "white" }}>
                <label className="text-sm w-50">ยืนยันรหัสผ่านอีกครั้ง: </label>
                <Input type="password" name="confirmPassword" className="pl-2" placeholder="กรอกรหัสผ่านอีกครั้ง" onChange={handleChange} />
            </div>
            <Button type="submit" className="cursor-pointer text-black">เริ่มต้นใช้งาน</Button>
        </form>
    )
}