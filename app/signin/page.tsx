import React from 'react'
import { Metadata } from 'next'
import FormSignIn from '../components/FormSignIn'

export const metadata: Metadata = {
    title: "เข้าสู่ระบบ",
    robots: {
        index: false,
        follow: false
    }
}

export default function page() {
  return (
    <main>
        <section>
            <h1>ลงชื่อเข้าใช้</h1>
            <p>ยินดีต้อนรับกลับ! กรุณาเข้าสู่ระบบเพื่อจัดการการเงินของคุณ</p>

            <FormSignIn />
        </section>
    </main>
  )
}
