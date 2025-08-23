import React from 'react';

interface Props {
    title: string;
    instructor: string;
    description: string;
    thumbnail: string;
    price: number;
    rating: number;
    totalEnrolled: number;
}

const CourseCard = ({
    title,
    instructor,
    description,
    thumbnail,
    price,
    rating,
    totalEnrolled,
}: Props) => {
    return (
        <div className="rounded-lg shadow hover:shadow-lg transition border p-4 bg-white flex flex-col cursor-pointer">
            <img
                src={thumbnail}
                alt={title}
                className="w-full h-60 object-cover rounded-md mb-3"
            />
            <h3 className="title-h3">{title}</h3>
            <p className="text-sm text-gray-500 mb-2">by {instructor}</p>
            <p className="text-sm text-gray-600 flex-grow">{description.slice(0, 80)}...</p>
            <div className="mt-3 flex justify-between items-center text-sm text-gray-700">
                <span className="font-medium">${price}</span>
                <span>⭐ {rating} ({totalEnrolled})</span>
            </div>
        </div>
    );
};

export default CourseCard;
