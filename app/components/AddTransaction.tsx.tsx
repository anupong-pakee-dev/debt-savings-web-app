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
                            <div>
                                <label>Transaction Type</label>
                                <Select>
                                    <option value="income">Income (Savings)</option>
                                    <option value="expense">Expense (Debt)</option>
                                </Select>
                            </div>

                            <div>
                                <label>Amount (THB)</label>
                                <Input />
                            </div>

                            <div>
                                <label>Category</label>
                                <Select>
                                    <option value="salary">Salary</option>
                                    <option value="food">Food</option>
                                    <option value="rent">Rent</option>
                                    <option value="credit">Credit Card</option>
                                    <option value="other">Other</option>
                                </Select>
                            </div>

                            <div>
                                <label>Date</label>
                                <Input />
                            </div>

                            <div>
                                <label>Note (optional)</label>
                                <Input />
                            </div>

                            <div>
                                <Button>Cancel</Button>
                                <Button>Add Transaction</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}