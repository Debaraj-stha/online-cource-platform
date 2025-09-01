import React from "react";
import DynamicChart from "../DynamicChart";

const NewVsReturningStudents = () => {
  const labels = ["New Students", "Returning Students"];
  const students = [300, 150]; // example numbers

  const data = {
    labels,
    datasets: [
      {
        data: students,
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)", // blue for new
          "rgba(74, 222, 128, 0.7)", // green for returning
        ],
        borderWidth: 2,
        borderColor: ["#3b82f6", "#4ade80"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "New vs Returning Students",
        color: "#fff",
      },
      legend: {
        position: "right" as const,
        labels: { color: "#fff" },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw} students`,
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

export default NewVsReturningStudents;
