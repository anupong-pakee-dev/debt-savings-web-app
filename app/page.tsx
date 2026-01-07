import { Button } from "./components/Components";

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
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
      fill: true,
    },
    {
      label: "รายจ่าย",
      data: [15000, 18000, 16000, 20000, 21000, 23000],
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
        <h1>ลดหนี้ เพิ่มเงินออม</h1>
        <p>เริ่มต้นวันนี้ด้วยแผนง่ายๆ</p>
        <Button className="mt-4 text-black">เริ่มเลย</Button>
      </header>
    </main>
  );
}
