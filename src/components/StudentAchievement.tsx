import React, { useRef } from 'react'
import Skeleton from './Skeleton'
import RoundedSkeleton from './RoundedSkeleton'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const StudentAchievement = () => {
  const loading = false
    const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!ref.current) return
    gsap.from(".student-achievements", {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.4,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })
  }, { scope: ref })
  

  return (
    <section ref={ref}>
      <h2 className="title font-semibold mb-3">Achievements</h2>
      <div className="flex gap-4 flex-wrap md:gap-8 student-achievements">
        {loading ? (
          <>
            <RoundedSkeleton length={3}/>
          </>
        ) : (
          <>
            <span className="px-4 py-2 bg-yellow-200 text-gray-800 rounded-full hover:-translate-x-3 transition-transform">
              🔥 7-day Streak
            </span>
            <span className="px-4 py-2 bg-green-200 text-gray-800 rounded-full hover:-translate-x-3 transition-transform">
              🎯 Top Quiz Score
            </span>
          </>
        )}
      </div>
    </section>
  )
}

export default StudentAchievement
