import React, { useRef } from 'react'
import Skeleton from './Skeleton'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CompletedCourses = () => {
  const loading = false;

  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!ref.current) return
    gsap.from(".completed-courses", {
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
      <h2 className="title font-semibold mb-3">Certificates</h2>
      <div className="flex gap-4 flex-wrap md:gap-8 lg:gap-14">
        {loading ? (
          <>
            <div className="p-4 border rounded-lg w-56">
              <Skeleton extraClass="h-7 w-40 bg-gray-300" />
            </div>
            <div className="p-4 border rounded-lg w-64">
              <Skeleton extraClass="h-7 w-48 bg-gray-300" />
            </div>
          </>
        ) : (
          <>
            <div className="p-4 border rounded-lg completed-courses">React Basics Certificate 🏆</div>
            <div className="p-4 border rounded-lg completed-courses">UI/UX Fundamentals Certificate 🎓</div>
          </>
        )}
      </div>
    </section>
  )
}

export default CompletedCourses
