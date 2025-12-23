"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardContent } from "../components/Components";
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
)

export default function page() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1>Dashboard</h1>
        <p>Overview of yourdebt & savings</p>
      </motion.div>

      <div>
        <Card>
          <CardContent>
            <div>
              <Wallet className="w-6 h-6 text-green-600" />
              <span>
                <ArrowUpRight className="mr-1 h-4 w-4" /> +5%
              </span>
            </div>
            <h2>Total Savings</h2>
            <p>฿12000</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div>
              <CreditCard className="w-6 h-6 text-red-600" />
              <span>
                <ArrowDownRight className="mr-1 h-4 w-4" /> +10%
              </span>
            </div>
            <h2>Total Debt</h2>
            <p>฿18000</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div>
              <PiggyBank className="w-6 h-6 text-blue-500" />
              <span>
                <ArrowUpRight className="mr-1 h-4 w-4" /> +5%
              </span>
            </div>
            <h2>Net Balances</h2>
            <p>฿50</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardContent>
            <h3>Savings Growth</h3>
            <div>{/* <Line /> */}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3>Debt Reduction</h3>
            <div>{/* <Line /> */}</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Button>Add Transaction</Button>
      </div>
    </div>
  );
}
