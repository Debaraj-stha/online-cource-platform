import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react'
import { FaTasks } from 'react-icons/fa';
import gsap from 'gsap';
import Skeleton from '../Skeleton';

const Tasks = () => {
  const tasks = [
    "Review new student questions",
    "Update React for Beginners course",
    "Check assignments to grade",
  ];
  const ref = useRef<HTMLUListElement>(null)
  gsap.registerPlugin(ScrollTrigger)
  useGSAP(() => {
    if (!ref.current) return
    gsap.from(".task", {
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
  const loading = true

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaTasks /> To-Do
      </h3>
      {
        loading ?
          <ul className='space-y-4'>
            {
              Array.from({ length: 5 }).map((_, index) => (

                <Skeleton key={index} extraClass={`h-7 ${index % 2 === 0 ? "w-md" : index % 3 === 0 ? "w-2xl" : "w-xl"}`} />

              ))
            }
          </ul>
          :

          <ul className="space-y-3" ref={ref}>
            {tasks.map((task, idx) => (
              <li
                key={idx}
                className="p-3 bg-gray-700 rounded-lg flex items-center justify-between text-sm task"
              >
                {task}
                <button className="text-xs bg-green-600 px-2 py-1 rounded hover:bg-green-700">
                  Mark Done
                </button>
              </li>
            ))}
          </ul>
      }
    </div>
  )
}

export default Tasks
