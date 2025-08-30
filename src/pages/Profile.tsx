import React from 'react'
import type { Roles } from '../@types/user'
import Avatar from '../components/Avatar'
import StudentProfileCard from '../components/StudentProfileCard'
import InstructorCard from '../components/InstructorCard'
import { popularCourses } from '../constants/courses'
import InstructorProfileCard from '../components/InstructorProfileCard'
import InstructorSocialLinks from '../components/InstructorSocialLinks'
import { MdVerified } from 'react-icons/md'

const Profile = () => {
    // Example user object
    const user = {
        name: "John Doe",
        role: "instructor" as Roles,
        isVerified:true
    }

    // Then use
    const role: Roles = user.role
    const instructor = popularCourses[0].instructor!


    return (
        <div className="container  mx-auto p-6">
            {/* profile header */}
            <div className="flex items-start space-x-4 mb-6">
                <div>
                    <Avatar url="https://randomuser.me/api/portraits/women/68.jpg" />
                </div>
                <div className='space-y-2'>
                    <div className='flex items-center gap-1'>
                        <h1 className="text-2xl font-bold">John Doe</h1>
                        {
                            role==="instructor" && user.isVerified &&  <MdVerified size={20} className='text-blue-500' />
                        }
                       
                    </div>
                    <p className="text-gray-300 capitalize">{role}</p>
                    {/* if instructor and has title of job  */}
                    {role === "instructor" && (
                        <>
                            {

                                instructor.bio && (
                                    <p className="text-sm text-gray-300">{instructor.bio}</p>
                                )
                            }
                            {
                                instructor.title && (
                                    <p className="text-sm text-gray-300">{instructor.title}</p>
                                )
                            }
                            <InstructorSocialLinks
                                email={instructor.email}
                                facebook={instructor.facebook}
                                linkedin={instructor.linkedin}
                                website={instructor.website}
                                phone={instructor.phone}
                                twitter={instructor.twitter}

                            />

                        </>
                    )
                    }
                    <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
                        Edit Profile
                    </button>
                </div>
            </div>
            {role === "student" && (
                <>
                    <StudentProfileCard />
                </>
            )}

            {role === "instructor" && (
                <InstructorProfileCard />
            )}


        </div>
    )
}

export default Profile
