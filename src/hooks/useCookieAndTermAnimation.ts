import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
const useCookieAndTermAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    useGSAP(() => {
        if (!containerRef.current) return
        const current = containerRef.current
        const header = current.querySelector("header")
        const h = header?.querySelector("h1")
        const para = header?.querySelector("p")
        const sections = current.querySelectorAll('section')
        gsap.from(h!, {
            opacity: 0,
            y: 40,
            ease: "power1.inOut"
        })
        gsap.from(para!, {
            opacity: 0,
            delay: 0.1,
            y: 40,
            ease: "power1.inOut"
        })

        sections.forEach((section) => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 0.2,
                stagger: 0.1,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    start: "top 80%",
                    end: "top 50%",
                    toggleActions: "play none none reverse"
                    /*
                    onEnter → "play" → when the section scrolls into view, the animation plays.
    
                    onLeave → "none" → when you scroll past it, nothing happens (animation stays as-is).
    
                    onEnterBack → "none" → when you scroll back up into the trigger, nothing happens.
    
                    onLeaveBack → "reverse" → when you scroll above it (leaving viewport upwards), the animation reverses.
                    */
                }
            })
        })
        return () => ScrollTrigger.killAll()
    }, [containerRef])

    return { containerRef }
}

export default useCookieAndTermAnimation