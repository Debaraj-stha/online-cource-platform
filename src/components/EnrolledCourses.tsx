import React, { useRef } from 'react'
import { popularCourses } from '../constants/courses'
import CourseCard from './CourceCard'
import CourseSkeleton from './CourseSkeleton'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const EnrolledCourses = () => {
  const loading = false

  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!ref.current) return
    gsap.from(".enrolled-courses", {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.4,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })
  }, { scope: ref })

  return (
    <section ref={ref}>
      <h2 className="title font-semibold mb-3">Enrolled Courses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-8 lg:gap-12'>
        {
          loading ?
            <CourseSkeleton />
            :
            popularCourses.slice(0, 3).map((course) =>
              <div key={course.id} className='space-y-4 enrolled-courses'>
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
