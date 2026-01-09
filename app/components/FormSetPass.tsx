"use client"

import { Button, Input } from "./Components"

export default function FormSetPass() {
    return (
        <form>
            <div className="flex items-center px-4 py-4 mt-4 mb-4 border-2 rounded-2xl">
                <label className="text-sm w-20">รหัสผ่าน: </label>
                <Input type="password" name="password" className="pl-2" placeholder="ความยาวขั้นต่ำ 6 ตัวอักษร" />
            </div>
            <div className="flex items-center px-4 py-4 mt-4 mb-4 border-2 rounded-2xl">
                <label className="text-sm w-50">ยืนยันรหัสผ่านอีกครั้ง: </label>
                <Input type="password" name="confirmPassword" className="pl-2" placeholder="กรอกรหัสผ่านอีกครั้ง" />
            </div>
            <Button type="submit" className="cursor-pointer text-black">เริ่มต้นใช้งาน</Button>
        </form>
    )
}
