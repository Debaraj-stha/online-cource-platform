import React from 'react'
import RecentActivity from './RecentActivity'
import StudentAchievement from './StudentAchievement'
import CompletedCourses from './CompletedCourses'
import EnrolledCourses from './EnrolledCourses'

const StudentProfileCard = () => {
  return (
    <div className='space-y-8'>
      <EnrolledCourses />
      {/* Completed Courses / Certificates */}
      <CompletedCourses />
      {/* achievement */}
      <StudentAchievement />
      {/* Recent Activity */}
      <RecentActivity />

    </div>
  )
}

export default StudentProfileCard
