import React from 'react'
import { popularCourses } from '../constants/courses'

import CourcesGrid from './CourcesGrid'
import type { View } from '../@types/course'

const PopularCoursescard = ({view="courses"}:{view?:View}) => {
  return (
    <CourcesGrid courses={popularCourses} view={view}/>
  )
}

export default PopularCoursescard
