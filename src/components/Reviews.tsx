import React, { useState } from "react";
import { reviews } from "../constants/reviews";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import type { Review, ReviewType } from "../@types/reviews";
import ReviewForm from "./ReviewForm";


interface ReviewsProps {
  courseId: string;
}

const ReviewBadgeColor: Record<ReviewType, string> = {
  positive: "bg-green-100 text-green-700",
  neutral: "bg-yellow-100 text-yellow-700",
  negative: "bg-red-100 text-red-700",
};

const Reviews = ({ courseId }: ReviewsProps) => {
  const courseReviews = reviews.filter((r) => r.courseId === courseId);
  const [filter, setFilter] = useState<ReviewType | "all">("all");

  const filteredReviews =
    filter === "all"
      ? courseReviews
      : courseReviews.filter((r) => r.type === filter);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Student Reviews</h2>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {(["all", "positive", "neutral", "negative"] as const).map((f) => (
          <button
            key={f}
            className={`px-4 py-1 rounded-full border ${filter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5 sm:gap-12 md:gap-20 lg:gap-32">

        {filteredReviews.length === 0 ? (
         <div className="flex-2/4">
           <p className="text-gray-500 text-center">No reviews in this category.</p>
           </div>
        ) : (
          <div className="space-y-4 flex-2/5">
            {filteredReviews.map((review: Review) => (
              <div
                key={review.id}
                className="flex gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <img
                  src={review.studentAvatar || "https://via.placeholder.com/50"}
                  alt={review.studentName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">{review.studentName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${ReviewBadgeColor[review.type ?? "positive"]}`}>
                      {review.type?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-1">{renderStars(review.rating)}</div>
                  <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(review.createdAt).toLocaleDateString()}{" "}
                    {review.verifiedPurchase && "• Verified Purchase"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      <div className="flex-1">
          <ReviewForm />
      </div>
      </div>
    </div>
  );
};

export default Reviews;
