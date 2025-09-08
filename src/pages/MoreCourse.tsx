import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import type { AppDispatch, RootState } from '../store/store'
import type { CourseType } from '../@types/course'
import PopularCourses from '../components/PopularCourses'
import HighestRatedCourses from '../components/HighestRatedCourses'
import NewCourses from '../components/NewCourses'
import NotFound from './NotFound'
import StickyFilterCard from '../components/StickyFilterCard'
import { loadHighestRatedCourses, loadNewestCourses, loadPopularCourses, updatePage } from '../store/reducers/courseReducer'
import ErrorCard from '../components/ErrorCard'

const MoreCourse = () => {
  const location = useLocation()
  const state = location.state ?? {}
  const courseType: CourseType = state?.courseType


  const dispatch = useDispatch<AppDispatch>()
  const { newCourseError,
    loadingNewCourses,
    popularError,
    loadingPopularCourse,
    highestRatedError,
    loadingHighestRated,
    currentPage,
    totalpages
  } = useSelector((state: RootState) => state.course)
  //flag to indicate if more page to load is available or not
  const hasMore = currentPage + 1 < (totalpages ?? 0)

  const loadMoreCourse = () => {
    const nextPage = (currentPage ?? 0) + 1;
    console.log("next page", nextPage)
    dispatch(updatePage(nextPage));

    if (courseType === "new") {
      dispatch(loadNewestCourses({ options: { page: nextPage }, isLoadMore: true }));
    } else if (courseType === "popular") {
      dispatch(loadPopularCourses({ options: { page: nextPage }, isLoadMore: true }));
    } else if (courseType === "highest-rated") {
      dispatch(loadHighestRatedCourses({ options: { page: nextPage }, isLoadMore: true }));
    }
  };
  const isLoading = loadingNewCourses || loadingHighestRated || loadingPopularCourse
  const error = popularError || highestRatedError || newCourseError

  return (
    <div className='wrapper space-y-4'>
      {
        error ?
          <div className='my-6'><ErrorCard error={error} />
          </div>
          :
          <>
            <StickyFilterCard />

            {
              courseType === "popular" && <PopularCourses viewMore={false} />
            }
            {
              courseType === "highest-rated" && <HighestRatedCourses />
            }
            {
              courseType === "new" && <NewCourses />
            }
            {
              courseType === null && <NotFound />
            }
            {
              hasMore && <div className='flex items-start md:items-center' >
                <button className='primary-button mx-auto'
                  aria-disabled={isLoading}
                  disabled={isLoading}
                  onClick={loadMoreCourse}>{loadingNewCourses ? "Loading..." : "Load more"}</button>
              </div>
            }
          </>
      }

    </div>
  )
}

export default MoreCourse
