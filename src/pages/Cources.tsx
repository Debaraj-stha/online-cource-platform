import { popularCourses } from '../constants/home';
import CourseCard from '../components/CourceCard';


const Courses = () => {
  return (
    <div className="wrapper py-10">
      <h2 className="title-h2 font-heading">Popular Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularCourses.map((course) => (
          <div key={course.id} className="course-card card">
            <CourseCard {...course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
