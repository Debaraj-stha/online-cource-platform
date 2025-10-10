import React, { memo, useRef } from 'react'
import RoundedSkeleton from './RoundedSkeleton'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
interface Props {
    targetAudiences:string[]
}

const InstructorTargetAudience = memo(({targetAudiences}:Props)=> {
    // const targetAudiences = ["Beginners", "Intermediate learners", "Business professionals"]
    const loading = false
    const ref = useRef<HTMLDivElement>(null)
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        if (!ref.current) return
        gsap.to(".instructor-target-audience", {
            stagger: 0.1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        })
    }, { scope: ref })

    return (
        <div className='flex gap-3 flex-wrap' ref={ref}>
            {
                loading ? <RoundedSkeleton />
                    :
                    targetAudiences.map((audience, index) => (
                        <div
                            key={index}
                            className='rounded-3xl bg-yellow-600 py-2 px-4 text-white text-sm hover:bg-yellow-400 transition
                            instructor-target-audience'
                            style={{ opacity: "0", transform: "translateY(40" }}
                        >
                            {audience}
                        </div>
                    ))}
        </div>
    )
})

export default InstructorTargetAudience
