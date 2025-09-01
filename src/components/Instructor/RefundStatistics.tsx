import React from "react";
import DynamicChart from "../DynamicChart";

const RefundStatistics = () => {
  const labels = ["Successful Enrollments", "Refunded"];
  const dataValues = [800, 50]; // example numbers

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "rgba(74, 222, 128, 0.7)", // green for success
          "rgba(239, 68, 68, 0.7)",  // red for refunded
        ],
        borderWidth: 2,
        borderColor: ["#4ade80", "#ef4444"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Refund Statistics",
        color: "#fff",
      },
      legend: {
        position: "right" as const,
        labels: { color: "#fff" },
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.label}: ${context.raw} enrollments`,
        },
      },
    },
  };

  return (
    <div className="chart_bg">
      <DynamicChart type="doughnut" data={data} options={options} />
    </div>
  );
};

export default RefundStatistics;
