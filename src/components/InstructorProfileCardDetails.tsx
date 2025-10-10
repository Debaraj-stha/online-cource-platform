import React from 'react'
import InstructorSocialLinks from './InstructorSocialLinks'
import type { Instructor } from '../@types/instructor'

interface Props {
    instructor: Partial<Instructor>
}
const InstructorProfileCardDetails = ({ instructor }: Props) => {
    console.log("instructor details in card", instructor)
    return (
        <>
            {

                instructor?.bio && (
                    <p className="text-sm text-gray-300  bio">{instructor.bio}</p>
                )
            }
            {
                instructor?.title && (
                    <p className="text-sm text-gray-300 instructor-title">{instructor.title}</p>
                )
            }
            {
                instructor?.specialization && (
                    <p className="text-sm text-gray-300 instructor-title">{instructor.specialization}</p>
                )
            }
            {
                instructor?.experience && (
                    <p className="text-sm text-gray-300 instructor-title">Experience:{instructor.experience.toFixed(1)}</p>
                )
            }
            {
                instructor?.totalCourses && (
                    <p className="text-sm text-gray-300 instructor-title">Total Courses:{instructor.totalCourses}</p>
                )
            }
            
            <InstructorSocialLinks
                loading={false}
                social={instructor?.socialLinks}

            />

        </>
    )
}

export default InstructorProfileCardDetails
