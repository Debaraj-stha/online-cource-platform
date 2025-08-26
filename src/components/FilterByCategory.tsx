import React, { memo, useEffect, useRef, useState } from 'react'
import { categories } from '../constants/courses'
import capitalize from '../utils/capitalize'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

const FilterByCategory = memo(() => {
    const scrollRef = useRef<HTMLDivElement>(null)
    // Tracks whether the user is actively dragging
    const isDragging = useRef(false)
    // Stores the initial X position of the mouse when dragging starts
    const startX = useRef(0)
    // Stores the scrollLeft value of the container at the start of the drag
    const scrollLeft = useRef(0)
    const [selected, setSelected] = useState("ai-ml")




    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true
        //// e.pageX returns horizontal position relative to viewport
        // scrollRef.current?.offsetLeft returns the distance (in pixels) from the left
        // edge of the parent container to the left edge of  this scroll container
        // Calculate mouse position relative to the scroll container
        startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0)
        // Save the current scroll position
        scrollLeft.current = scrollRef.current?.scrollLeft || 0

    }

    // Called when the mouse leaves the container while dragging
    const handleMouseLeave = () => {
        isDragging.current = false
    }

    // Called when the mouse button is released to stop dragging
    const handleMouseUp = () => {
        isDragging.current = false
    }

    // Called when the mouse is moved while dragging
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !scrollRef.current) return
        e.preventDefault() // Prevents text selection while dragging
        // Calculate new mouse position relative to container
        const x = e.pageX - scrollRef.current.offsetLeft

        // Distance moved = current X - starting X
        const walk = (x - startX.current) * 1.5 // Multiplier controls scroll speed

        // Apply the drag distance to scroll position
        scrollRef.current.scrollLeft = scrollLeft.current - walk
    }

    

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (!scrollRef.current) return;

        const items = scrollRef.current.querySelectorAll(".category-item");

        gsap.to(items, {
            opacity: 1,
            stagger: 0.1,
            duration: 0.3,
            ease: "power1.out",
        });
    }, [scrollRef]);



    return (
        <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto whitespace-nowrap py-2 px-2 no-scrollbar cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >

            {["all", ...categories].map((category) => (
                <div
                    onClick={() => setSelected(category)}
                    key={category}
                    style={{ opacity: "0" }}
                    className={`category-item ${category === selected ? "bg-blue-600 font-bold hover:bg-blue-500" : " bg-gray-200 text-black hover:bg-gray-100"} shadow 
                        hover:shadow-gray-400`}
                >
                    {/* Capitalize and display category name */}
                    {category.split('-').map(capitalize).join(' ')}
                </div>
            ))}
        </div>
    )
})

export default FilterByCategory
