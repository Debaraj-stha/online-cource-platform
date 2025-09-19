import React, { lazy, Suspense } from 'react'
const InstructorRecentCourses = lazy(() => import("./InstructorRecentCourses"))
const InstructorCourses = lazy(() => import("./InstructorCourses"))
const InstructorPopularCourses = lazy(() => import("./InstructorPopularCourses"))

interface Props {
    includeStudent?: boolean
}
const InstructorAllCoursesCards = ({ includeStudent = true }: Props) => {
    return (
        <div className='space-y-5'>
            <div className='space-y-5 recent-courses'>
                <h2 className="text-2xl font-bold text-gray-200">Recent Courses</h2>
                <Suspense fallback={<p className='text-white'>Loading recent courses...</p>}>
                    <InstructorRecentCourses includeStudent={includeStudent} />
                </Suspense>
            </div>
            <div className='space-y-5 popular-courses'>
                <h2 className="text-2xl font-bold text-gray-200">Popular Courses</h2>
                <Suspense fallback={<p>Loading popular courses...</p>}>
                    <InstructorPopularCourses includeStudent={includeStudent} />
                </Suspense>
            </div>
            <div className='space-y-5 courses'>
                <h2 className="text-2xl font-bold text-gray-200">Courses</h2>
                <Suspense fallback={<p>Loading courses...</p>}>
                    <InstructorCourses includeStudent={includeStudent} />
                </Suspense>
            </div>

        </div>
    )
}

export default InstructorAllCoursesCards
