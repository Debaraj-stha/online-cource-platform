import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import type { AppDispatch, RootState } from '../store/store'
import type { CourseType } from '../@types/course'
import PopularCourses from '../components/PopularCourses'
import HighestRatedCourses from '../components/HighestRatedCourses'
import NewCourses from '../components/NewCourses'
import NotFound from './NotFound'
import StickyFilterCard from '../components/StickyFilterCard'

const MoreCourse = () => {
  const location = useLocation()
  const state = location.state ?? {}
  const courseType: CourseType = state?.courseType
  const hasMore = false

  const dispatch = useDispatch<AppDispatch>()
  const { newCourseError,
    newestCourses,
    loadingNewCourses,
    popularCourses,
    popularError,
    loadingPopularCourse,
    highestRatedCourses,
    highestRatedError,
    loadingHighestRated
  } = useSelector((state: RootState) => state.course)
  const loadMoreCourse = () => {

  }

  return (
    <div className='wrapper space-y-4'>
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
          <button className='primary-button mx-auto' aria-disabled={loadingNewCourses}  disabled={loadingNewCourses} onClick={loadMoreCourse}>{loadingNewCourses?"Loading...":"Load more"}</button>
        </div>
      }

    </div>
  )
}

export default MoreCourse
