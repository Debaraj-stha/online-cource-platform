import HighestRatedCourses from '../components/HighestRatedCourses';
import PopularCourses from '../components/PopularCourses';
import StickyFilterCard from '../components/StickyFilterCard';
import NewCourses from '../components/NewCourses';



const Courses = () => {


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
