import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { getInstructorAllReviews, manageReview } from '../../store/reducers/instructorReducer'
import Loader from '../Loader'
import { formatDateTime } from '../../utils/localeFormatter'

const InstructorCoursesReviews = () => {

    const [loading, setLoading] = useState(false)
    const [processing, setProcessing] = useState<{ [key: string]: boolean }>({})
    const filterOptions = ["pending", "approved", "rejected"]
    const [currentSelected, setSelected] = useState<number>(0)
    const reviews = useSelector((state: RootState) => state.instructor.reviews)
    const dispatch = useDispatch<AppDispatch>()

    const handleFilter = (index: number) => {
        setSelected(index)
    }

    const fetchReviews = async () => {
        try {
            setLoading(true)
            dispatch(getInstructorAllReviews())
        } finally {
            setLoading(false)
        }
    }



    const handleClick = async (option: string, reviewId: string) => {
        try {
            console.log(reviewId)
            setProcessing({ [option]: true })
            const res = await dispatch(manageReview({ reviewId, status: option }))
            if (manageReview.fulfilled.match(res)) {
                fetchReviews()
            }


        } catch (error) {

        } finally {
            setProcessing({ [option]: false })
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [dispatch])

    return (
        <div className='space-y-4'>
            <h2 className='text-2xl font-semibold'>Reviews</h2>
            <div className='flex gap-4'>
                {
                    filterOptions.map((option, index) => (
                        <button key={index}
                            onClick={() => handleFilter(index)}
                            title={`${option}`}
                            className={`transition-colors duration-150 rounded ${index === currentSelected ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-600 hover:bg-gray-500"}`}

                        >
                            {option}
                        </button>
                    ))
                }
            </div>
            <hr></hr>
            {
                loading ?
                    <Loader />
                    :
                    <>
                        {
                            reviews?.length == 0 ?
                                <p>No reviews to show</p>
                                :
                                reviews?.filter(rev => rev.status === filterOptions[currentSelected])?.map((review, index) => (
                                    <div key={index} className="p-4 bg-gray-800 rounded-lg space-y-2">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold">{review.user?.name || review.name || "Anonymous"}</h3>
                                            <span className="text-yellow-400">⭐ {review.rating}</span>
                                        </div>
                                        <p className="text-gray-300">{review.review}</p>
                                        <p className="text-sm text-gray-400">
                                            Course: {review.course || "Unknown"}
                                        </p>
                                        <p className='text-sm text-gray-400'>{formatDateTime(review.createdAt!)}</p>
                                        <div className='flex gap-3'>
                                            {
                                                review.status === "pending" && (
                                                    <>
                                                        {
                                                            filterOptions.filter(op => op !== "pending").map((option, index) => (
                                                                <button key={index}
                                                                    title={`${option}`}
                                                                    disabled={processing[option]}
                                                                    onClick={() => handleClick(option, review.id!||review._id!)}
                                                                    className={`rounded-lg ransition-colors  disabled:opacity-50 text-gray-100 ${option === "rejected" ? "bg-red-500 hover:bg-red-400" : "hover:bg-green-400 bg-green-500"}`}>
                                                                    {option}</button>
                                                            ))
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>

                                    </div>
                                ))
                        }
                    </>
            }
        </div>
    )
}

export default InstructorCoursesReviews
