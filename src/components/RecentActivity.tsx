import React from 'react'
import Skeleton from './Skeleton'

const RecentActivity = () => {
  const loading = true

  return (
    <section>
      <h2 className="title font-semibold mb-3">Recent Activity</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="p-3 border rounded-lg space-y-4">
              <Skeleton extraClass="h-6 w-full bg-gray-300 rounded-md" />
              {/* event item has  two placeholder */}
              {
                i % 2 ==
                0 && <Skeleton extraClass="h-6 w-56 bg-gray-300 rounded-md" />
              }

            </li>
          ))
        ) : (
          <>
            <li className="p-3 border rounded-lg">Completed Quiz in React Basics</li>
            <li className="p-3 border rounded-lg">Commented on JavaScript Discussion</li>
            <li className="p-3 border rounded-lg">Completed Quiz in React Basics</li>
            <li className="p-3 border rounded-lg">Commented on JavaScript Discussion</li>
          </>
        )}
      </ul>
    </section>
  )
}

export default RecentActivity
