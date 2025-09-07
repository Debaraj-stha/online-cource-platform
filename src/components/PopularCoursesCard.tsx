
import CourcesGrid from './CourcesGrid'
import type { Course, View } from '../@types/course'
interface Props {
  courses: Course[],
  view?: View
}

const PopularCoursescard = ({ courses, view = "courses" }: Props) => {
  return (
    <CourcesGrid courses={courses} view={view}  id='popular-courses'/>
  )
}

export default PopularCoursescard
