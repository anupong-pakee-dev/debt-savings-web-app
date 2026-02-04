"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { Button, Card, CardContent, Input, Select } from "./Components";
import { createCategory, createTransaction, getCategory } from "../controller/api";

const today = new Date().toISOString().split("T")[0];

type Category = {
    id: string,
    name: string
}

type Props = {
    showOption: boolean,
    onSuccess: () => void
}

export default function AddTransaction({ showOption, onSuccess }: Props) {
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
    const [category, setCategory] = React.useState<Category[]>([]);


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
        let categoryId = data.category;

        if (data.category === "other") {
            const payload = {
                type: data.type,
                name: data.newCategory
            }
           await createCategory(payload)
            .then((res) => {
                categoryId = res.data.data.id;
            })
            .catch((res) => console.error(res))
        }
        
        const payloadData = {
            ...data,
            category: categoryId
        }
        
        await createTransaction(payloadData)
            .then((res) => {
                console.log(res.data)
                onSuccess();
            })
            .catch((res) => console.error(res))
    }

    const onTypeChange = async (type: string) => {
        setCategory([])
        
        const res = await getCategory(type);        
        
        setData(prev => ({
            ...prev,
            type
        }))
        setCategory(res.data.data);        

        return;
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
                                <Select name="type" required defaultValue={"DEFAULT"} onChange={(e) => onTypeChange(e.target.value)}>
                                    <option value="DEFAULT">โปรดเลือก</option>
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
                                <Select name="category" required defaultValue={"DEFAULT"} onChange={handleChange} className={`${show ? 'hidden!' : 'block'}`} >
                                    <option value="DEFAULT">โปรดเลือก</option>
                                    { category.map((item) => {
                                        return ( <option key={item.id} value={item.id}>{item.name}</option> )
                                    }) }
                                    <option value="other">อื่นๆ</option>
                                </Select>
                                <div className={`${show ? 'flex' : 'hidden'} items-center pl-4 border rounded-xl mt-2`}>
                                    <Input type="text" name="newCategory" placeholder="เพิ่มหมวดหมู่ใหม่" onChange={handleChange} />
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