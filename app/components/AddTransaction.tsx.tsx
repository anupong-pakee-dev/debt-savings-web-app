"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";
import { Button, Card, CardContent, Input, Select } from "./Components";

export default function AddTransaction({showOption,} : {showOption: boolean}) {
    const [showOptionState, setShowOptionState] = React.useState(showOption);
    return (
        <div className={`${showOption ? 'block' : 'hidden'} p-8`}>
            <Button className="flex py-4 text-black cursor-pointer" onClick={() => {setShowOptionState(false); window.location.reload()}}>
                <ArrowLeft />
                <h1>เพิ่มรายการ</h1>
            </Button>

            <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-black">
                <Card>
                    <CardContent>
                        <form>
                            <div className="mb-4">
                                <label className="font-semibold">ประเภท</label>
                                <Select>
                                    <option value="income">รายรับ (เงินออม)</option>
                                    <option value="expense">รายจ่าย (หนี้)</option>
                                </Select>
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">จำนวนเงิน (บาท)</label>
                                <Input type="number" placeholder="0.01" className="pl-4 border rounded-xl" />
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">หมวดหมู่</label>
                                <Select>
                                    <option value="salary">เงินเดือน</option>
                                    <option value="food">อาหาร</option>
                                    <option value="rent">ค่าเช่า</option>
                                    <option value="credit">บัตรเครดิต</option>
                                    <option value="other">อื่นๆ</option>
                                </Select>
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">วันที่</label>
                                <Input type="date" className="pl-4 border rounded-xl" defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">หมายเหตุ (ไม่บังคับ)</label>
                                <Input type="text" placeholder="เพิ่มหมายเหตุ" className="pl-4 border rounded-xl" />
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