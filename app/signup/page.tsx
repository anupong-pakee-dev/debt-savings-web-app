import { Metadata } from "next"
import FormSignUp from "../components/FormSignUp"

export const metadata: Metadata = {
    title: "สมัครใช้งาน | ระบบจัดการเงิน",
    description: "สมัครใช้งานฟรี เพื่อวิเคราะห์รายรับรายจ่ายและวางแผนการเงินอย่างเป็นระบบ"
}

export default function page() {
  return (
    <main>
        <section>
            <h1>สมัครใช้งาน</h1>
            <p>เริ่มต้นวางแผนการเงินของคุณด้วยระบบวิเคราะห์รายรับรายจ่าย</p>

            <FormSignUp/>
        </section>
    </main>
  )
}
