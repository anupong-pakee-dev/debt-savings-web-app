import { Metadata } from "next";
import { Button } from "./components/Components";

export const metadata: Metadata = {
  title: "Debt & Savings | วางแผนการเงิน ปลดหนี้อย่างเป็นระบบ",
  description:
    "แพลตฟอร์มจัดการหนี้และเงินออม วิเคราะห์รายรับรายจ่ายด้วยกราฟ ช่วยให้ตัดสินใจทางการเงินได้ดีขึ้น",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Debt & Savings",
    description: "จัดการหนี้และเงินออมด้วยระบบวิเคราะห์การเงินที่เข้าใจง่าย",
    url: "http://localhost:3000",
    siteName: "Debt & Savings",
    type: "website",
  },
};

export default function page() {
  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-500 to-teal-600 text-emerald-50">
      <header className="p-10 text-center">
        <div>
          <h1 className="text-2xl font-bold">ลดหนี้ เพิ่มเงินออม</h1>
          <p>เริ่มวันนี้ด้วยแผนง่ายๆ</p>
          <Button className="mt-4 cursor-pointer">เริ่มเลย</Button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center p-10 shadow-xl">
        <article>
          <h3 className="font-bold">ติดตามหนี้ทั้งหมด</h3>
          <p>ดูหนี้ทุกก้อนในแดชบอร์ดเดียว</p>
        </article>
        <article className="mt-10 mb-10 md:m-0">
          <h3 className="font-bold">แผนออมเงินอัตโนมัติ</h3>
          <p>ตั้งเป้าหมาย แล้วให้ระบบออมให้เอง</p>
        </article>
        <article>
          <h3 className="font-bold">กลยุทธ์ลดดอกเบี้ย</h3>
          <p>คำแนะนำเฉพาะคุณ เพื่อปิดหนี้เร็วขึ้น</p>
        </article>
      </section>

      <section>
        <h2>ตัวอย่างกราฟการเงิน</h2>

        <figure>
          <canvas></canvas>
          <figcaption>กราฟเปรียบเทียบรายรับและรายจ่ายในแต่ละเดือน</figcaption>
        </figure>

        <p>
          เดือนมกราคมถึงมิถุนายน รายรับสูงกว่ารายจ่ายโดยเฉลี่ย 20%
          ค่าใช้จ่ายสูดสุดอยู่ในเดือนมีนาคม
        </p>
      </section>

      <section>
        <h2>ติดต่อฉัน</h2>

        <form>
          <label>
            อีเมล
            <input type="email" />
          </label>
          <label>
            ข้อมูล
            <input type="text" />
          </label>
          <button type="submit">ส่งข้อความ</button>
        </form>

        <address>Email: mrnu.developer@gmail.com</address>
      </section>

      <footer>
        <p>&copy; 2025 Debt & Savings. All rights reserved.</p>
      </footer>
    </main>
  );
}
