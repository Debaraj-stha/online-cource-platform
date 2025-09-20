// useLoadInstructorCourses.ts
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useCallback, type SetStateAction } from "react"
import type { LoadCourseOptions } from "../store/reducer-types/course"
import {
  loadInstructorRecentCourse,
  loadInstructorPopularCourse,
  loadInstructorCourses
} from "../store/reducers/instructorReducer"
import type { AsyncThunk } from "@reduxjs/toolkit"

interface Options {
  queryOptions: LoadCourseOptions 
  setLoading?: React.Dispatch<SetStateAction<boolean>>
  setError?: React.Dispatch<SetStateAction<string>>
}
type CourseThunk = AsyncThunk<any, { instructorId: string, options: LoadCourseOptions, isLoadMore?: boolean }, {}>
const useLoadInstructorCourses = ({ queryOptions, setLoading, setError }: Options) => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)

  const fetchCourses = useCallback(
    async (
      loaderThunk: CourseThunk,
      errorMessage: string,
      isLoadMore?: boolean,
      page?: number
    ) => {
      if (!user?.id) return
      try {
        setLoading?.(true)
        
        // Create options with the current page
        const optionsWithPage = {
          ...queryOptions,
          page: page !== undefined ? page : queryOptions.page
        }
        
        const res = await dispatch(
          loaderThunk({
            instructorId: user.id,
            options: optionsWithPage,
            isLoadMore,
            
          })
        )
        if (loaderThunk.rejected.match(res)) {
          setError?.(errorMessage)
        }
      } catch (err) {
        setError?.("Unexpected error occurred")
      } finally {
        setLoading?.(false)
      }
    },
    [dispatch, user, queryOptions, setLoading, setError]
  )

  const loadRecentCourses = useCallback(
    () => fetchCourses(loadInstructorRecentCourse, "Failed to load recent courses"),
    [fetchCourses]
  )

  const loadPopularCourses = useCallback(
    () => fetchCourses(loadInstructorPopularCourse, "Failed to load popular courses"),
    [fetchCourses]
  )

  const loadInstructorAllCourses = useCallback(
    (isLoadMore?: boolean, page?: number) => {
      return fetchCourses(
        loadInstructorCourses,
        "Failed to load instructor courses",
        isLoadMore,
        page
      )
    },
    [fetchCourses]
  )

  return {
    loadRecentCourses,
    loadPopularCourses,
    loadInstructorAllCourses
  }
}

export default useLoadInstructorCourses