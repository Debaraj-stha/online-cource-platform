import React from 'react'
import { popularCourses } from '../constants/courses'
import CourseCard from './CourceCard'

const InstructorPopularCourses = () => {
  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {popularCourses.slice(0, 3).map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-200"
          >
            <CourseCard course={course} view="courses" />
            <div className="bg-gray-100 px-4 py-2 text-center text-sm text-gray-700 font-medium">
              👥 {course.totalEnrolled ?? 0} students
            </div>
          </div>
        ))}
      </div>
  )
}

export default InstructorPopularCourses
