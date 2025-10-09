
import CourcesGrid from './CourcesGrid'
import type { Course } from '../@types/course'

const HighestRatedCoursesCard = ({courses}:{courses:Course[]}) => {
  return (
     <CourcesGrid courses={courses} view='courses' id='highest-rated' />
  )
}

export default HighestRatedCoursesCard
