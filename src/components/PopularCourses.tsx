import React from 'react'
import { popularCourses } from '../constants/home'
import CourseCard from './CourceCard'

const PopularCourses = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularCourses.map((course) => (
          <div key={course.id} className="course-card card">
            <CourseCard {...course} />
          </div>
        ))}
      </div>
  )
}

export default PopularCourses
