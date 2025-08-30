import React from 'react'

const RecentActivity = () => {
  return (
      <section>
        <h2 className="title font-semibold mb-3">Recent Activity</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10 ">
          <li className="p-3 border rounded-lg">Completed Quiz in React Basics</li>
          <li className="p-3 border rounded-lg">Commented on JavaScript Discussion</li>
           <li className="p-3 border rounded-lg">Completed Quiz in React Basics</li>
          <li className="p-3 border rounded-lg">Commented on JavaScript Discussion</li>
        </ul>
      </section>
  )
}

export default RecentActivity
