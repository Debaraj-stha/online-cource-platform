import React from 'react'
import { popularCourses } from '../constants/courses'
import CourseCard from './CourceCard'
import CourseSkeleton from './CourseSkeleton'

const EnrolledCourses = () => {
  const loading = true
  return (
    <section>
      <h2 className="title font-semibold mb-3">Enrolled Courses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-8 lg:gap-12'>
        {
          loading ?
            <CourseSkeleton />
            :
            popularCourses.slice(0, 3).map((course) =>
              <div key={course.id} className='space-y-4'>
                <CourseCard course={course} view='courses' />
                <div className="w-full bg-gray-300 h-2 rounded-full mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>

              </div>
            )
        }
      </div>

    </section>
  )
}

export default EnrolledCourses
