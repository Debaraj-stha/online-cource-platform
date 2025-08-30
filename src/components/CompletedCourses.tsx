import React from 'react'
import Skeleton from './Skeleton'

const CompletedCourses = () => {
  const loading = true
  return (
    <section>
      <h2 className="title font-semibold mb-3">Certificates</h2>
      <div className="flex gap-4 flex-wrap md:gap-8 lg:gap-14">
        {loading ? (
          <>
            <div className="p-4 border rounded-lg w-56">
              <Skeleton extraClass="h-7 w-40 bg-gray-300" />
            </div>
            <div className="p-4 border rounded-lg w-64">
              <Skeleton extraClass="h-7 w-48 bg-gray-300" />
            </div>
          </>
        ) : (
          <>
            <div className="p-4 border rounded-lg">React Basics Certificate 🏆</div>
            <div className="p-4 border rounded-lg">UI/UX Fundamentals Certificate 🎓</div>
          </>
        )}
      </div>
    </section>
  )
}

export default CompletedCourses
