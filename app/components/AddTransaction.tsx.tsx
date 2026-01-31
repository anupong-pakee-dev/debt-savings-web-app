"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { Button, Card, CardContent, Input, Select } from "./Components";

const today = new Date().toISOString().split("T")[0];

export default function AddTransaction({ showOption, }: { showOption: boolean }) {
    const [data, setData] = React.useState({
        type: "",
        amount: 0,
        category: "",
        newCategory: "",
        date: today,
        note: ""
    });
    const [show, setShow] = React.useState(false);
    const [showOptionState, setShowOptionState] = React.useState(showOption);

    React.useEffect(() => {
        setShow(data.category === "other");
    }, [data.category])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: name === "amount" ? Number(value) : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className={`${showOption ? 'block' : 'hidden'} p-8`}>
            <Button className="flex py-4 text-black cursor-pointer" onClick={() => { setShowOptionState(false); window.location.reload() }}>
                <ArrowLeft />
                <h1>เพิ่มรายการ</h1>
            </Button>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-black">
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="font-semibold">ประเภท</label>
                                <Select name="type" required onChange={handleChange}>
                                    <option value="INCOME">รายรับ</option>
                                    <option value="EXPENSE">รายจ่าย</option>
                                </Select>
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">จำนวนเงิน (บาท)</label>
                                <Input type="number" name="amount" required placeholder="0.01" className="pl-4 border rounded-xl" onChange={handleChange} />
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">หมวดหมู่</label>
                                <Select name="category" required onChange={handleChange} className={`${show ? 'hidden!' : 'block'}`} >
                                    <option value="salary">เงินเดือน</option>
                                    <option value="food">อาหาร</option>
                                    <option value="rent">ค่าเช่า</option>
                                    <option value="credit">บัตรเครดิต</option>
                                    <option value="other">อื่นๆ</option>
                                </Select>
                                <div className={`${show ? 'flex' : 'hidden'} items-center pl-4 border rounded-xl mt-2`}>
                                    <Input type="text" name="newCategory" required placeholder="เพิ่มหมวดหมู่ใหม่" onChange={handleChange} />
                                    <X className="cursor-pointer" onClick={() => setShow(!show)} />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">วันที่</label>
                                <Input type="date" name="date" required className="pl-4 border rounded-xl" value={data.date} onChange={handleChange} />
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">หมายเหตุ (ไม่บังคับ)</label>
                                <Input type="text" name="note" placeholder="เพิ่มหมายเหตุ" className="pl-4 border rounded-xl" onChange={handleChange} />
                            </div>

                            <div>
                                <Button type="reset" className="mr-4">เคลียร์</Button>
                                <Button type="submit">เพิ่มรายการ</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}