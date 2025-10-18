import React from 'react'
import DynamicChart from '../DynamicChart'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'

const EnrollmentTrend = () => {
  // Example data (you’ll later fetch this from Firestore/DB)
      const enrollmentTrends=useSelector((state:RootState)=>state.instructor.reports?.enrollmentTrends)
  const labels = enrollmentTrends?.map((ele)=>ele.month)??[]

  const enrollments = enrollmentTrends?.map((ele)=>ele.totalEnrollments)??[]

  console.log(enrollmentTrends)

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Enrollments",
        data: enrollments,
        borderColor: "rgba(59, 130, 246, 1)", // blue-600
        backgroundColor: "rgba(59, 130, 246, 0.3)", // blue-300 with opacity
        tension: 0.3, // smooth curve
        fill: true,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
        pointRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#fff" },
      },
      title: {
        display: true,
        text: "Enrollment Trend (This Year)",
        color: "#fff",
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
  }

  return (
    <div className="chart_bg">
      <DynamicChart type="line" data={data} options={options} />
    </div>
  )
}

export default EnrollmentTrend
