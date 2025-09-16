import React, { memo } from 'react'
import type { Review, ReviewType } from '../@types/reviews';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import capitalize from '../utils/string-func';
import Avatar from './Avatar';
const ReviewBadgeColor: Record<ReviewType, string> = {
    positive: "bg-green-100 text-green-700",
    neutral: "bg-yellow-100 text-yellow-700",
    negative: "bg-red-100 text-red-700",
};

interface Props {
    review: Review
}
const ReviewCard = memo(({ review }: Props) => {

    console.log(review)
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
            else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
        }
        return stars;
    };
    const SERVER_URL = import.meta.env.VITE_SERVER_BASE_URL
    const profileURL = review.user && review.user?.profilePicture && !review.anonymous ? `${SERVER_URL}/uploads/${review.user.profilePicture}` : undefined

    return (
        <div
            key={review.id}
            className="flex gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
        >
            <Avatar username={review.anonymous ? "Anonymous User": review?.user?.name!} url={profileURL} />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">{capitalize(review.anonymous ? "Anonymous User" :review.user?.name||review.name)}</h3>
                    <span title='Review Type' className={`px-2 py-1 rounded-full text-xs ${ReviewBadgeColor[review.type ?? "positive"]}`}>
                        {review.type?.toUpperCase()}
                    </span>
                </div>
                <div className="flex gap-1 mt-1">{renderStars(review.rating)}</div>
                <p className="text-gray-600 text-sm mt-1">{review.review}</p>
                <p className="text-xs text-gray-400 mt-1">
                    {new Date(review.createdAt!).toLocaleDateString()}{" "}
                    {review.verifiedPurchase && "• Verified Purchase"}
                </p>
            </div>
        </div>
    )
})

export default ReviewCard
