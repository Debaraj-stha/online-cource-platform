import React, { memo } from 'react'
import RoundedSkeleton from './RoundedSkeleton'

const InstructorTargetAudience = memo(() => {
    const targetAudiences = ["Beginners", "Intermediate learners", "Business professionals"]
    const loading = true
    return (
        <div className='flex gap-3 flex-wrap'>
            {
                loading ? <RoundedSkeleton />
                    :
                    targetAudiences.map((audience, index) => (
                        <div
                            key={index}
                            className='rounded-3xl bg-yellow-600 py-2 px-4 text-white text-sm hover:bg-yellow-400 transition'
                        >
                            {audience}
                        </div>
                    ))}
        </div>
    )
})

export default InstructorTargetAudience
