import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi';
import { MdFlag, MdThumbDown, MdThumbUp } from 'react-icons/md';
import type { ReactionType, Review } from '../@types/reviews';
import ErrorCard from './ErrorCard';
import ReviewReportModal from './ReviewReportModal';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { reactToReview } from '../store/reducers/courseReducer';
import EditReviewModal from './EditReviewModal';
interface Props {
    courseId: string
    review: Review
    userId?: string | null
}
const ReviewActionButtons = ({ review, userId, courseId }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [error, setError] = useState("")
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [reportModalOpen, setReportModalOpen] = useState(false)
    const hasUserReactedToReview = review.hasUserReact !== null

    const react = async (type: ReactionType) => {
        const res = await dispatch(reactToReview({ reviewId: review.id!, type: type, courseId }))
        if (reactToReview.rejected.match(res)) {
            setError("Something went wrong")
        }
    }

    const toggleReportModal = () => {
        setReportModalOpen((prev)=>!prev)
    }
    const toggleEditReviewModal = () => {
        setEditModalOpen((prev)=>!prev)
    }


    return (
        <>
            <div className="flex items-center gap-6 px-4 pb-3 text-gray-500 border-t border-gray-100">
                <button
                    onClick={() => react("like")}
                    title="Like"
                    className="flex items-center gap-1 hover:text-green-600 transition"
                >
                    <MdThumbUp size={18} className={`${hasUserReactedToReview && review.hasUserReact === "like" ? "text-blue-500" : ""}`} />
                    <span className="text-sm">{review.reviewReactionCount?.like}</span>
                </button>
                <button
                    onClick={() => react("dislike")}
                    title="Dislike"
                    className="flex items-center gap-1 hover:text-red-600 transition"
                >
                    <MdThumbDown size={18} className={`${hasUserReactedToReview && review.hasUserReact === "dislike" ? "text-blue-500" : ""}`} />
                    <span className="text-sm">{review.reviewReactionCount?.dislike}</span>
                </button>

                <button
                    title="Report"
                    onClick={toggleReportModal}
                    className="flex items-center gap-1 hover:text-orange-600 transition"
                >
                    <MdFlag size={18} />
                </button>
                {
                    //render edit button only if current review is current logged in review
                    review.user?.id === userId && <button
                        title="Edit Review"
                        onClick={toggleEditReviewModal}
                        className="flex items-center gap-1 hover:text-blue-600 transition"
                    >
                        <BiEdit size={18} />
                    </button>
                }
            </div>
            {
                error && <ErrorCard error={error} />
            }
            {
                // report modal
                reportModalOpen && <ReviewReportModal onClose={toggleReportModal} reviewId={review.id!} courseId={courseId} />
            }
             {
                //review edit modal
                editModalOpen && <EditReviewModal onClose={toggleEditReviewModal} review={review} courseId={courseId} />
            }
        </>
    )
}

export default ReviewActionButtons
