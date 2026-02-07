'use client'

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ArrowLeft, CreditCard, Plus, Wallet, Settings, LogOut, PiggyBank } from "lucide-react";

import { Button, Card, CardContent } from "../components/Components";
import { Chart } from "../components/Chart";
import AddTransaction from "../components/AddTransaction.tsx";
import Loading from "../components/Loading";
import { getTransaction, logout } from "../controller/api";

type Transaction = {
    id: string,
    amount: number,
    date: string,
    note?: string,
    category: {
        type: "INCOME" | "EXPENSE",
    }
}

export default function page() {
    const [data, setData] = React.useState<Transaction[]>([]);
    const [show, setShow] = React.useState(false);
    const [settingActive, setSettingActive] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const router = useRouter();

    React.useEffect(() => {
        verifyToken();
        getTransactions();
    }, [])


    const verifyToken = async () => {
        await axios.get(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/verify")
            .then((res) => {
                console.log(res.data);
                setLoading(false);
            })
            .catch((res) => {
                console.error(res);
                router.push("/auth/signin");
            })
    }

    const getTransactions = async () => {
        await getTransaction()
            .then((res) => {
                setData(res.data.data);
                // console.log(res.data.data)
            })
            .catch((res) => console.error(res))
    }

    const signout = async () => {
        await logout()
            .then((res) => {
                console.log(res);
                router.push("/auth/signin");
            })
            .catch((res) => console.error(res))
    }

    const { graphData, totalBalance, totalIncome, totalExpense, previousBalance, previousIncome, previousExpense, diffBalance, diffIncome, diffExpense } = React.useMemo(() => {
        const income = Array(12).fill(0);
        const expense = Array(12).fill(0);
        let totalBalance = 0;
        let totalIncome = 0;
        let totalExpense = 0;

        data.forEach((transaction) => {
            const month = new Date(transaction.date).getMonth();

            if (transaction.category.type === "INCOME") {
                income[month] += transaction.amount;
                totalIncome += transaction.amount;
                totalBalance += transaction.amount;
            }

            if (transaction.category.type === "EXPENSE") {
                expense[month] += transaction.amount;
                totalExpense += transaction.amount;
                totalBalance -= transaction.amount;
            }
        });

        let previousBalance = totalBalance;
        let previousIncome = totalIncome;
        let previousExpense = totalExpense;
        let diffBalance = 0;
        let diffIncome = 0;
        let diffExpense = 0;

        if (data.length > 0) {
            const last = data[data.length - 1];

            diffBalance =
                last.category.type === "INCOME"
                    ? last.amount
                    : -last.amount;

            if (last.category.type === "INCOME") {
                diffIncome = last.amount;
            } else {
                diffExpense = last.amount;
            }

            previousBalance = totalBalance - diffBalance;
            previousIncome = totalIncome - diffIncome;
            previousExpense = totalExpense - diffExpense;
        }

        return {
            totalBalance,
            totalIncome,
            totalExpense,
            previousBalance,
            previousIncome,
            previousExpense,
            diffBalance,
            diffIncome,
            diffExpense,
            graphData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: "คงเหลือ",
                        data: income.map((v, i) => v - expense[i]),
                        borderColor: "rgba(59, 130, 246, 1)",
                        backgroundColor: "rgba(59, 130, 246, 1)",
                        borderWidth: 1,
                        tension: 0.4,
                        pointRadius: 0,
                        fill: false,
                    },
                    {
                        label: "รายรับ",
                        data: income,
                        borderColor: "rgba(34, 197, 94, 1)",
                        backgroundColor: "rgba(34, 197, 94, 1)",
                        borderWidth: 1,
                        tension: 0.4,
                        pointRadius: 0,
                        fill: true,
                    },
                    {
                        label: "รายจ่าย",
                        data: expense,
                        borderColor: "rgba(239, 68, 68, 1)",
                        backgroundColor: "rgba(239, 68, 68, 1)",
                        borderWidth: 1,
                        tension: 0.4,
                        pointRadius: 0,
                        fill: true,
                    }
                ]
            }
        }

    }, [data])


    return (
        <div className="min-h-screen">
            <Loading isActive={loading} />
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between p-8">
                <div>
                    <h1 className="text-2xl font-semibold">แดชบอร์ด</h1>
                    <p>หน้าแดชบอร์ดของคุณ</p>
                </div>
                <div className="flex items-center">
                    <Button className={`${settingActive ? 'hidden' : 'block'} flex items-center text-black cursor-pointer`} onClick={() => setShow(!show)}><Plus /> เพิ่มรายการ</Button>
                    <Settings className="ml-4 cursor-pointer hover:text-gray-400 duration-300" onClick={() => setSettingActive(!settingActive)} />
                </div>
            </motion.div>
            <div className={`${settingActive ? 'flex' : 'hidden'} absolute justify-center items-center min-w-screen min-h-screen backdrop-blur-sm z-2`}>
                <Button className="flex items-center mr-4 text-black cursor-pointer" onClick={() => setSettingActive(!settingActive)}><ArrowLeft /> ย้อนกลับ</Button>
                {/* <Button className="flex items-center mr-4 text-black cursor-pointer"><Settings /> การตั้งค่า</Button> */}
                <Button className="flex items-center text-black cursor-pointer" onClick={() => signout()}><LogOut /> ออกจากระบบ</Button>
            </div>

            <AddTransaction showOption={show} onSuccess={() => { getTransactions() }} />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-10 p-8 text-black">
                <Card className="bg-white border shadow-xl">
                    <CardContent>
                        <div className="flex items-center justify-between text-green-600">
                            <Wallet className="w-6 h-6" />
                            {/* <span className="opacity-0">
                                <ArrowUpRight className="mr-1 w-4 h-4" /> %
                            </span> */}
                        </div>
                        <h2 className="mt-4 text-sm font-bold">ยอดเงินคงเหลือ</h2>
                        <p className="text-sm text-gray-400">
                            {previousBalance.toLocaleString()} บาท
                        </p>
                        <div className="flex items-end gap-2">
                            <p className="text-2xl font-semibold">
                                {totalBalance.toLocaleString()} บาท
                            </p>

                            {diffBalance !== 0 && (
                                <span
                                    className={`flex items-center text-sm font-medium ${diffBalance > 0 ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {diffBalance > 0 ? "+" : ""}
                                    {diffBalance.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border shadow-xl">
                    <CardContent>
                        <div className="flex items-center justify-between text-green-600">
                            <CreditCard className="w-6 h-6" />
                            {/* <span>
                                <ArrowDownRight className="mr-1 w-4 h-4" /> -0.001%
                            </span> */}
                        </div>
                        <h2 className="mt-4 text-sm font-bold">หนี้สินคงเหลือ</h2>
                        <p className="text-sm text-gray-400">
                            {previousExpense.toLocaleString()} บาท
                        </p>
                        <div className="flex items-end gap-2">
                            <p className="text-2xl font-semibold">
                                {totalExpense.toLocaleString()} บาท
                            </p>

                            {diffExpense !== 0 && (
                                <span
                                    className={`flex items-center text-sm font-medium ${diffExpense > 0 ? "text-red-600" : "text-green-600"
                                        }`}
                                >
                                    {diffExpense > 0 ? "+" : "-"}
                                    {diffExpense.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border shadow-xl">
                    <CardContent>
                        <div className="flex items-center justify-between text-green-600">
                            <PiggyBank className="w-6 h-6" />
                            {/* <span>
                                <ArrowUpRight className="mr-1 w-4 h-4" /> +5%
                            </span> */}
                        </div>
                        <h2 className="mt-4 text-sm font-bold">เงินออมคงเหลือ</h2>
                        <p className="text-sm text-gray-400">
                            {previousIncome.toLocaleString()} บาท
                        </p>
                        <div className="flex items-end gap-2">
                            <p className="text-2xl font-semibold">
                                {totalIncome.toLocaleString()} บาท
                            </p>

                            {diffIncome !== 0 && (
                                <span
                                    className={`flex items-center text-sm font-medium ${diffIncome > 0 ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {diffIncome > 0 ? "+" : ""}
                                    {diffIncome.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="justify-items-center p-10">
                <figure>
                    <Chart title="เงินออม VS หนี้สิน" desc="ข้อมูลปัจจุบัน" dataset={graphData} />
                </figure>
            </div>

            <footer className="p-4 text-center bg-black/60">
                <p>&copy; 2025 Debt & Savings. All rights reserved.</p>
            </footer>
        </div>
    )
}
