import React from "react";
import DynamicChart from "../DynamicChart";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const StudentEngagement = () => {
        const studentEngagements = useSelector((state: RootState) => state.instructor.earnings?.studentEngagements)
    const labels = studentEngagements?.map((ele)=>ele.month)??[];
    const activeStudents = studentEngagements?.map((ele)=>ele.totalActiveStudents)??[]; // Example numbers

    const data = {
        labels,
        datasets: [
            {
                label: "Active Students",
                data: activeStudents,
                borderColor: "rgba(59, 130, 246, 1)", // blue
                backgroundColor: "rgba(59, 130, 246, 0.3)",
                fill: true,
                tension: 0.3,
                pointRadius: 4,
                pointBackgroundColor: "rgba(59, 130, 246, 1)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { labels: { color: "#fff" } },
            title: { display: true, text: "Student Engagement (Monthly)", color: "#fff" },
        },
        scales: {
            x: { ticks: { color: "#9ca3af" }, grid: { color: "#374151" } },
            y: { ticks: { color: "#9ca3af" }, grid: { color: "#374151" } },
        },
    };
    return (
        <div className="chart_bg">
            <DynamicChart type="line" data={data} options={options} />
        </div>
    );
};

export default StudentEngagement;
