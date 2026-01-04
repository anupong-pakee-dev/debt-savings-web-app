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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        color: "rgba(255,255,255,0.9)",
        usePointStyle: true,
        pointStyle: "line",
        boxWidth: 14,
        padding: 16,
        font: {
          size: 12,
          weight: 500,
        },
      },
    },
    tooltip: {
      backgroundColor: "rgba(15,23,42,0.9)",
      titleColor: "#F8FAFC",
      bodyColor: "#E2E8F0",
      padding: 12,
      cornerRadius: 12,
      displayColors: false,
      callbacks: {
        label: (ctx) =>
          `${ctx.dataset.label}: ฿ ${ctx.parsed.y.toLocaleString()}`,
      },
    },
  },

  scales: {
    x: {
      grid: {
        color: "rgba(255,255,255,0.05)",
        drawBorder: false,
      },
      ticks: {
        color: "rgba(255,255,255,0.85)",
        font: {
          size: 11,
          weight: 500,
        },
      },
    },
    y: {
      grid: {
        color: "rgba(255,255,255,0.08)",
        drawBorder: false,
      },
      ticks: {
        color: "rgba(255,255,255,0.85)",
        font: {
          size: 11,
          weight: 500,
        },
        callback: (value) => `฿${Number(value) / 1000}k`,
      },
    },
  },
};

const glowPlugin = {
  id: "glow",
  beforeDatasetsDraw(chart: any) {
    const { ctx } = chart;
    ctx.save();
    ctx.shadowColor = "rgba(255,255,255,0.35)";
    ctx.shadowBlur = 14;
  },
  afterDatasetsDraw(chart: any) {
    chart.ctx.restore();
  },
};

export function Chart({
  title,
  desc,
  dataset,
}: {
  title: string;
  desc: string;
  dataset: object;
}) {
  return (
    <Card className="relative bg-transparent! rounded-3xl overflow-hidden">
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/30 shadow-[inset_0_0_30px_rgba(255,255,255,0.25)]" />
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />

      <CardContent className="relative p-8 text-left">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white tracking-wide">
            {title}
          </h3>
          <span className="text-sm text-white/70">{desc}</span>
        </div>

        <div className="w-60 h-100 md:w-150 xl:w-200">
          <Line data={dataset} options={chartOptions} plugins={[glowPlugin]} />
        </div>
      </CardContent>
    </Card>
  );
}