import { Chart } from "./components/Chart";
import { Button, Input } from "./components/Components";

const savingsVSdebtData = {
  labels: [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
  ],
  datasets: [
    {
      label: "รายรับ",
      data: [20000, 25000, 22000, 27000, 30000, 32000],
      borderColor: "rgba(34, 197, 94, 1)",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
      fill: true,
    },
    {
      label: "รายจ่าย",
      data: [30000, 28000, 26000, 20000, 11000, 9000],
      borderColor: "rgba(239, 68, 68, 1)",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
      fill: true,
    }
  ]
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="p-10 md:p-20 text-center">
        <h1 className="text-2xl font-bold">ลดหนี้ เพิ่มเงินออม</h1>
        <p>เริ่มต้นวันนี้ด้วยแผนง่ายๆ</p>
        <Button className="mt-4 text-black">เริ่มเลย</Button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center p-10 shadow-xl">
        <article>
          <h3 className="font-bold">ติดตามหนี้ทั้งหมด</h3>
          <p>ดูหนี้ทุกก้อนในแดชบอร์ดเดียว</p>
        </article>
        <article>
          <h3 className="font-bold">แผนออมเงินอัตโนมัติ</h3>
          <p>ตั้งเป้าหมาย แล้วให้ระบบออมให้เอง</p>
        </article>
        <article>
          <h3 className="font-bold">กลยุทธ์ลดดอกเบี้ย</h3>
          <p>คำแนะนำเฉพาะคุณ เพื่อปิดหนี้เร็วขึ้น</p>
        </article>
      </section>

      <section className="justify-items-center p-10">
        <h2 className="font-bold mb-6">ตัวอย่างกราฟการเงิน</h2>

        <figure>
          <Chart title="รายรับ VS รายจ่าย" desc="ข้อมูลเมื่อ 6 เดือนที่ผ่านมา" dataset={savingsVSdebtData} />
          <figcaption className="mt-4 text-center">
            กราฟเปรียบเทียบรายรับและรายจ่ายในช่วง 6 เดือนที่ผ่านมา
          </figcaption>
        </figure>

        <p className="sr-only">เดือนมกราคมถึงมิถุนายน รายรับสูงสุดในเดือนมิถุนายน คือ 32,000 บาท</p>
      </section>

      <section className="p-10 text-center">
        <h2 className="mb-4 font-bold">ติดต่อฉัน</h2>
        <form className="inline-block p-6 border rounded-2xl">
          <div className="flex items-center">
            <label className="mr-2">อีเมล์: </label>
            <Input type="email" className="border-b" placeholder="กรอกอีเมล์ของคุณ" />
          </div>
          <div className="flex mt-4 items-start">
            <label className="mr-2">ข้อความ: </label>
            <textarea className="border p-4 outline-none" placeholder="พิมพ์ข้อความ" />
          </div>
          <Button type="submit" className="mt-4 text-black" >ส่งข้อความ</Button>
        </form>

        <address>Gmail: mrnu.developer@gmail.com</address>
      </section>

      <footer className="p-4 text-center bg-black/60">
        <p>&copy; 2026 Debt & Savings. All rights reserved.</p>
      </footer>
    </main>
  );
}
