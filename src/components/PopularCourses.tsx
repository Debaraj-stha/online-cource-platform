import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import PopularCoursescard from './PopularCoursesCard';
import GridWrapper from './GridWrapper';
import Skeleton from './Skeleton';
import CourseSkeleton from './CourseSkeleton';

const PopularCourses = () => {
    const popularCoursesRef = useRef<HTMLDivElement>(null);
    const popularCouseTitleRef = useRef<HTMLDivElement>(null);
    const [shouldStopSticky, setShouldStopSticky] = useState(false);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const handleScroll = () => {
            if (!popularCouseTitleRef.current || !popularCoursesRef.current) return;
            //get position of both container-grid
            const popularTitleRect = popularCouseTitleRef.current.getBoundingClientRect();
            const popularRect = popularCoursesRef.current.getBoundingClientRect();
            // If the bottom of the filter option is about to exceed the bottom of popularCourses
            if (popularTitleRect.bottom >= popularRect.bottom) {
                setShouldStopSticky(true);
            } else {
                setShouldStopSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div
                ref={popularCouseTitleRef}
                className={` transition-all z-50 flex-center justify-between ${shouldStopSticky ? '' : 'sticky top-32 bg-black pt-0'}`}
            >
                <h2 className="title font-heading whitespace-nowrap ">Popular Courses</h2>
                <div>
                    <Link to={"view-more"} className='transition-colors hover:text-blue-500' title='view more papular courses' state={{ courseType: "popular" }}>View More</Link>
                </div>
            </div>

            {/* Popular courses */}
            <div ref={popularCoursesRef} className='courses'>
                {loading ?
                    <GridWrapper>
                        <CourseSkeleton />
                    </GridWrapper>
                    :
                    <PopularCoursescard />
                }
            </div>

        </>
    )
}

export default PopularCourses
