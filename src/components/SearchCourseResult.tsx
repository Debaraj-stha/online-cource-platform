import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import ErrorCard from './ErrorCard';
import GridWrapper from './GridWrapper';
import CourseSkeleton from './CourseSkeleton';
import CourcesGrid from './CourcesGrid';
import LoadMoreButton from './LoadMoreButton';

const SearchCourseResult = () => {
  const searchResultRef = useRef<HTMLDivElement>(null);
  const searchResultTitleRef = useRef<HTMLDivElement>(null);
  const [shouldStopSticky, setShouldStopSticky] = useState(false);
  const [totalResult, setTotalResult] = useState<number | null>(null)
  const [limit,setLimit] = useState(4)

  const { searchResult, error, loadingCourses, searchQuery } = useSelector((state: RootState) => state.course)


  const handleLoadMore=()=>{
    if(limit>searchResult.length)return
    setLimit((prev)=>prev+4)
  }


  useEffect(() => {
    const handleScroll = () => {
      if (!searchResultRef.current || !searchResultTitleRef.current) return;
      //get position of both container-grid
      const popularTitleRect = searchResultTitleRef.current.getBoundingClientRect();
      const popularRect = searchResultRef.current.getBoundingClientRect();
      // If the bottom of the filter option is about to exceed the bottom of popularCourses
      if (popularTitleRect.bottom >= popularRect.bottom) {
        setShouldStopSticky(true);

      } else {
        setShouldStopSticky(false);


      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    if (searchResult)
      setTotalResult(searchResult.length)
  }, [searchResult])

  if(searchResult.length==0)  return <div><p>No result found for query <span>{searchQuery}</span></p></div>

  return (
    <div className='space-y-4 md:space-y-6 lg:space-y-8'>
      
      <div
        ref={searchResultTitleRef}
        className={` space-y-4 transition-all z-30 flex items-center justify-between ${shouldStopSticky ? '' : 'sticky top-32 bg-black pt-0'}`}
      >
        <h2 className="title font-heading whitespace-nowrap ">Showing {limit} of {totalResult} on  <span className='text-yellow-500'>{searchQuery}</span> </h2>
      </div>

      {/* Popular courses */}
      {
        error ?
          <ErrorCard error={error} />
          :

          <div ref={searchResultRef} className='popular-courses'>
            {loadingCourses ?
              <GridWrapper>
                <CourseSkeleton />
              </GridWrapper>
              :
              <CourcesGrid courses={searchResult.slice(0, limit)} view="courses" id='search-courses' />
            }
           {
            limit < searchResult?.length &&  <LoadMoreButton onClick={handleLoadMore}/>
           }
          </div>
      }

    </div>
  )
}

export default SearchCourseResult
