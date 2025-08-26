import React from 'react';
import type { Course, View } from '../@types/course';
import capitalize, { truncate } from '../utils/string-func';


const CourseCard = ({ course, view = 'home' }: { course: Course; view?: View }) => {
    const isHome = view === 'home';
    const isCourses = view === 'courses';

    //language flag pair
    const flags: Record<string, string> = {
        "nepali": " 🇳🇵",
        "hindi": " 🇮🇳 ",
        "english": " 🇬🇧",
        "other": " 🌐 "
    }

    return (
        <div className="bg-white rounded shadow hover:scale-105 transition-transform duration-150">
            <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover rounded-t" />
            <div className="p-4">
                <h2 className="title-h3">{course.title}</h2>
                {isHome && <p className="text-sm text-gray-600 mt-1">{truncate(course.description)}</p>}
                <p className="text-blue-600 mt-2 font-semibold">{course.isFree ? 'Free' : `$${course.price}`}</p>
                <p className="text-sm text-gray-500">Instructor: {course.instructor?.name}</p>
                <p className="text-sm text-gray-500">Rating: ⭐ {course.rating ?? 'N/A'}</p>
                <p className="text-sm text-gray-500">Enrolled: {course.totalEnrolled ?? 0}</p>
                {isCourses && (
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>🕒 {course.duration}</span>
                        <span>🎯 {capitalize(course.level)}</span>
                        <span> {flags[`${course.language}`]} {capitalize(course.language)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};


export default CourseCard;
