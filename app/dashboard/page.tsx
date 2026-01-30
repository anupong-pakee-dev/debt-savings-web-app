'use client'

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ArrowLeft, CreditCard, Plus, Wallet, Settings, LogOut } from "lucide-react";

import { Button, Card, CardContent } from "../components/Components";
import { Chart } from "../components/Chart";
import AddTransaction from "../components/AddTransaction.tsx";

export default function page() {
    const [show, setShow] = React.useState(false);
    const [settingActive, setSettingActive] = React.useState(false);

    const router = useRouter();

    React.useEffect(() => {
        verifyToken()
    }, [])

    const verifyToken = async () => {
        await axios.get(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/verify")
            .then((res) => console.log(res.data))
            .catch((res) => {
                console.error(res);
                router.push("/auth/signin");
            })
    }

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
                <div className="flex items-center">
                    <Button className={`${show ? 'hidden' : 'block'} ${settingActive ? 'hidden' : 'block'} flex items-center text-black cursor-pointer`} onClick={() => setShow(!show)}><Plus /> เพิ่มรายการ</Button>
                    <Settings className="ml-4 cursor-pointer hover:text-gray-400 duration-300" onClick={() => setSettingActive(!settingActive)} />
                </div>
            </motion.div>
            <div className={`${settingActive ? 'flex' : 'hidden'} absolute justify-center items-center min-w-screen min-h-screen backdrop-blur-sm z-2`}>
                <Button className="flex items-center mr-4 text-black cursor-pointer" onClick={() => setSettingActive(!settingActive)}><ArrowLeft /> ย้อนกลับ</Button>
                {/* <Button className="flex items-center mr-4 text-black cursor-pointer"><Settings /> การตั้งค่า</Button> */}
                <Button className="flex items-center text-black cursor-pointer"><LogOut /> ออกจากระบบ</Button>
            </div>

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
                    <Chart title="เงินออม VS หนี้สิน" desc="ข้อมูลปัจจุบัน" dataset={dataMocup} />
                </figure>
            </div>

            <footer className="p-4 text-center bg-black/60">
                <p>&copy; 2025 Debt & Savings. All rights reserved.</p>
            </footer>
        </div>
    )
}
