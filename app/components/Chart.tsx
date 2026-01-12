"use client";

import { Card, CardContent } from "./Components";
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
);

export function Chart({
  title,
  desc,
  dataset,
  optionsdata,
}: {
  title: string;
  desc: string;
  dataset: object;
  optionsdata: object;
}) {
  return (
    <Card className="relative bg-transparent! rounded-3xl overflow-hidden border shadow-xl">
      <CardContent className="relative p-8 text-left">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white tracking-wide">
            {title}
          </h3>
          <span className="text-sm text-white/70">{desc}</span>
        </div>

        <div className="w-60 h-100 md:w-150 xl:w-200">
          <Line data={dataset} options={optionsdata} />
        </div>
      </CardContent>
    </Card>
  );
}