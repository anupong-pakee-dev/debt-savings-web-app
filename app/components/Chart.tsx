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
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type LineChartData = ChartData<"line">;
type LineChartOptions = ChartOptions<"line">;

export function Chart({
  title,
  desc,
  dataset,
  optionsdata,
}: {
  title: string;
  desc: string;
  dataset: LineChartData;
  optionsdata: LineChartOptions;
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

        <div className="w-70 md:w-150 xl:w-350">
          <Line data={dataset} options={optionsdata} />
        </div>
      </CardContent>
    </Card>
  );
}