import React from 'react';
import type { Course, View } from '../@types/course';
import CourseCard from './CourceCard';
import { useCourseGridAnimation } from '../hooks/useCourseGridAnimation';

const CourcesGrid = ({
    courses,
    view = "home",
    id
}: {
    courses: Course[],
    view?: View,
    id: string
}) => {
    const gridRef = useCourseGridAnimation(id, [courses]); //custom hook to manage animation

    return (
        <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10"
        >
            {courses.map((course) => (
                <div key={course.id} className="course-card card " style={{ opacity: 0 }}>
                    <CourseCard course={course} view={view} />
                </div>
            ))}
        </div>
    );
};

export default CourcesGrid;