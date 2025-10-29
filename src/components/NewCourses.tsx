import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import NewCoursesCard from './NewCoursesCard';
import GridWrapper from './GridWrapper';
import CourseSkeleton from './CourseSkeleton';
import { loadNewestCourses } from '../store/reducers/courseReducer';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import ErrorCard from './ErrorCard';
import type { CourseType } from '../@types/course';
import type { LoadCourseOptions } from '../store/reducer-types/course';

interface Props {
    viewMore?: boolean
}
const NewCourses = ({ viewMore = true }: Props) => {
    const newCoursesref = useRef<HTMLDivElement>(null);
    const [setStick, setStopStick] = useState(false);
    const newCourseTitleRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.auth)
    const { selectedCategory } = useSelector((state: RootState) => state.course)

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

    const options: LoadCourseOptions = {
        limit: 8,
        studentId: user.id,
         filter: {
            ...(selectedCategory!=="all" ? { category: selectedCategory } : {})
        }
    }

    useEffect(() => {
        dispatch(loadNewestCourses({ options }))
    }, [dispatch, selectedCategory])
    const { newestCourses, loadingNewCourses, newCourseError } = useSelector((state: RootState) => state.course)

    return (
        <div className='space-y-4 md:space-y-6 lg:space-y-8'>
            <div
                ref={newCourseTitleRef}
                className={`course-wrapper ${setStick ? '' : 'sticky top-32 bg-black'}`}>
                <h2 className="title font-heading whitespace-nowrap ">New Courses</h2>
                {
                    viewMore && <div>
                        <Link to={"view-more"} className='transition-colors hover:text-blue-500' title='view more new courses' state={{ courseType: "new" as CourseType }}>View More</Link>
                    </div>
                }
            </div>
            {
                newCourseError ? <ErrorCard error={newCourseError} />
                    :
                    <div className='newest-courses' ref={newCoursesref}>
                        {
                            loadingNewCourses ?
                                <GridWrapper>
                                    <CourseSkeleton />
                                </GridWrapper>
                                :
                                <NewCoursesCard courses={newestCourses} />
                        }
                    </div>
            }
        </div>
    )
}

export default NewCourses
