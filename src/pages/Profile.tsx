import type { Roles } from '../@types/user'
import Avatar from '../components/Avatar'
import StudentProfileCard from '../components/StudentProfileCard'
// import { popularCourses } from '../constants/courses'
import InstructorProfileCard from '../components/InstructorProfileCard'
import InstructorSocialLinks from '../components/InstructorSocialLinks'
import { MdVerified } from 'react-icons/md'
import Skeleton from '../components/Skeleton'
import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

const Profile = () => {
    //scroll to top at first
    useEffect(() => {
        const body = document.documentElement
        body.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
    // Example user object
    const user = {
        name: "John Doe",
        role: "instructor" as Roles,
        isVerified: true
    }

    const {popularCourses,newestCourses,highestRatedCourses}=useSelector((state:RootState)=>state.course)


    const role: Roles = user.role
    const instructor = popularCourses[0].instructor! ||newestCourses[0].instructor || highestRatedCourses[0].instructor

    const loading = false
    const isUser = true //flag to user himself/herself has visited the page
    const ref = useRef<HTMLDivElement>(null)
    const location = useLocation()
    const navigate = useNavigate()
    const state = location.state
    const from = state?.from
    //animating profile header
    useGSAP(() => {
        if (!ref) return
        const current = ref.current
        const profile_image = current?.querySelector("img")

        const name = current?.querySelector(".profile-name")
        const button = current?.querySelector("button")
        const instructor_title = current?.querySelector(".instructor-title")
        const bio = current?.querySelector(".bio")
        const social_links = current?.querySelector(".social_links")
        if (profile_image)
            gsap.from(profile_image, {
                opacity: 0,
                y: 20,
                duration: 0.2,
                ease: "power1.inOut"
            })

        if (name)
            gsap.from(name, {
                opacity: 0,
                y: 20,
                duration: 0.1,
                ease: "power1.inOut"
            })

        if (button)
            gsap.from(button, {
                opacity: 0,
                y: 20,

                ease: "power1.inOut"
            })
        if (bio)
            gsap.from(bio, {
                opacity: 0,
                y: 20,
                delay: 0.2,
                ease: "power1.inOut"
            })
        if (instructor_title)
            gsap.from(instructor_title, {
                opacity: 0,
                y: 20,
                delay: 0.2,
                ease: "power1.inOut"
            })

        if (social_links)
            gsap.from(social_links.querySelectorAll("a"), {
                stagger: 0.1,
                opacity: 0,
                delay: 0.1,
                duration: 0.6,
                y: 20,
                ease: "power1.inOut"
            })

    }, [ref])

    return (
        <div className="mx-auto p-6" >
            {/* profile header */}
            <div className="flex items-start space-x-4 mb-6 sm:gap-4 profile-header" ref={ref}>
                {
                    loading ?
                        <div>
                            <Skeleton extraClass='rounded-full h-16 w-16' />
                        </div>
                        :

                        <Avatar url="https://randomuser.me/api/portraits/women/68.jpg" />

                }

                <div className='space-y-2'>
                    <div className='flex items-center gap-1'>
                        {
                            loading ? <Skeleton extraClass='w-48 h-7' /> :
                                <h1 className="text-2xl font-bold  profile-name">John Doe</h1>
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
                                    <p className="text-sm text-gray-300  bio">{instructor.bio}</p>
                                )
                            }Profile
                            {
                                instructor.title && (
                                    <p className="text-sm text-gray-300 instructor-title">{instructor.title}</p>
                                )
                            }
                            <InstructorSocialLinks
                                loading={false}
                               social={instructor.socialLinks}

                            />

                        </>
                    )
                    }
                    {
                        isUser && !loading && <button
                            onClick={() => {
                                from === "instructor" ? navigate("/instructor/profile/edit",{state:{from:from}}) :
                                    navigate("/profile/edit")
                            }}
                            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
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
            {/* only include instructor details if it was visited from instructor page */}
            {
                from !== "instructor" && (
                    <InstructorProfileCard />
                )}


        </div>
    )
}

export default Profile
