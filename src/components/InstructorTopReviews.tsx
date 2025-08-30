import React, { memo } from 'react'
import type { Review } from '../@types/reviews'
import ReviewCard from './ReviewCard'
import ReviewSkeleton from './ReviewSkeleton'
interface Props {
  reviews: Review[]
}
const InstructorTopReviews = memo(({ reviews }: Props) => {
  const loading = true
  return (
    <div className={`${!loading ? "" : "bg-white"} rounded-2xl`}>
      {
        !loading ?
          <ReviewSkeleton />
          :
          reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      }
    </div>
  )
})
export default InstructorTopReviews
