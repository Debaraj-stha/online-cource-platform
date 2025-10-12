import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react'
import { FaBell } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Skeleton from '../Skeleton';

const Notifications = () => {


  const notifications = [
    "New review on React for Beginners ⭐⭐⭐⭐⭐",
    "Admin approved your new course",
    "Student enrolled in Advanced Node.js",
  ];

  const ref = useRef<HTMLUListElement>(null)
  gsap.registerPlugin(ScrollTrigger)
  useGSAP(() => {
    if (!ref.current) return
    gsap.from(".notification", {
      opacity: 0,
      y: 40,
      ease: "power1.inOut",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 90%",
        scrub: true,
        end: "top 50%",
        toggleActions: "play none none reverse"
      }

    })
  }, { scope: ref })

  const loading = false

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaBell /> Notifications
      </h3>
      {
        loading ?
          <ul className='space-y-4'>
            {
              Array.from({ length: 5 }).map((_, index) => (

                <Skeleton key={index} extraClass={`h-7 ${index % 2 === 0 ? "w-lg" : index % 3 === 0 ? "w-96" : "w-xl"}`} />

              ))
            }
          </ul>
          :
          <ul className="space-y-3" ref={ref}>
            {notifications.map((note, idx) => (
              <li key={idx} className="p-3 bg-gray-700 rounded-lg text-sm notification">
                {note}
              </li>
            ))}
          </ul>
      }

    </div>
  )
}

export default Notifications
