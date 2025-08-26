import React, { useEffect, useRef, useState } from 'react'
import HighestRatedCoursesCard from './HighestRatedCoursesCard'
import { Link } from 'react-router-dom';

const HighestRatedCourses = () => {
    const highestRatedCourseRef = useRef<HTMLDivElement>(null);
    const [stopStick, setShouldStopStick] = useState(false);
    const highestRatedTitleRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleScroll = () => {
            if (!highestRatedTitleRef.current || !highestRatedCourseRef.current) return;
            //get position of both container
            const popularTitleRect = highestRatedTitleRef.current.getBoundingClientRect();
            const popularRect = highestRatedCourseRef.current.getBoundingClientRect();
            // If the bottom of the filter option is about to exceed the bottom of popularCourses
            if (popularTitleRect.bottom >= popularRect.bottom) {
                setShouldStopStick(true);
            } else {
                setShouldStopStick(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div
                ref={highestRatedTitleRef}
                className={` transition-all py-4  z-50 flex-center justify-between ${stopStick ? '' : 'sticky top-32 bg-black'}`}>
                <h2 className="title font-heading whitespace-nowrap ">Highest Rated Courses</h2>
                <div>
                    <Link to={"view-more"} className='transition-colors hover:text-blue-500' title='view more highest rated courses' state={{ courseType: "highest-rated" }}>View More</Link>
                </div>
            </div>
            <div className='courses' ref={highestRatedCourseRef}>
                <HighestRatedCoursesCard />
            </div>
        </>
    )
}

export default HighestRatedCourses
