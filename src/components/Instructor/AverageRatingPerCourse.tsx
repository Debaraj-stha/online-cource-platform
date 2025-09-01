import React from "react";
import DynamicChart from "../DynamicChart";

const AverageRatingPerCourse = () => {
  const labels = ["React Basics", "Advanced JS", "UI/UX Design", "Node.js", "Python DS"];
  const ratings = [4.5, 4.2, 4.8, 3.9, 4.6]; // example average ratings

  const data = {
    labels,
    datasets: [
      {
        label: "Average Rating",
        data: ratings,
        backgroundColor: "rgba(251, 191, 36, 0.7)", // yellow
        borderColor: "rgba(245, 158, 11, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Average Rating per Course",
        color: "#fff",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw} ★`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "#374151" },
      },
      y: {
        min: 0,
        max: 5, // rating scale
        ticks: { color: "#9ca3af", stepSize: 1 },
        grid: { color: "#374151" },
      },
    },
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md">
      <DynamicChart type="bar" data={data} options={options} />
    </div>
  );
};

export default AverageRatingPerCourse;
