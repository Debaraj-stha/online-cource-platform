import { memo, useRef } from 'react';
import type { Review } from '../@types/reviews'
import ReviewCard from './ReviewCard'
import ReviewSkeleton from './ReviewSkeleton'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
interface Props {
  reviews: Review[]
}
const InstructorTopReviews = memo(({ reviews }: Props) => {


  const loading = true
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (!ref.current) return
    gsap.registerPlugin(ScrollTrigger)
    gsap.to(".instructor-review-card", {
      stagger: 0.1,
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })
  }, { scope: ref })

  if (!reviews.length) {
    return <p className='text-gray-300'>No reviews available</p>
  }

  return (
    <div className={`${!loading && reviews.length ? "" : "bg-white"} rounded-2xl`} ref={ref}>
      {
        !loading ?
          <ReviewSkeleton />
          :
          reviews.map((review) => <div className='instructor-review-card' style={{ opacity: "0", transform: "translateY(40px)" }}> <ReviewCard key={review.id} review={review} courseId={review.courseId} isInstructor={false} /></div>)
      }
    </div>
  )
})
export default InstructorTopReviews
