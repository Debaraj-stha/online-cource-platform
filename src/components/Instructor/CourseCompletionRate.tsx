import React from 'react'
import DynamicChart from '../DynamicChart'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'

const CourseCompletionRate = () => {
    // Example data (replace with DB data later)
    const courseCompletionRate=useSelector((state:RootState)=>state.instructor.reports?.courseCompletionRate)

    const labels = courseCompletionRate?.map((ele)=>ele.title)??[]
    const completionRates = courseCompletionRate?.map((ele)=>ele.completionRate)??[] // percentage values

    const data = {
        labels,
        datasets: [
            {
                label: "Completion Rate (%)",
                data: completionRates,
                backgroundColor: [
                    "rgba(74, 222, 128, 0.7)",  // green
                    "rgba(59, 130, 246, 0.7)",  // blue
                    "rgba(251, 191, 36, 0.7)",  // yellow
                    "rgba(239, 68, 68, 0.7)",   // red
                    "rgba(168, 85, 247, 0.7)",  // purple
                ],
                borderColor: "rgba(255,255,255,0.8)",
                borderWidth: 2,
            },
        ],
    }


    return (
        <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md">
            <DynamicChart type="bar" data={data} options={{
                indexAxis: "y" as const, 
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Course Completion Rates",
                        color: "#fff",
                    },
                    tooltip: {
                       callbacks:{
                        label: (context) => `${context.raw}% completed`,
                       }
                    },
                },
                scales: {
                    x: {
                        min: 0,
                        max: 100,
                        ticks: { color: "#9ca3af", callback: (val) => `${val}%` },
                        grid: { color: "#374151" },
                    },
                    y: {
                        ticks: { color: "#9ca3af" },
                        grid: { color: "#374151" },
                    },
                },
            }}
            />
        </div>
    )
}

export default CourseCompletionRate
