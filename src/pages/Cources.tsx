import HighestRatedCourses from '../components/HighestRatedCourses';
import PopularCourses from '../components/PopularCourses';
import StickyFilterCard from '../components/StickyFilterCard';
import NewCourses from '../components/NewCourses';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import SearchCourseResult from '../components/SearchCourseResult';



const Courses = () => {
  const { searchResult } = useSelector((state: RootState) => state.course)

  return (
    <div className="wrapper relative">
      {/* sticky filter card */}
      <StickyFilterCard />
      {/* popular courses */}
      {
        searchResult.length != 0 ?
          <SearchCourseResult />
          :
          <>
            <PopularCourses />
            {/* highest rated courses */}
            <HighestRatedCourses />
            {/* new courses */}
            <NewCourses />
          </>
      }
    </div>
  );
};

export default Courses;
