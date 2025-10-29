import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useEffect, useState } from "react"
import CourseCard from "../components/CourceCard"
import { loadMyCourse } from "../store/reducers/courseReducer"
import ErrorCard from "../components/ErrorCard"
import Loader from "../components/Loader"
import LoadMoreButton from "../components/LoadMoreButton"

const Mylearning = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const limit=10

  const { user } = useSelector((state: RootState) => state.auth)
  const { myCourses } = useSelector((state: RootState) => state.course)



  const handleLoadMore = async () => {
    try {
    
      const result = await dispatch(loadMyCourse({ studentId: user.id!, loadMore: true }))
      if (loadMyCourse.fulfilled.match(result)) {
        setPage((prev) => prev + 1) //increase current page number by on eon success
      }
    } finally {

    }
  }

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        if (!user?.id) return
        const actionResult = await dispatch(loadMyCourse({ studentId: user.id }))
        if (loadMyCourse.rejected.match(actionResult)) {
          setError("Error while loading courses")
        }
        else if (loadMyCourse.fulfilled.match(actionResult)) {
          setPage(2) //update page onsuccess
        }
      } finally {
        setLoading(false)
      }
    }
    fetchMyCourses()
  }, [dispatch, user?.id])

  return (
    <div className="wrapper container py-6 space-y-4">
      <h1 className="title font-heading whitespace-nowrap">
        My Learning
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : error ? (
        <ErrorCard error={error} />
      ) : myCourses.courses.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">You haven’t enrolled in any courses yet.</p>
          <p className="text-sm mt-2">Browse courses and start learning!</p>
        </div>
      ) : (
        <>
          <div className="container-grid">
            {myCourses.courses.map((course) => (
              <CourseCard key={course.id} course={course} view="courses" />
            ))}
          </div>
          {
          (page-1)*limit<myCourses.totalCourses && <LoadMoreButton onClick={handleLoadMore} />
          }
        </>
      )}
    </div>
  )
}

export default Mylearning
