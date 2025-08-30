import React from 'react'
import { useParams } from 'react-router-dom'
import CourseCard from '../components/CourceCard'
import { popularCourses } from '../constants/courses'
import SimilarCourses from '../components/SimilarCourses'
import Curriculum from '../components/Curriculm'
import InstructorCard from '../components/InstructorCard'
import Reviews from '../components/Reviews'
import ResourcesCard from '../components/ResourcesCard'
import CourseFAQCard from '../components/CourseFAQCard'
import ReviewForm from '../components/ReviewForm'
import CoursePreview from '../components/CoursePreview'
import TargetAudienceCard from '../components/TargetAudience'
import CertificateCard from '../components/CertificateCard'


const Course = () => {
    const { course_id } = useParams()
    const course = popularCourses[0]
    return (
        <div className='space-y-4 sm:space-y-8 md:space-y-12 sm:mt-12 sm:px-6 md:px-14 lg:px-24 xl:px-32 '>
            <div className='flex flex-col lg:flex-row gap-5 p-6'>
                <div className='flex-2/4'>
                    <CourseCard course={course} view="details" />
                </div>
                <div className="flex-2/4 h-80 lg:h-auto">
                    <CoursePreview url={course.preview!} />
                </div>
            </div>
            <div>
                <Curriculum modules={course.module!} />
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-16 lg:gap-24 xl:gap-32  bg-gray-50  p-6 space-y-4'>
                    <InstructorCard instructor={course.instructor!} />
                    <TargetAudienceCard audience={course.targetedAudiences!} />

                </div>
            </div>
            {/* <CertificateCard certificate={course.certificate!}/> */}
            <div className='space-y-4 md:space-y-8 lg:space-y-12'>
                <Reviews courseId='web-dev-101' />
                <ResourcesCard resources={course.resources!} />
                <CourseFAQCard faqs={course.faq} />
            </div>
            <SimilarCourses />
        </div>
    )
}

export default Course
