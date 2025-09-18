import { memo, useState } from 'react'
import type { ReactionType, Review, ReviewType } from '../@types/reviews';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import capitalize from '../utils/string-func';
import Avatar from './Avatar';
import { MdFlag, MdThumbDown, MdThumbUp } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { reactToReview } from '../store/reducers/courseReducer';
import ErrorCard from './ErrorCard';
import ReviewReportModal from './ReviewReportModal';

const ReviewBadgeColor: Record<ReviewType, string> = {
    positive: "bg-green-100 text-green-700",
    neutral: "bg-yellow-100 text-yellow-700",
    negative: "bg-red-100 text-red-700",
};

interface Props {
    review: Review,
    courseId: string
}


const ReviewCard = memo(({ review, courseId }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const [error, setError] = useState("")

    const [modalOpen, setModalOpen] = useState(false)


    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
            else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
        }
        return stars;
    };

    const SERVER_URL = import.meta.env.VITE_SERVER_BASE_URL;
    const profileURL =
        review.user && review.user?.profilePicture && !review.anonymous
            ? `${SERVER_URL}/uploads/${review.user.profilePicture}`
            : undefined;

    const react = async (type: ReactionType) => {
        const res = await dispatch(reactToReview({ reviewId: review.id!, type: type, courseId }))
        if (reactToReview.rejected.match(res)) {
            setError("Something went wrong")
        }
    }

    const hasUserReactedToReview = review.hasUserReact !== null

    return (
        <div className="space-y-3 p-4 rounded-xl bg-white shadow-sm border border-gray-200 hover:shadow-md transition">
            {/* Top Section */}
            <div key={review.id} className="flex gap-4">
                {/* Avatar */}
                <Avatar
                    username={review.anonymous ? "Anonymous User" : review?.user?.name!}
                    url={profileURL}
                />

                {/* Review Body */}
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">
                            {capitalize(review.anonymous ? "Anonymous User" : review.user?.name || review.name)}
                        </h3>
                        <span
                            title="Review Type"
                            className={`px-2 py-1 rounded-full text-xs font-medium ${ReviewBadgeColor[review.type ?? "positive"]}`}
                        >
                            {review.type?.toUpperCase()}
                        </span>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mt-1">{renderStars(review.rating)}</div>

                    {/* Review Text */}
                    <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                        {review.review}
                    </p>

                    {/* Meta Info */}
                    <p className="text-xs text-gray-400 mt-2">
                        {new Date(review.createdAt!).toLocaleDateString()}{" "}
                        {review.verifiedPurchase && "• Verified Purchase"}
                    </p>
                </div>
            </div>

            {/* Actions */}
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
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-1 hover:text-orange-600 transition"
                >
                    <MdFlag size={18} />
                </button>
            </div>
            {
                error && <ErrorCard error={error} />
            }
            {
                modalOpen && <ReviewReportModal onClose={() => setModalOpen(false)} reviewId={review.id!} courseId={courseId} />
            }
        </div>
    )
})

export default ReviewCard
