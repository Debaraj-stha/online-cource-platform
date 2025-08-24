import React from 'react';
import type { Course } from '../@types/course';



const CourseCard = ({
    title,
    instructor,
    description,
    thumbnail,
    price,
    rating,
    totalEnrolled,
}: Course) => {
    return (
        <>
            <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4 font-body">
                <h2 className="title-h3 font-heading">{title}</h2>
                <p className="text-gray-600 text-sm mt-2">{description}</p>
                <p className="text-blue-600 mt-3 font-medium">${price}</p>
                <p className="text-sm text-gray-500 mt-1">Instructor: {instructor!.name}</p>
                <p className="text-sm text-gray-500">Rating: ⭐ {rating}</p>
                <p className="text-sm text-gray-500">Enrolled: {totalEnrolled} students</p>
            </div>
        </>
    );
};

export default CourseCard;
