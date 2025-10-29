import Skeleton from './Skeleton'

const ReviewSkeleton = ({ length = 6 }: { length?: number }) => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="flex gap-4 p-4 rounded-lg bg-gray-500 "
        >
          {/* Avatar */}
          <Skeleton extraClass="w-12 h-12 rounded-full bg-gray-800" />

          {/* Review Content */}
          <div className="flex-1 space-y-2">
            {/* Header row (name + badge) */}
            <div className="flex items-center justify-between">
              <Skeleton extraClass="h-4 w-28 rounded-md bg-gray-800" />
              <Skeleton extraClass="h-4 w-16 rounded-full bg-gray-800" />
            </div>

            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Skeleton
                  key={starIndex}
                  extraClass="h-4 w-4 rounded-sm bg-gray-800"
                />
              ))}
            </div>
            {/* Comment text */}
            <Skeleton extraClass="h-4 w-full rounded-md bg-gray-800" />
            <Skeleton extraClass="h-4 w-3/4 rounded-md bg-gray-800" />

            {/* Footer (date + verified badge) */}
            <Skeleton extraClass="h-3 w-24 rounded-md bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReviewSkeleton
