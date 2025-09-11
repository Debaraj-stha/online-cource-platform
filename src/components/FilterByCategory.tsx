import React, { memo, useEffect, useRef, useState } from 'react'
import { categories } from '../constants/courses'
import capitalize from '../utils/string-func'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import Skeleton from './Skeleton'
import { useDragScroll } from '../hooks/useDragScroll'

const FilterByCategory = memo(() => {
    const [selected, setSelected] = useState("all")
    const [loading, setLoading] = useState(true)
    const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } = useDragScroll()






    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (!scrollRef.current) return;

        const items = scrollRef.current.querySelectorAll(".category-item");

        gsap.to(items, {
            opacity: 1,
            stagger: 0.1,
            duration: 0.3,
            delay: 0.4,
            onStart: () => {
                setLoading(false)
            },
            ease: "power1.out",
        });
    }, [scrollRef, loading]);



    return (
        <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto whitespace-nowrap py-2 px-2 no-scrollbar cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {
                loading ?
                    Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} extraClass='rounded-lg w-16 py-4' />)
                    :
                    ["all", ...categories].map((category) => (
                        <div
                            onClick={() => setSelected(category)}
                            key={category}
                            style={{ opacity: ".8" }}
                            className={`category-item ${category === selected ? "bg-blue-600 font-bold hover:bg-blue-500" : " bg-gray-200 text-black hover:bg-gray-100"} shadow 
                        hover:shadow-gray-400`}
                        >
                            {/* Capitalize and display category name */}
                            {category.split('-').map(capitalize).join(' ')}
                        </div>
                    ))
            }

        </div>
    )
})

export default FilterByCategory
