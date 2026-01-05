"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";
import { Button, Card, CardContent, Input, Select } from "./Components";

export default function AddTransaction() {
    return (
        <div>
            <motion.div>
                <ArrowLeft />
                <h1>Add Transaction</h1>
            </motion.div>

            <motion.div>
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