import { useRef } from 'react';
import Skeleton from './Skeleton'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const RecentActivity = () => {
  const loading = false
  
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!ref.current) return
    gsap.from(".student-activities", {
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
      <h2 className="title font-semibold mb-3">Recent Activity</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10 ">
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
            <li className="p-3 border rounded-lg student-activities">Completed Quiz in React Basics</li>
            <li className="p-3 border rounded-lg student-activities">Commented on JavaScript Discussion</li>
            <li className="p-3 border rounded-lg student-activities">Completed Quiz in React Basics</li>
            <li className="p-3 border rounded-lg student-activities">Commented on JavaScript Discussion</li>
          </>
        )}
      </ul>
    </section>
  )
}

export default RecentActivity
