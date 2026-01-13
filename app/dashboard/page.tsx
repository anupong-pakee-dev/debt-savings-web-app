'use client'

import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent } from "../components/Components";
import { ArrowDownRight, ArrowUpRight, CreditCard, Plus, Wallet } from "lucide-react";
import { Chart } from "../components/Chart";
import AddTransaction from "../components/AddTransaction.tsx";
export default function page() {
    const [show, setShow] = React.useState(false);
    const labels = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.']
    const dataMocup = {
        labels,
        datasets: [
            {
                label: "เงินออม",
                data: [12000, 18000, 22000, 40000, 45000, 52000],
                borderColor: "rgba(34, 197, 94, 1)",
                backgroundColor: "rgba(34, 197, 94, 1)",
                borderWidth: 1,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
            },
            {
                label: "รายจ่าย",
                data: [1200000, 180000, 140000, 90000, 50000, 30000],
                borderColor: "rgba(239, 68, 68, 1)",
                backgroundColor: "rgba(239, 68, 68, 1)",
                borderWidth: 1,
                tension: 0.4,
                pointRadius: 0,
                fill: true,
            }
        ]

    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: 'white' },
            }
        },
        scales: {
            x: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.2)' }
            },
            y: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.2)' }
            }
        }
    }
    return (
        <div className="min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between p-8">
                <div>
                    <h1 className="text-2xl font-semibold">แดชบอร์ด</h1>
                    <p>หน้าแดชบอร์ดของคุณ</p>
                </div>
                <Button className={`${show ? 'hidden' : 'block'} flex items-center text-black cursor-pointer`} onClick={() => setShow(!show)}><Plus /> เพิ่มรายการ</Button>
            </motion.div>

            <AddTransaction showOption={show} />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-10 p-8 text-black">
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
                    <Chart title="เงินออม VS หนี้สิน" desc="ข้อมูลปัจจุบัน" dataset={dataMocup} optionsdata={options} />
                </figure>
            </div>

            <footer className="p-4 text-center bg-black/60">
                <p>&copy; 2026 Debt & Savings. All rights reserved.</p>
            </footer>
        </div>
    )
}
