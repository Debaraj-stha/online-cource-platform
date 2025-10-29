// InstructorCourses.tsx
import { useCallback, useEffect, useRef, useState } from 'react';
import CourseCard from './CourceCard'
import CourseSkeleton from './CourseSkeleton'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import type { LoadCourseOptions } from '../store/reducer-types/course'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import ErrorCard from './ErrorCard'
import NoCourseMessageCard from './NoCourseMessageCard'
import LoadMoreButton from './LoadMoreButton'
import { loadInstructorCourses } from '../store/reducers/instructorReducer'

interface Props {
  includeStudent?: boolean
}

const InstructorCourses = ({ includeStudent = true }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const [currentPage, setCurrentPage] = useState(0)
  const { user } = useSelector((state: RootState) => state.auth)
  const { courses, loading, error, totalCourses } = useSelector((state: RootState) => state.instructor)


  const getOptions = useCallback((page: number): LoadCourseOptions => ({
    limit: 8,
    page: page
  }), [])

  const loadMorePage = useCallback(() => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    dispatch(loadInstructorCourses({
      instructorId: user.id!,
      options: getOptions(nextPage),
      isLoadMore: true
    }))
  }, [currentPage, dispatch, user.id, getOptions])

  useEffect(() => {
    setCurrentPage(0)
    dispatch(loadInstructorCourses({
      instructorId: user.id!,
      options: getOptions(0)
    }))
  }, [dispatch, user.id, getOptions])


  useEffect(() => {
    setCurrentPage(0)
    const options: LoadCourseOptions = {
      limit: 8,
      page: 0 // Start from page 0
    }

    dispatch(loadInstructorCourses({
      instructorId: user.id!,
      options
    }))
  }, [dispatch, user.id])

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
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
      ref={ref}
    >
      {loading ? (
        <CourseSkeleton itemLength={6} />
      ) : error ? (
        <ErrorCard error={error} />
      ) : courses.length === 0 ? (
        <NoCourseMessageCard />
      ) : (
        <>
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-200 course-card"
            >
              <CourseCard course={course} view="courses" />
              {includeStudent && (
                <div className="bg-gray-100 px-4 py-2 text-center text-sm text-gray-700 font-medium">
                  👥 {course.totalEnrolled ?? 0} students
                </div>
              )}
            </div>
          ))}
          <div className="col-span-full flex flex-col items-center mt-8">
            <p className="text-sm mb-3">
              Showing <span className="font-semibold">{courses.length}</span>{' '}
              of <span className="font-semibold">{totalCourses}</span> courses
            </p>
            {courses.length < (totalCourses ?? 0) && (
              <LoadMoreButton onClick={loadMorePage} />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default InstructorCourses