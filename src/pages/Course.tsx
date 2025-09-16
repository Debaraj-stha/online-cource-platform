import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import CourseCard from '../components/CourceCard'
import SimilarCourses from '../components/SimilarCourses'
import Curriculum from '../components/Curriculm'
import InstructorCard from '../components/InstructorCard'
import Reviews from '../components/Reviews'
import CourseFAQCard from '../components/CourseFAQCard'

import CoursePreview from '../components/CoursePreview'
import TargetAudienceCard from '../components/TargetAudience'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { loadCourse } from '../store/reducers/courseReducer'
import Loader from '../components/Loader'
import type { CourseResource, Lesson, Module } from '../@types/course'




const Course = () => {
    const [previewVideo, setPreviewVideo] = useState("")
    const { course_id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.auth)
    //replace overwriter the route history stack and user cannot go back by click on back button
    if (!course_id) return <Navigate to="/courses" replace />

    useEffect(() => {
        const fetchCourse = async () => {
            await dispatch(loadCourse({ courseId: course_id, limit: "10" }))

        }
        fetchCourse()
    }, [])




    const { detailedCourse } = useSelector((state: RootState) => state.course)
    // get preview video
    useEffect(() => {
        if (!detailedCourse?.modules) return;
        // Flatten lessons
        const allLessons: Lesson[] = detailedCourse.modules.flatMap((mod: Module) => mod.lessons);
        // Flatten resources
        const allResources: CourseResource[] = allLessons.flatMap(
            (lesson: Lesson) => lesson.resources ?? []
        );
        // Find first video
        const firstVideo = allResources.find((res) => res.type === "video");
        if (firstVideo) {
            setPreviewVideo(firstVideo.url);
        }
    }, [detailedCourse]);


    if (!detailedCourse) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <div className='space-y-4 sm:space-y-8 md:space-y-12 sm:mt-12 sm:px-6 md:px-14 lg:px-24 xl:px-32 '>

            <div className='flex flex-col lg:flex-row gap-5'>
                <div className='flex-2/4'>

                    <CourseCard course={detailedCourse.course} view="details" />
                </div>
                <div className="flex-2/4 h-80 lg:h-auto">

                    {
                        previewVideo ? <CoursePreview url={previewVideo} /> :
                            <div className="flex items-center justify-center h-full my-auto">
                                <p>No preview video available</p>
                            </div>

                    }
                </div>
            </div>
            <div className='space-y-4 sm:space-y-8 md:space-y-12'>
                <Curriculum modules={detailedCourse.modules!} />
                <div className='grid grid-cols-1 md:grid-cols-2 rounded-xl gap-4 sm:gap-8 md:gap-16 lg:gap-24 xl:gap-32  bg-gray-50  p-6 space-y-4'>
                    <InstructorCard instructor={detailedCourse.course.instructor!} />
                    <TargetAudienceCard audience={detailedCourse.course.targetedAudiences!} />

                </div>
            </div>
            {/* <CertificateCard certificate={course.certificate!}/> */}
            <div className='space-y-4 md:space-y-8 lg:space-y-12'>
                <Reviews />
                <CourseFAQCard faqs={detailedCourse.faqs} />
            </div>
            <SimilarCourses similarCourses={detailedCourse.similarCourses} />
        </div>
    )
}

export default Course
