import React from 'react'
import { popularCourses } from '../constants/home'
import CourcesGrid from './CourcesGrid'

const HighestRatedCoursesCard = () => {
  return (
     <CourcesGrid courses={popularCourses} view='courses'/>
  )
}

export default HighestRatedCoursesCard
