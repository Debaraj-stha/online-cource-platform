import React, { useEffect, useRef, useState } from 'react'
import CourseCard from './CourceCard'
import CourseSkeleton from './CourseSkeleton'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { LoadCourseOptions } from '../store/reducer-types/course'
import useLoadInstructorCourses from '../hooks/useLoadInstructorCourses'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import ErrorCard from './ErrorCard'
import NoCourseMessageCard from './NoCourseMessageCard'
interface Props {
  includeStudent?: boolean
}

const InstructorPopularCourses = ({ includeStudent = true }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
    const { popularCourses } = useSelector((state: RootState) => state.instructor)

  const options: LoadCourseOptions = {
    limit: 8
  }

  const { loadPopularCourses } =
    useLoadInstructorCourses({
      queryOptions: options,
      setLoading,
      setError,
    })
  useEffect(() => {
    loadPopularCourses()
  }, [])

  gsap.registerPlugin(ScrollTrigger)
  useGSAP(() => {
    if (!ref.current) return
    gsap.set(".course-card", { opacity: 0, y: -40 })
    gsap.to(".course-card", {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.6,
      delay: 0.3,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        scrub: true,
        end: "top 40%",
        toggleActions: "play none none reverse",
      }
    })
  }, { scope: ref })


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10" ref={ref}>
      {
        loading ?
          <CourseSkeleton />
          :
          error ? <ErrorCard error={error} />
            : popularCourses.length == 0 ?
              <NoCourseMessageCard />
              :
              popularCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-200 course-card"
                 
                >
                  <CourseCard course={course} view="courses" />
                  {
                    includeStudent && <div className="bg-gray-100 px-4 py-2 text-center text-sm text-gray-700 font-medium">
                      👥 {course.totalEnrolled ?? 0} students
                    </div>
                  }
                </div>
              ))}
    </div >
  )
}

export default InstructorPopularCourses
