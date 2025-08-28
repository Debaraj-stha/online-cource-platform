import React, { useEffect, useState } from "react";
import { team } from "../constants/team";
import { useDragScroll } from "../hooks/useDragScroll";
import TeamMember from "./TeamMember";


export default function TeamCarousel() {
    const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave, isDragging } = useDragScroll()
    const [isHovering, setIsHovering] = useState(false)
    // ----- Auto-scroll -----
    useEffect(() => {
        const container = scrollRef.current
        if (!container) return

        let animationFrame: number
        let speed = 5 // pixels per frame
        const scroll = () => {
            //stop on hover
            if (!isDragging.current && !isHovering) {
                //move by speed  from mleft to right
                container.scrollLeft += speed
                // loop back to start when reaching the end
                //container.clientWidth=is the visible width of the container elemen
                if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                    container.scrollLeft = 0
                }
            }

            animationFrame = requestAnimationFrame(scroll)
        }
        animationFrame = requestAnimationFrame(scroll)

        return () => cancelAnimationFrame(animationFrame)
    }, [isDragging,isHovering,scrollRef])

    const onMouseLeave=()=>{
        setIsHovering(false)
        handleMouseLeave()
    }

    return (
        <div className="p-6 text-gray-800">
            <h2 className="title-h2">Meet Our Team</h2>

            <div
                className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-2 no-scrollbar cursor-grab"
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={onMouseLeave}
                onMouseEnter={() => setIsHovering(true)}
                
            >
                {team.map((member, index) => (
                    <TeamMember
                        key={index}
                        member={member}
                    />
                ))}
            </div>
        </div>
    );
}
