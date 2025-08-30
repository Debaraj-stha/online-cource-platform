import React, { useState } from "react";
import { reviews } from "../constants/reviews";
import type { Review, ReviewType } from "../@types/reviews";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";


interface ReviewsProps {
  courseId: string;
}



const Reviews = ({ courseId }: ReviewsProps) => {
  const courseReviews = reviews.filter((r) => r.courseId === courseId);
  const [filter, setFilter] = useState<ReviewType | "all">("all");

  const filteredReviews =
    filter === "all"
      ? courseReviews
      : courseReviews.filter((r) => r.type === filter);

 
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
             <ReviewCard key={review.id} review={review}/>
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
