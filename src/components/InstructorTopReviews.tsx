import React from 'react'
import type { Review } from '../@types/reviews'
import ReviewCard from './ReviewCard'
interface Props{
    reviews:Review[]
}
const InstructorTopReviews = ({reviews}:Props) => {
  return (
    <div className='bg-white rounded-2xl'>
      {
        reviews.map((review)=><ReviewCard key={review.id} review={review}/>)
      }
    </div>
  )
}

export default InstructorTopReviews
