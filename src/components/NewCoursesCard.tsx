import React from 'react'
import { popularCourses } from '../constants/courses'
import CourcesGrid from './CourcesGrid'

const NewCoursesCard = () => {
  return (
     <CourcesGrid courses={popularCourses} view='courses'/>
  )
}

export default NewCoursesCard
