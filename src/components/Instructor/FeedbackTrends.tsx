
import DynamicChart from "../DynamicChart";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const FeedbackTrends = () => {
    const instructorReviewsCount=useSelector((state:RootState)=>state.instructor.earnings?.instructorReviewsCount)
    const labels = ["Neutral", "Positive", "Negative"];
    const feedbacks = [instructorReviewsCount?.neutral??0,instructorReviewsCount?.positive??0,instructorReviewsCount?.negative??0];


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
