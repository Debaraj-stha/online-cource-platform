import React, { useEffect, useRef, useState } from 'react'
import HighestRatedCoursesCard from './HighestRatedCoursesCard'
import { Link } from 'react-router-dom';
import NewCoursesCard from './NewCoursesCard';
import GridWrapper from './GridWrapper';
import CourseSkeleton from './CourseSkeleton';

const NewCourses = () => {
    const newCoursesref = useRef<HTMLDivElement>(null);
    const [setStick, setStopStick] = useState(false);
    const newCourseTitleRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (!newCourseTitleRef.current || !newCoursesref.current) return;
            //get position of both container-grid
            const popularTitleRect = newCourseTitleRef.current.getBoundingClientRect();
            const popularRect = newCoursesref.current.getBoundingClientRect();
            // If the bottom of the filter option is about to exceed the bottom of popularCourses
            if (popularTitleRect.bottom >= popularRect.bottom) {
                setStopStick(true);
            } else {
                setStopStick(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div
                ref={newCourseTitleRef}
                className={` transition-all py-4 z-50 flex-center justify-between ${setStick ? '' : 'sticky top-32 bg-black'}`}>
                <h2 className="title font-heading whitespace-nowrap ">New Courses</h2>
                <div>
                    <Link to={"view-more"} className='transition-colors hover:text-blue-500' title='view more new courses' state={{ courseType: "new-course" }}>View More</Link>
                </div>
            </div>
            <div className='courses' ref={newCoursesref}>
                {
                    loading ?
                        <GridWrapper>
                            <CourseSkeleton />
                        </GridWrapper>
                        :
                        <NewCoursesCard />
                }
            </div>
        </>
    )
}

export default NewCourses
