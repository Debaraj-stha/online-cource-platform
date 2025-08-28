import { useRef } from "react"

/**
 * Custom hook to enable mouse drag scrolling for any horizontal scroll container
 */
export function useDragScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  // Stores the initial X position of the mouse when dragging starts
  const startX = useRef(0)
  // Stores the scrollLeft value of the container at the start of the drag
  const scrollLeft = useRef(0)

  /** Called when the mouse button is pressed */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
    // e.pageX = horizontal position relative to viewport
    // scrollRef.current?.offsetLeft = distance from left edge of parent container
    // Calculate mouse position relative to the scroll container
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0)
    // Save current scroll position
    scrollLeft.current = scrollRef.current?.scrollLeft || 0
  }

  /** Called when the mouse leaves the container while dragging */
  const handleMouseLeave = () => {
    isDragging.current = false
      scrollRef.current?.classList.remove("pointer-grabbing")
  }

  /** Called when the mouse button is released */
  const handleMouseUp = () => {
    isDragging.current = false
       scrollRef.current?.classList.remove("pointer-grabbing")
  }

  /** Called when the mouse moves while dragging */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    scrollRef.current.classList.add("pointer-grabbing")
    e.preventDefault() // Prevents text selection while dragging
    // Current mouse X position relative to container
    const x = e.pageX - scrollRef.current.offsetLeft
    // Distance moved = current X - starting X
    const walk = (x - startX.current) * 1.5 // Multiplier controls scroll speed
    // Apply distance to scrollLeft
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  return {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    isDragging
  }
}
