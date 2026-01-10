'use client'

import { motion } from "framer-motion";
import { Card, CardContent } from "../components/Components";
import { ArrowDownRight, ArrowUpRight, CreditCard, Wallet } from "lucide-react";
import { Chart } from "../components/Chart";
export default function page() {
    const labels = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.']
    const dataMocup = {
        labels,
        datasets: [
            {
                label: "เงินออม",
                data: [12000, 18000, 22000, 40000, 45000, 52000],
                borderColor: "rgba(34, 197, 94, 1)",
                backgroundColor: "rgba(34, 197, 94, 1)",
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
            },
            {
                label: "รายจ่าย",
                data: [1200000, 180000, 140000, 90000, 50000, 30000],
                borderColor: "rgba(239, 68, 68, 1)",
                backgroundColor: "rgba(239, 68, 68, 1)",
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
            }
        ]

    }
    return (
        <div className="min-h-screen p-6 md:p-20">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8">

                <h1 className="text-2xl font-semibold">แดชบอร์ด</h1>
                <p>หน้าแดชบอร์ดของคุณ</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-10 text-black">
                <Card className="bg-white border shadow-xl">
                    <CardContent>
                        <div className="flex items-center justify-between text-green-600">
                            <Wallet className="w-6 h-6" />
                            <span className="opacity-0">
                                <ArrowUpRight className="mr-1 w-4 h-4" /> %
                            </span>
                        </div>
                        <h2 className="mt-4 text-sm font-bold">ยอดเงินคงเหลือ</h2>
                        <p className="text-2xl">12,000 บาท</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border shadow-xl">
                    <CardContent>
                        <div className="flex items-center justify-between text-green-600">
                            <CreditCard className="w-6 h-6" />
                            <span>
                                <ArrowDownRight className="mr-1 w-4 h-4" /> -0.001%
                            </span>
                        </div>
                        <h2 className="mt-4 text-sm font-bold">หนี้สินคงเหลือ</h2>
                        <p className="text-2xl">1,200,050 บาท</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border shadow-xl">
                    <CardContent>
                        <div className="flex items-center justify-between text-green-600">
                            <Wallet className="w-6 h-6" />
                            <span>
                                <ArrowUpRight className="mr-1 w-4 h-4" /> +5%
                            </span>
                        </div>
                        <h2 className="mt-4 text-sm font-bold">เงินออมคงเหลือ</h2>
                        <p className="text-2xl">12,000 บาท</p>
                    </CardContent>
                </Card>
            </div>

            <div className="justify-items-center p-10">
                <figure>
                    <Chart title="เงินออม VS หนี้สิน" desc="ข้อมูลปัจจุบัน" dataset={dataMocup} />
                </figure>
                <div>
                </div>
            </div>
        </div>
    )
}
