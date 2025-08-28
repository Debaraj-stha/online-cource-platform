import React, { useEffect, useRef } from 'react'
import FilterByCategory from './FilterByCategory'
import FilterOptions from './FilterOptions'

const StickyFilterCard = () => {
      const categoryRef = useRef<HTMLDivElement>(null)
  //adding some padding to make it appear at center
  useEffect(() => {
    if (!categoryRef.current) return
    const current = categoryRef.current
    const position = 70
    const handlScroll = () => {
      const boundingBox = current.getBoundingClientRect()
      if (boundingBox.top <= position) {
        current.classList.add("pt-6", "pb-3")
      }
      else {
        current.classList.remove("pt-6", "pb-3")
      }
    }
    window.addEventListener("scroll", handlScroll)
    return () => window.removeEventListener("scroll", handlScroll)
  }, [categoryRef])
  return (
     <div className='sticky top-14 z-10 bg-black items-center' ref={categoryRef}>
        <div className=' relative justify-between items-center'>
          {/* Category scroll area */}
          <div className='overflow-x-auto no-scrollbar w-[95%]'>
            <FilterByCategory />
          </div>
          {/* Sort button, not part of scroll */}

          <FilterOptions />
        </div>
      </div>
  )
}

export default StickyFilterCard
