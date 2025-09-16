import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { setReview, submitReview, type ReviewEditableField } from "../store/reducers/courseReducer";
import ErrorCard from "./ErrorCard";
import { useParams } from "react-router-dom";
import type { Review } from "../@types/reviews";



const ReviewForm = () => {
    const { course_id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState("")
    const { user } = useSelector((state: RootState) => state.auth)
    const { review } = useSelector((state: RootState) => state.course)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true)
        //if logged in set,userid
        const newReview: Review = {
            ...review,
            courseId: course_id!,
            userId:user.id!
        }
        const actionResult = await dispatch(submitReview(newReview))
        if (submitReview.rejected.match(actionResult)) {
            setError("An error occurred while submitting the review.")
        }
        setProcessing(false)
        setError("")

    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target
        dispatch(setReview({ field: name as keyof ReviewEditableField, value }))
    }



    return (
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Write a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email */}
                {
                    // render name and email field if user has not logged in 
                    !user && (
                        <div className="flex flex-col  gap-4">
                            <Input
                                name="name"
                                placeholder="Name"
                                value={review.name || ""}
                                extraClass="flex-1"
                                onChange={handleChange}
                            />
                            <Input
                                name="email"
                                type="email"
                                extraClass="flex-1"
                                placeholder="Email (Optional)"
                                value={review.email}
                                onChange={handleChange}
                            />
                        </div>
                    )
                }

                {/* Comment */}
                <Input
                    isTextArea={true}
                    name="review"
                    onChange={handleChange}
                    value={review.review}
                    placeholder="Write your review..."
                />
                {/* Star Rating */}
                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            size={24}
                            className={`cursor-pointer ${star <= (review.rating) ? "text-yellow-400" : "text-gray-300"
                                }`}
                            onClick={() => dispatch(setReview({ field: "rating", value: star }))}
                            onMouseEnter={() => dispatch(setReview({ field: "rating", value: star }))}
                            onMouseLeave={() => dispatch(setReview({ field: "rating", value: star }))}
                        />
                    ))}
                </div>
                {/*  anonymous user */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="anonymous"
                        checked={review.anonymous}
                        onChange={(e) => dispatch(setReview({ field: "anonymous", value: e.target.checked }))}
                    />
                    <label htmlFor="anonymous" className="text-gray-700">
                        Anonymous
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"

                    disabled={processing}
                    className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition
                    disabled:opacity-50 cursor-not-allowed
                    "
                >
                    Submit Review
                </button>
            </form>
            {
                error && <ErrorCard error={error} />
            }
        </div>
    );
};

export default ReviewForm;
