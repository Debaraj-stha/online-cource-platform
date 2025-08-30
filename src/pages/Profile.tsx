import type { Roles } from '../@types/user'
import Avatar from '../components/Avatar'
import StudentProfileCard from '../components/StudentProfileCard'
import { popularCourses } from '../constants/courses'
import InstructorProfileCard from '../components/InstructorProfileCard'
import InstructorSocialLinks from '../components/InstructorSocialLinks'
import { MdVerified } from 'react-icons/md'
import Skeleton from '../components/Skeleton'

const Profile = () => {
    // Example user object
    const user = {
        name: "John Doe",
        role: "student" as Roles,
        isVerified: true
    }


    const role: Roles = user.role
    const instructor = popularCourses[0].instructor!

    const loading = true
    const isUser = true //flat to user himself/herself has visited the page
    return (
        <div className="container  mx-auto p-6">
            {/* profile header */}
            <div className="flex items-start space-x-4 mb-6 sm:gap-4">
                {
                    loading ?
                        <Skeleton extraClass='rounded-full h-16 w-16' />
                        :
                        <Avatar url="https://randomuser.me/api/portraits/women/68.jpg" />
                }

                <div className='space-y-2'>
                    <div className='flex items-center gap-1'>
                        {
                            loading ? <Skeleton extraClass='w-48 h-7' /> :
                                <h1 className="text-2xl font-bold">John Doe</h1>
                        }

                        {
                            role === "instructor" && user.isVerified && !loading && <MdVerified size={20} className='text-blue-500' />
                        }

                    </div>

                    <p className="text-gray-300 capitalize">{role}</p>
                    {loading &&
                        <>
                            <Skeleton extraClass='w-6xl h-6' />
                            <Skeleton extraClass='w-4xl h-6' />
                            <Skeleton extraClass='w-56 h-6' />
                        </>
                    }

                    {/* if instructor and has title of job  */}
                    {role === "instructor" && !loading && (
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
                    {
                        isUser && !loading && <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
                            Edit Profile
                        </button>
                    }

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
