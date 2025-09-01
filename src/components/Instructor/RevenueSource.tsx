import React from "react";
import DynamicChart from "../DynamicChart";

const RevenueSource = () => {
  const labels = ["Course Sales", "Subscription", "Bundle"];
  const revenue = [12000, 5000, 2000];

  const data = {
    labels,
    datasets: [
      {
        data: revenue,
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)", // blue
          "rgba(74, 222, 128, 0.7)", // green
          "rgba(251, 191, 36, 0.7)", // yellow
        ],
        borderWidth: 2,
        borderColor: ["#3b82f6", "#4ade80", "#fbbf24"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Revenue Sources",
        color: "#fff",
      },
      legend: {
        position: "right" as const,
        labels: { color: "#fff" },
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.label}: $${context.raw.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md">
      <DynamicChart type="doughnut" data={data} options={options} />
    </div>
  );
};

export default RevenueSource;
