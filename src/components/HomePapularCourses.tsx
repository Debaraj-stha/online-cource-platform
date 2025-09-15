import  { useEffect, useRef } from 'react';
import CourseCard from './CourceCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrowseCourseAButton from './BrowseCourseAButton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { loadPopularCourses } from '../store/reducers/courseReducer';
import { useNavigate } from 'react-router-dom';
import ErrorCard from './ErrorCard';
import CourseSkeleton from './CourseSkeleton';

const HomePopularCourses = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { popularCourses, popularError, loadingPopularCourse } = useSelector((state: RootState) => state.course)

  useEffect(() => {
    dispatch(loadPopularCourses({ options: {limit:6} }))
  }, [dispatch])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.course-card');
    gsap.set(cards, { opacity: 0, y: 50 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  const locale = localStorage.getItem('i18nextLng') || 'en_US'

  return (
    <section ref={sectionRef} className="wrapper">
      <div className="container-grid">
        <h2 className="title-h2">Popular Courses</h2>
      </div>

      {
        !loadingPopularCourse && popularError ? <ErrorCard error={popularError} />
          :
          <div className="container-grid">
            {loadingPopularCourse ?
              <CourseSkeleton itemLength={6} />
              :
              popularCourses.map((course, index) => (
                <div key={index} className="course-card card">
                  <CourseCard course={course} view='home' locale={locale} onClick={() => navigate(`/courses/${course.id}`)} />
                </div>
              ))}
          </div>
      }
      <div className='container flex justify-center'>
        <BrowseCourseAButton />
      </div>
    </section>
  );
};

export default HomePopularCourses;
