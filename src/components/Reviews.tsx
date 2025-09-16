import React, { memo, useState } from "react";
import { reviews } from "../constants/reviews";
import type { Review, ReviewType } from "../@types/reviews";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import LoadMoreButton from "./LoadMoreButton";
import { loadMoreReviews, type LoadMoreOptions } from "../store/reducers/courseReducer";


interface ReviewsProps {
  courseId: string;
}

const Reviews = memo(() => {
  const dispatch = useDispatch<AppDispatch>()
  const { detailedCourse } = useSelector((state: RootState) => state.course)
  const courseReviews = detailedCourse?.reviews ?? []
  const avgRating=detailedCourse?.averageRating
  const [filter, setFilter] = useState<ReviewType | "all">("all");
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(2)

  const filteredReviews =
    filter === "all"
      ? courseReviews
      : courseReviews.filter((r) => r.type === filter);

  const handleLoadMoreReviews = async () => {
    try {
      setLoading(true)
      console.log(detailedCourse?.course._id, detailedCourse?.course.id)
      const options: LoadMoreOptions = {
        page: `${page}`,
        limit: "2",
        courseId: detailedCourse?.course.id!
      }
      const res = await dispatch(loadMoreReviews(options))
      if (loadMoreReviews.fulfilled.match(res)) {
        setLoading(false)
        setPage((prev) => prev + 1) //updating page value on success
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        📝 Student Reviews
        <span className="ml-2 text-gray-500 text-lg">
          ({detailedCourse?.totalReviews ?? 0})
        </span>
        {avgRating !== undefined && (
          <span className="ml-2 text-yellow-500 text-lg">
            ⭐ {avgRating.toFixed(1)} / 5
          </span>
        )}
      </h2>


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
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
        <div className="flex-1">
          <ReviewForm />
        </div>
      </div>

      {
        courseReviews.length < detailedCourse?.totalReviews! && <LoadMoreButton onClick={handleLoadMoreReviews} disabled={loading} />
      }


    </div>
  );
});

export default Reviews;
