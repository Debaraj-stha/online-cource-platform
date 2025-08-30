import React from 'react'
import NumberAnimation from './NumberAnimation'
interface Props{
    totalCourses?:number
    totalReviews?:number
    averageRating?:number
    totalStudents?:number
}
const InstructorStatsCard = ({totalCourses=0,totalReviews=0,totalStudents=0,averageRating=1}:Props) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-gray-50 p-6 rounded-xl shadow-md">
            <div className="flex flex-col items-center">
                <span className="text-2xl text-blue-500"><NumberAnimation target={totalCourses} /></span>
                <span className="text-gray-600 mt-1 flex items-center gap-1">
                    📚 Total Courses
                </span>
            </div>

            <div className="flex flex-col items-center">
                <span className="text-2xl text-blue-500"><NumberAnimation target={totalStudents} /></span>
                <span className="text-gray-600 mt-1 flex items-center gap-1">
                    👥 Total Students
                </span>
            </div>

            <div className="flex flex-col items-center">
                <span className="text-2xl text-blue-500">{averageRating}</span>
                <span className="text-gray-600 mt-1 flex items-center gap-1">
                    ⭐ Average Rating
                </span>
            </div>

            <div className="flex flex-col items-center">
                <span className="text-2xl text-blue-500"><NumberAnimation target={totalReviews} /></span>
                <span className="text-gray-600 mt-1 flex items-center gap-1">
                    📝 Total Reviews
                </span>
            </div>
        </div>

    )
}

export default InstructorStatsCard
