import React, { memo } from 'react'

import CourseCard from './CourceCard'
import { useNavigate } from 'react-router-dom'
import type { Course } from '../@types/course'
interface Props {

    similarCourses: Course[]
}
const SimilarCourses = memo(({ similarCourses }: Props) => {
    const navigate = useNavigate()
    return (
        <div className=''>
            <h3 className='text-2xl font-bold mb-4'>Similar Courses</h3>
            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10  xl:gap-14'>
                {
                    similarCourses.slice(0, 6).map((course) => <CourseCard key={course.id} course={course} view='courses' onClick={() => navigate(`/courses/${course.id}`)} />)
                }
            </div>
        </div>
    )
})

export default SimilarCourses
