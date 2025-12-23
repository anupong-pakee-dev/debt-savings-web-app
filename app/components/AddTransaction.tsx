"use client";

import React from "react";
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
                  <option>Salary</option>
                  <option>Food</option>
                  <option>Rent</option>
                  <option>Credit Card</option>
                  <option>Other</option>
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
                <Button>
                  <Plus /> Add Transaction
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
