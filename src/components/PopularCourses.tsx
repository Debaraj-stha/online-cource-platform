import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import PopularCoursescard from './PopularCoursesCard';
import GridWrapper from './GridWrapper';

import CourseSkeleton from './CourseSkeleton';

import type { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadPopularCourses, type LoadCourseOptions } from '../store/reducers/courseReducer';
import ErrorCard from './ErrorCard';
import type { CourseType } from '../@types/course';


interface Props {
    viewMore?: boolean
}
const PopularCourses = ({ viewMore = true }: Props) => {
    const popularCoursesRef = useRef<HTMLDivElement>(null);
    const popularCourseTitleRef = useRef<HTMLDivElement>(null);
    const [shouldStopSticky, setShouldStopSticky] = useState(false);

    const dispatch = useDispatch<AppDispatch>()
     const { user } = useSelector((state: RootState) => state.auth)
    const options: LoadCourseOptions = {
        limit: 10,
        studentId:user.id
    }


    useEffect(() => {
        const handleScroll = () => {
            if (!popularCourseTitleRef.current || !popularCoursesRef.current) return;
            //get position of both container-grid
            const popularTitleRect = popularCourseTitleRef.current.getBoundingClientRect();
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

    useEffect(() => {
        dispatch(loadPopularCourses({options}))
    }, [dispatch])


    
    const { popularCourses, loadingPopularCourse, popularError } = useSelector((state: RootState) => state.course)

    return (
        <div className='space-y-4 md:space-y-6 lg:space-y-8'>
            <div
                ref={popularCourseTitleRef}
                className={` space-y-4 transition-all z-30 flex items-center justify-between ${shouldStopSticky ? '' : 'sticky top-32 bg-black pt-0'}`}
            >
                <h2 className="title font-heading whitespace-nowrap ">Popular Courses</h2>
                {
                    viewMore && <div>
                        <Link to={"view-more"} className='transition-colors hover:text-blue-500' title='view more papular courses' state={{ courseType: "popular" as CourseType }}>View More</Link>
                    </div>
                }
            </div>

            {/* Popular courses */}
            {
                popularError ?
                    <ErrorCard error={popularError} />
                    :

                    <div ref={popularCoursesRef} className='popular-courses'>
                        {loadingPopularCourse ?
                            <GridWrapper>
                                <CourseSkeleton />
                            </GridWrapper>
                            :
                            <PopularCoursescard courses={popularCourses}  />
                        }
                    </div>
            }

        </div>
    )
}

export default PopularCourses
