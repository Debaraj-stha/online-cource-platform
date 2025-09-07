import React from 'react'
import { popularCourses } from '../constants/courses'
import CourcesGrid from './CourcesGrid'
import type { Course } from '../@types/course'

const NewCoursesCard = ({courses}:{courses:Course[]}) => {
  return (
     <CourcesGrid courses={courses} view='courses' id='new-courses'/>
  )
}

export default NewCoursesCard
