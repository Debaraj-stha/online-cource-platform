import HighestRatedCourses from '../components/HighestRatedCourses';
import PopularCourses from '../components/PopularCourses';
import StickyFilterCard from '../components/StickyFilterCard';
import NewCourses from '../components/NewCourses';
import { useDispatch, } from 'react-redux';
import type { AppDispatch, } from '../store/store';
import { useEffect } from 'react';
import { loadCourse, type LoadCourseOptions } from '../store/reducers/courseReducer';

const Courses = () => {

  const dispatch = useDispatch<AppDispatch>()
  const options:LoadCourseOptions={
    limit:40
}
  useEffect(() => {
    dispatch(loadCourse(options))
  }, [dispatch,options])



  return (
    <div className="wrapper relative">


      {/* sticky filter card */}
      <StickyFilterCard />
      {/* popular courses */}
      <PopularCourses />
      {/* highest rated courses */}
      <HighestRatedCourses />
      {/* new courses */}
      <NewCourses />
    </div>
  );
};

export default Courses;
