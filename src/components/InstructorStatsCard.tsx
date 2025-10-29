import { useRef } from 'react';
import NumberAnimation from './NumberAnimation'
import Skeleton from './Skeleton'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
const CustomSkeleton = () => (
    <>
        <Skeleton extraClass="w-16 h-7 bg-gray-300" />
        <Skeleton extraClass="w-24 h-6 mt-2 bg-gray-300" /></>
)
interface Props {
    totalCourses?: number
    totalReviews?: number
    averageRating?: number
    totalStudents?: number
    loading?: boolean
}

const InstructorStatsCard = ({
    totalCourses = 0,
    totalReviews = 0,
    totalStudents = 0,
    averageRating = 1,
    loading = false,
}: Props) => {
    const ref = useRef<HTMLDivElement>(null)
    useGSAP(() => {
        if (!ref.current) return
        gsap.from(ref.current, {
            opacity: 0,
            y: 40,
            ease: "power1.inOut",
            delay: 0.1
        })

    }, { scope: ref })

    return (
        <div
            ref={ref}
            className={`grid grid-cols-2 sm:grid-cols-4 gap-6 ${!loading ? 'bg-gray-50' : 'bg-gray-200'
                } p-6 rounded-xl shadow-md `}
        >
            {/* Total Courses */}
            <div className="flex flex-col items-center">
                {loading ? (
                    <CustomSkeleton />
                ) : (
                    <>
                        <span className="text-2xl text-blue-500">
                            <NumberAnimation target={totalCourses} />
                        </span>
                        <span className="text-gray-600 mt-1 flex items-center gap-1">
                            📚 Total Courses
                        </span>
                    </>
                )}
            </div>

            {/* Total Students */}
            <div className="flex flex-col items-center">
                {loading ? (
                    <>
                        <CustomSkeleton />
                    </>
                ) : (
                    <>
                        <span className="text-2xl text-blue-500">
                            <NumberAnimation target={totalStudents} />
                        </span>
                        <span className="text-gray-600 mt-1 flex items-center gap-1">
                            👥 Total Students
                        </span>
                    </>
                )}
            </div>

            {/* Average Rating */}
            <div className="flex flex-col items-center">
                {loading ? (
                    <>
                        <CustomSkeleton />
                    </>
                ) : (
                    <>
                        <span className="text-2xl text-blue-500">{averageRating.toFixed(1)}</span>
                        <span className="text-gray-600 mt-1 flex items-center gap-1">
                            ⭐ Average Rating
                        </span>
                    </>
                )}
            </div>

            {/* Total Reviews */}
            <div className="flex flex-col items-center">
                {loading ? (
                    <>
                        <CustomSkeleton />
                    </>
                ) : (
                    <>
                        <span className="text-2xl text-blue-500">
                            <NumberAnimation target={totalReviews} />
                        </span>
                        <span className="text-gray-600 mt-1 flex items-center gap-1">
                            📝 Total Reviews
                        </span>
                    </>
                )}
            </div>
        </div>
    )
}

export default InstructorStatsCard
