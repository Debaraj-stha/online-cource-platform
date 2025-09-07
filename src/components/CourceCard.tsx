import type { Course, View } from '../@types/course';
import capitalize, { truncate } from '../utils/string-func';
import { Link } from 'react-router-dom';
import DetailsCourseCard from './DetailsCourseCard';
import { flags } from '../constants/flags';
import { formatDateTime, formatPrice } from '../utils/localeFormatter';

const CourseCard = ({
    course,
    view = 'home',
    onClick,
    locale = "en_US",
}: {
    course: Course;
    view?: View;
    onClick?: () => void;
    locale?: string
}) => {
    const isHome = view === 'home';
    const isCourses = view === 'courses';
    const isDetails = view === 'details';


    if (isDetails) return <DetailsCourseCard course={course} />;

    const [countryCode, countryShortName] = locale.split("_")
    const SERVER_URL=import.meta.env.VITE_SERVER_BASE_URL
    const thumbnail=`${SERVER_URL}/uploads/${course.thumbnail.toString()}`

    return (
        <div
            onClick={onClick}
            className="course-card rounded bg-gray-900 cursor-pointer shadow hover:scale-105 hover:shadow-2xl transition-transform duration-150 space-y-4"
        >
            
                <img
                    src={thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t"
                />
            
            <div className="p-4">
                <h2 className="title">{course.title}</h2>
                {isHome && <p className="text-sm mt-1">{truncate(course.description)}</p>}

                <p className="text-blue-600 mt-2 font-semibold">
                    {course.isFree ? (
                        'Free'
                    ) : course.discount ? (
                        <>
                            <span className="line-through mr-2">{formatPrice(course.price, countryCode)}</span>
                            <span>{formatPrice(course.price - course.discount, countryCode)}</span>
                        </>
                    ) : (
                        <span>{formatPrice(course.price, countryCode)}</span>
                    )}
                </p>
                <p>
                    {formatDateTime(course.createdAt!, countryShortName)}
                </p>

                <Link to="/" className="text-sm">
                    Instructor: {course.instructor?.name}
                </Link>
                <p className="text-sm">Rating: ⭐ {course.rating ?? 'N/A'}</p>
                <p className="text-sm">Enrolled: {course.totalEnrolled ?? 0}</p>

                {isCourses && (
                    <div className="flex justify-between mt-2 text-xs">
                        <span>🕒 {course.duration}</span>
                        <span>🎯 {capitalize(course.level)}</span>
                        <span>
                            {flags[course.language!] ?? '🏳️'} {capitalize(course.language)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseCard;
