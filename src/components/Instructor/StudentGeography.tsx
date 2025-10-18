import React from "react";
import DynamicChart from "../DynamicChart";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const StudentGeography = () => {
    // Example data (replace with real DB data later)
    const studentGeography = useSelector((state: RootState) => state.instructor.reports?.studentGeography)
    const labels =studentGeography?.map((ele)=>ele.country)??[]
    const students = studentGeography?.map((ele)=>ele.totalStudents)??[];

    const data = {
        labels,
        datasets: [
            {
                label: "Students",
                data: students,
                backgroundColor: [
                    "rgba(59, 130, 246, 0.7)",  // blue
                    "rgba(74, 222, 128, 0.7)",  // green
                    "rgba(239, 68, 68, 0.7)",   // red
                    "rgba(251, 191, 36, 0.7)",  // yellow
                    "rgba(168, 85, 247, 0.7)",  // purple
                ],
                borderColor: "rgba(255, 255, 255, 0.9)",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "right" as const,
                labels: { color: "#fff" },
            },
            title: {
                display: true,
                text: "Student Geography",
                color: "#fff",
            },
        },
    };

    return (
        <div className="chart_bg">
            <DynamicChart type="doughnut" data={data} options={options} />
        </div>
    );
};

export default StudentGeography;
