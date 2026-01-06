"use client"

import { Button, Input } from "./Components"

export default function FormSignIn() {
    return (
        <form>
            <div className="flex items-center p-2 mb-4 border-2 rounded-2xl">
                <label className="text-sm w-18 md:w-16">อีเมล์: </label>
                <Input type="email" name="email" className="pl-2" placeholder="example@example.com" />
            </div>
            <div className="flex items-center p-2 mb-4 border-2 rounded-2xl">
                <label className="text-sm w-18 md:w-16">รหัสผ่าน: </label>
                <Input type="password" name="password" className="pl-2" placeholder="กรอกรหัสผ่านของคุณ" />
            </div>
            <Button type="submit" className="cursor-pointer">เข้าสู่ระบบ</Button>
        </form>
    )
}
