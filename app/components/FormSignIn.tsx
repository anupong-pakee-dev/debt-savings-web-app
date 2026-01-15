"use client"

import { Button, Input } from "./Components"
import { useRouter } from "next/navigation"

export default function FormSignIn() {
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/dashboard")
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center p-2 mb-4 border-2 rounded-2xl">
                <label className="text-sm w-18 md:w-16">อีเมล์: </label>
                <Input type="email" name="email" className="pl-2" defaultValue="super.user@gmail.com" disabled placeholder="example@example.com" />
            </div>
            <div className="flex items-center p-2 mb-4 border-2 rounded-2xl">
                <label className="text-sm w-18 md:w-16">รหัสผ่าน: </label>
                <Input type="password" name="password" className="pl-2" defaultValue="123456" disabled placeholder="กรอกรหัสผ่านของคุณ" />
            </div>
            <Button type="submit" className="cursor-pointer text-black">เข้าสู่ระบบ</Button>
        </form>
    )
}
