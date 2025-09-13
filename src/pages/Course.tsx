import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CourseCard from '../components/CourceCard'
import { popularCourses } from '../constants/courses'
import SimilarCourses from '../components/SimilarCourses'
import Curriculum from '../components/Curriculm'
import InstructorCard from '../components/InstructorCard'
import Reviews from '../components/Reviews'
import ResourcesCard from '../components/ResourcesCard'
import CourseFAQCard from '../components/CourseFAQCard'

import CoursePreview from '../components/CoursePreview'
import TargetAudienceCard from '../components/TargetAudience'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { loadCourse } from '../store/reducers/courseReducer'
import Loader from '../components/Loader'



const Course = () => {
    const { course_id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.auth)
    if (!course_id) return navigate("/courses")
    useEffect(() => {
        const fetchCourse = async () => {
            await dispatch(loadCourse({ courseId: course_id }))

        }
        fetchCourse()
    }, [])
    const {detailedCourse}=useSelector((state:RootState)=>state.course)
    if(!detailedCourse) return <Loader/>
    return (
        <div className='space-y-4 sm:space-y-8 md:space-y-12 sm:mt-12 sm:px-6 md:px-14 lg:px-24 xl:px-32 '>
            <div className='flex flex-col lg:flex-row gap-5 p-6'>
                <div className='flex-2/4'>
                    <CourseCard course={detailedCourse.course} view="details" />
                </div>
                <div className="flex-2/4 h-80 lg:h-auto">
                    <CoursePreview url={detailedCourse.course.preview!} />
                </div>
            </div>
            <div>
                <Curriculum modules={detailedCourse.course.module!} />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-16 lg:gap-24 xl:gap-32  bg-gray-50  p-6 space-y-4'>
                    <InstructorCard instructor={detailedCourse.course.instructor!} />
                    <TargetAudienceCard audience={detailedCourse.course.targetedAudiences!} />

                </div>
            </div>
            {/* <CertificateCard certificate={course.certificate!}/> */}
            <div className='space-y-4 md:space-y-8 lg:space-y-12'>
                <Reviews />
                <ResourcesCard resources={detailedCourse.course.resources!} />
                {/* <CourseFAQCard faqs={detailedCourse?.course.faq} /> */}
            </div>
            <SimilarCourses />
        </div>
    )
}

export default Course
