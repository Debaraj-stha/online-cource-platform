import React from 'react'

const CompletedCourses = () => {
  return (
    <section>
      <h2 className="title font-semibold mb-3">Certificates</h2>
      <div className="flex gap-4 flex-wrap md:gap-8 lg:gap-14">
        <div className="p-4 border rounded-lg">React Basics Certificate 🏆</div>
        <div className="p-4 border rounded-lg">UI/UX Fundamentals Certificate 🎓</div>
      </div>
    </section>
  )
}

export default CompletedCourses
