import React, { useRef } from 'react'
import { popularCourses } from '../constants/courses'
import CourseCard from './CourceCard'
import CourseSkeleton from './CourseSkeleton'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const InstructorRecentCourses = () => {
  const loading = false
  const ref = useRef<HTMLDivElement>(null)

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


  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
      ref={ref}
    >
      {loading ? (
        <CourseSkeleton />
      ) : (
        popularCourses.slice(0, 3).map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-200 course-card"
            style={{ opacity: 0, transform: "translateY(40px)" }}
          >
            <CourseCard course={course} view="courses" />
            <div className="bg-gray-100 px-4 py-2 text-center text-sm text-gray-700 font-medium">
              👥 {course.totalEnrolled ?? 0} students
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default InstructorRecentCourses
