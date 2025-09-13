import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Input from "./Input";

interface ReviewFormProps {
    onSubmit?: (review: {
        name: string;
        email?: string;
        rating: number;
        comment: string;
        verifiedPurchase: boolean;
    }) => void;
}

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [verifiedPurchase, setVerifiedPurchase] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || rating === 0 || !comment) return;

        const review = { name, email, rating, comment, verifiedPurchase };
        if (onSubmit) onSubmit(review);

        // Reset form
        setName("");
        setEmail("");
        setRating(0);
        setHover(0);
        setComment("");
        setVerifiedPurchase(false);
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Write a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email */}
                <div className="flex flex-col  gap-4">
                    <Input
                        name="name"
                        placeholder="Name"
                        value={name}
                        extraClass="flex-1"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        name="email"
                        type="email"
                        extraClass="flex-1"
                        placeholder="Email (Optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            size={24}
                            className={`cursor-pointer ${star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                                }`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        />
                    ))}
                </div>

                {/* Verified Purchase */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="verifiedPurchase"
                        checked={verifiedPurchase}
                        onChange={(e) => setVerifiedPurchase(e.target.checked)}
                    />
                    <label htmlFor="verifiedPurchase" className="text-gray-700">
                        Verified Purchase
                    </label>
                </div>

                {/* Comment */}
                <Input
                    isTextArea={true}
                    name="review"
                    placeholder="Write your review..."
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition
                    disabled:opacity-50 cursor-not-allowed
                    "
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
