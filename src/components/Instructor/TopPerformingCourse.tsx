import React from "react";
import DynamicChart from "../DynamicChart";

const TopPerformingCourse = () => {
  const labels = ["React Basics", "Advanced JS", "UI/UX Design", "Node.js", "Python DS"];
  const enrollments = [200, 180, 150, 120, 100]; // Example numbers

  const data = {
    labels,
    datasets: [
      {
        label: "Enrollments",
        data: enrollments,
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "rgba(37, 99, 235, 1)",
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
        text: "Top Performing Courses (by Enrollment)",
        color: "#fff",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw} students`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "#374151" },
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "#374151" },
      },
    },
  };

  return (
    <div className="chart_bg">
      <DynamicChart type="bar" data={data} options={options} />
    </div>
  );
};

export default TopPerformingCourse;
