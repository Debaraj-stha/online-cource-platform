import React from 'react'

const StudentAchievement = () => {
  return (
    <section>
      <h2 className="title font-semibold mb-3">Achievements</h2>
      <div className="flex gap-4 flex-wrap md:gap-8">
        <span className="px-4 py-2 bg-yellow-200 text-gray-800 rounded-full hover:-translate-x-3 transition-transform">🔥 7-day Streak</span>
        <span className="px-4 py-2 bg-green-200 text-gray-800 rounded-full hover:-translate-x-3 transition-transform">🎯 Top Quiz Score</span>
      </div>
    </section>
  )
}

export default StudentAchievement
