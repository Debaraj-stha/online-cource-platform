import { useEffect, useRef, useState } from 'react';
import FilterByCategory from '../components/FilterByCategory';
import FilterOptions from '../components/FilterOptions';
import PopularCourses from '../components/PopularCourses';


const Courses = () => {
  const popularCoursesRef = useRef<HTMLDivElement>(null);
  const popularCouseTitleRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null)
  const [shouldStopSticky, setShouldStopSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!popularCouseTitleRef.current || !popularCoursesRef.current) return;
      //get position of both container
      const filterRect = popularCouseTitleRef.current.getBoundingClientRect();
      const popularRect = popularCoursesRef.current.getBoundingClientRect();

      // If the bottom of the filter option is about to exceed the bottom of popularCourses
      if (filterRect.bottom >= popularRect.bottom) {
        setShouldStopSticky(true);
      } else {
        setShouldStopSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);




  //adding some padding to make it appear at center
  useEffect(() => {
    if (!categoryRef.current) return
    const current = categoryRef.current
    const position = 70
    const handlScroll = () => {
      const boundingBox = current.getBoundingClientRect()
      console.log(boundingBox.top)
      if (boundingBox.top <= position) {
        current.classList.add("pt-6","pb-3")
      }
      else {
        current.classList.remove("pt-6","pb-3")
      }
    }
    window.addEventListener("scroll", handlScroll)
    return () => window.removeEventListener("scroll", handlScroll)
  }, [categoryRef])

  return (
    <div className="wrapper relative">
      <div className='sticky top-10 z-10 bg-black items-center' ref={categoryRef}>
        <div className=' relative justify-between items-center'>
          {/* Category scroll area */}
          <div className='overflow-x-auto no-scrollbar w-[95%]'>
            <FilterByCategory />
          </div>
          {/* Sort button, not part of scroll */}

          <FilterOptions />
        </div>
      </div>

      {/* making header stick to top until its content scrolls down */}
      <div
        ref={popularCouseTitleRef}
        className={`
          'transition-all z-10',
          ${shouldStopSticky
            ? ''
            : 'sticky top-28 bg-black pt-0'}
        `}
      >
        <h2 className="title font-heading whitespace-nowrap ">Popular Courses</h2>
      </div>

      {/* Popular courses */}
      <div ref={popularCoursesRef}>

        <PopularCourses />
      </div>

    </div>
  );
};

export default Courses;
