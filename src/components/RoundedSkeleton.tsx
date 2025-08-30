import React from 'react'
import Skeleton from './Skeleton'

/**
 * Skeleton for skills or single-word items
 */
const RoundedSkeleton = ({ length = 5 }: { length?: number }) => {
    const widthMap: Record<number, string> = {
        0: "w-20",
        1: "w-24",
        2: "w-16",
        3: "w-28",
        4: "w-24",
        5: "w-32",
        6: "w-20"
    }

    // Pick a random width class each time
    const getWidthClass = () => {
        const randomIndex = Math.floor(Math.random() * length)
        return widthMap[randomIndex]
    }

    return (
        <div className="flex flex-wrap gap-2">
            {Array.from({ length }).map((_, index) => (
                <Skeleton
                    key={index}
                    extraClass={`h-8 rounded-3xl ${getWidthClass()}`}
                />
            ))}
        </div>
    )
}

export default RoundedSkeleton
