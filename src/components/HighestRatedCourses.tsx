import React, { useEffect, useRef, useState } from 'react'
import HighestRatedCoursesCard from './HighestRatedCoursesCard'
import { Link } from 'react-router-dom';
import GridWrapper from './GridWrapper';
import CourseSkeleton from './CourseSkeleton';
import { loadHighestRatedCourses, type LoadCourseOptions } from '../store/reducers/courseReducer';
import type { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import ErrorCard from './ErrorCard';
import type { CourseType } from '../@types/course';
interface Props {
    viewMore?: boolean
}

const HighestRatedCourses = ({ viewMore = true }: Props) => {
    const highestRatedCourseRef = useRef<HTMLDivElement>(null);
    const [stopStick, setShouldStopStick] = useState(false);
    const highestRatedTitleRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const handleScroll = () => {
            if (!highestRatedTitleRef.current || !highestRatedCourseRef.current) return;
            //get position of both container-grid
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

    const options: LoadCourseOptions = {
        limit: 8
    }
    useEffect(() => {
        dispatch(loadHighestRatedCourses(options))
    }, [dispatch])
    const { highestRatedCourses, loadingHighestRated, highestRatedError } = useSelector((state: RootState) => state.course)

    return (
        <div className='space-y-4 md:space-y-6 lg:space-y-8'>
            <div
                ref={highestRatedTitleRef}
                className={`course-wrapper ${stopStick ? '' : 'sticky top-32 bg-black'}`}>
                <h2 className="title font-heading whitespace-nowrap ">Highest Rated Courses</h2>
                {
                    viewMore && <div>
                        <Link to="/courses/view-more" className='transition-colors hover:text-blue-500' title='view more highest rated courses' state={{ courseType: "highest-rated" as CourseType }}>View More</Link>
                    </div>
                }
            </div>
            {
                highestRatedError ?
                    <ErrorCard error={highestRatedError} />
                    :
                    <div className='highest-rated-courses' ref={highestRatedCourseRef}>
                        {
                            loadingHighestRated ?
                                <GridWrapper>
                                    <CourseSkeleton />
                                </GridWrapper>
                                :
                                <HighestRatedCoursesCard courses={highestRatedCourses} />
                        }

                    </div>
            }
        </div>
    )
}

export default HighestRatedCourses
