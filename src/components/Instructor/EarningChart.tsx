import React, { useState } from "react";
import { FaChartLine } from "react-icons/fa";
import DynamicChart from "../DynamicChart";
import EarningByCourse from "./EarningByCourse";


const EarningChart = () => {
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const earnings = [500, 700, 2800, 1200, 1500, 2000, 3400, 3000, 1200, 5000, 1800, 3211];
  const maxEarning = Math.max(...earnings);
    const minEarning = Math.min(...earnings);
  const maxIndex = earnings.indexOf(maxEarning); // Index of highest month
    const minIndex = earnings.indexOf(minEarning); // Index of highest month



  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Earnings ($)",
        data: earnings.map((v, idx) => (idx === maxIndex || idx === minIndex ? null : v)),
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.7)",
        fill: true,
        pointRadius: 4,
      },
      {
        label: "Highest Month",
        data: earnings.map((v, idx) => (idx === maxIndex ? v : null)),
        borderColor: "#ffce56",
        backgroundColor: "#ffce56",
        pointRadius: 10,
        pointBackgroundColor: "#ffce56",
        fill: false,
      },
      {
        label: "Lowest Month",
        data: earnings.map((v, idx) => (idx === minIndex ? v : null)),
        borderColor: "#7c3aed",
        backgroundColor: "#7c3aed",
        pointRadius: 10,
        pointBackgroundColor: "#7c3aed",
        fill: false,
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#fff" },
      },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: "#9ca3af" }, grid: { color: "#374151" } },
      y: { ticks: { color: "#9ca3af" }, grid: { color: "#374151" } },
    },
  };

  return (
    <div className="chart_bg">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaChartLine /> Earnings Overview
      </h3>

      {/* Chart Type Selector */}
      <div className="mb-4">
        <label className="mr-2">Chart Type:</label>
        <select
          className=" p-1 rounded"
          value={chartType}
          onChange={(e) => setChartType(e.target.value as "line" | "bar")}
        >
          <option value="line">Line</option>
          <option value="bar">Bar</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-96 w-full">
        <DynamicChart type={chartType} data={data} options={options} />
      </div>
    </div>
  );
};

export default EarningChart;
