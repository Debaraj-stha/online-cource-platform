import React, { useEffect, useRef, useState } from 'react'
import CourseCard from './CourceCard'
import CourseSkeleton from './CourseSkeleton'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import type { LoadCourseOptions } from '../store/reducer-types/course'
import useLoadInstructorCourses from '../hooks/useLoadInstructorCourses'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import ErrorCard from './ErrorCard'
import NoCourseMessageCard from './NoCourseMessageCard'
interface Props {
  includeStudent?: boolean
}
const InstructorCourses = ({ includeStudent = true }: Props) => {
  const ref = useRef<HTMLDivElement>(null)



  const options: LoadCourseOptions = {
    limit: 10
  }

  const { loadInstructorAllCourses } =
    useLoadInstructorCourses({
      queryOptions: options,

    })

  useEffect(() => {
    loadInstructorAllCourses()
  }, [])


  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!ref.current) return
    gsap.to(".course-card", {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    })
  }, { scope: ref })

  const { courses, loading, error } = useSelector((state: RootState) => state.instructor)

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
      ref={ref}
    >
      {
        loading ?
          <CourseSkeleton itemLength={6} />
          : error ? <ErrorCard error={error} />
            : courses.length == 0 ? <NoCourseMessageCard />
              :
              courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-200 course-card"
                  style={{ opacity: 0, transform: "translateY(40px)" }} // hidden before GSAP
                >
                  <CourseCard course={course} view="courses" />
                  {
                    includeStudent && <div className="bg-gray-100 px-4 py-2 text-center text-sm text-gray-700 font-medium">
                      👥 {course.totalEnrolled ?? 0} students
                    </div>
                  }

                </div>
              ))
      }
    </div>
  )
}

export default InstructorCourses
