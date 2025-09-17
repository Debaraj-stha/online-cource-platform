import { flags } from '../constants/flags'
import capitalize from '../utils/string-func'
import { convertPriceToLocalPrice } from '../utils/helper'
import { formatPrice } from '../utils/localeFormatter'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { setMessageWithTimeout, type Message } from '../store/reducers/messageReducer'
import ErrorCard from './ErrorCard'
import Loader from './Loader'
import { memo } from 'react'
interface Props {
    locale?: string
}
const DetailsCourseCard = memo(({ locale = "en_US" }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.auth)
    const enrolledCourseIds = useSelector((state: RootState) => state.course.enrolledCourseIds as string[])


    const { detailedCourse, loadingCourse, error } = useSelector((state: RootState) => state.course)
    const course = detailedCourse?.course!
    const localCurrency = localStorage.getItem("currency") || "USD"
    const priceWithDiscount = course.price - (course.discount ?? 0)
    const { price, success } = convertPriceToLocalPrice(priceWithDiscount, course.priceUnit, localCurrency)
    const [language_code, _] = locale.split("_")
    const SERVER_URL = import.meta.env.VITE_SERVER_BASE_URL
    const thumbnail = `${SERVER_URL}/uploads/${course.thumbnail.toString()}`
    const navigate = useNavigate()

    //if converted ,new price else original price
    const localPrice = success ? price : priceWithDiscount
    const { price: localDiscount, success: discountSuccess } = convertPriceToLocalPrice(course.discount ?? 0, course.priceUnit, localCurrency)
    const discountPrice = (discountSuccess ? localDiscount : course.discount) || 0
    const courseDetails = {
        name: course.title,
        amount: course.price,
        discount: course.discount,
        discountReason: course.discountReason
    }

    const handleEnroll = () => {
        if (!user) {
            const message: Message = {
                messages: "Redirecting to Login Page",
                id: Date.now(),
                type: "info"
            };

            dispatch(setMessageWithTimeout(message, 2000))
            setTimeout(() => {
                navigate("/auth/login", { state: { from: `/courses/${course.id}` } })
            }, 2000)
        }
        console.log(courseDetails)
        navigate("/payment/", { state: { courseId: course.id, courseDetails, studentId: user.id } })
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden">
            {
                error ?
                    <ErrorCard error={error} />
                    : loadingCourse ?
                        <Loader />
                        :

                        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-12">

                            {/* Left: Thumbnail + Pricing */}
                            <div className="flex flex-col gap-5">
                                <img
                                    src={thumbnail}
                                    alt={course.title}
                                    className="w-full  object-cover rounded-xl shadow-md"
                                />

                                {/* Price + CTA */}
                                <div className="mt-6 bg-white rounded-xl p-6 shadow-md sticky top-6">


                                    <p className="text-2xl font-bold text-blue-600">
                                        {course.isFree ? (
                                            "Free"
                                        ) : course.discount ? (
                                            <>
                                                <span className="line-through mr-2">{formatPrice(discountPrice, language_code)}</span>
                                                <span>{formatPrice(localPrice, language_code)}</span>
                                            </>
                                        ) : (
                                            <span>{formatPrice(localPrice, language_code)}</span>
                                        )}
                                    </p>

                                    {
                                        //if already has enrolled,do not render enroll button
                                        !enrolledCourseIds.includes(course.id) &&
                                        <button
                                            title='Enroll To Course'
                                            onClick={handleEnroll}
                                            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition">
                                            🚀 Enroll Now
                                        </button>
                                    }

                                    <p className="mt-2 text-xs text-gray-500 text-center">
                                        30-day money-back guarantee
                                    </p>
                                </div>

                                {/* certificate card */}
                                {/* {
                        course.certificate && <CertificateCard certificate={course.certificate?.toString()} />
                    } */}

                            </div>

                            {/* Right: Course Details */}
                            <div className="space-y-6">
                                <h1 className="text-3xl font-extrabold text-gray-800">{course.title}</h1>
                                <p className="text-gray-600 leading-relaxed">{course.description}</p>

                                {/* Quick Stats */}
                                <div className="flex flex-wrap gap-3 mt-4">
                                    <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">👨‍🏫 {course.instructor?.name}</span>
                                    <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">⭐ {course.rating?.toFixed(1) ?? "N/A"}</span>
                                    <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">🕒 {course.duration}</span>
                                    <span className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700">🎯 {capitalize(course.level)}</span>
                                    <span className="px-3 py-1 text-sm rounded-full bg-pink-100 text-pink-700">
                                        {flags[course.language! || "english"] || "🌐"} {capitalize(course.language)}
                                    </span>
                                    <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">👥 {course.totalEnrolled ?? 0} Enrolled</span>
                                </div>

                                {/* Requirements */}
                                {course.prerequisites && course.prerequisites?.length > 0 ? (
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 mt-6">📌 Requirements</h2>
                                        <ul className="mt-2 space-y-2 text-gray-700 text-sm">
                                            {course.prerequisites.map((req, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-blue-500 mt-1">✔</span>
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : <p className="font-sans text-gray-700">No prerequisites are required</p>
                                }

                                {/* What you’ll learn */}
                                {course.whatYouWillLearn && course.whatYouWillLearn?.length > 0 && (
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 mt-6">🎓 What you’ll learn</h2>
                                        <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-gray-700 text-sm">
                                            {course.whatYouWillLearn.map((out, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-green-500 mt-1">➡</span>
                                                    <span>{out}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                            </div>
                        </div>
            }

        </div>
    )
})

export default DetailsCourseCard
