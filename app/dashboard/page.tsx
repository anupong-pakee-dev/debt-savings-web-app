'use client'

import { motion } from "framer-motion";
import { Card, CardContent } from "../components/Components";
import { ArrowDownRight, ArrowUpRight, CreditCard, Wallet } from "lucide-react";
export default function page() {
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
        </div>
    )
}
