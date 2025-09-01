import React from "react";
import DynamicChart from "../DynamicChart";

const FeedbackTrends = () => {
    const labels = ["Neutral", "Positive", "Negative"];
    const feedbacks = [200, 400, 120];

    const data = {
        labels,
        datasets: [
            {
                data: feedbacks,
                backgroundColor: [
                    "rgba(59, 130, 246, 0.7)",  
                    "rgba(74, 222, 128, 0.7)",  
                    "rgba(239, 68, 68, 0.7)",   
                ],
                borderWidth: 2,
                borderColor: ["#3b82f6", "#4ade80", "#ef4444"], 
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Feedback Trends",
                color: "#fff",
            },
            legend: {
                labels: { color: "#fff" },
                position: "right" as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.label}: ${context.raw} feedbacks`,
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

export default FeedbackTrends;
