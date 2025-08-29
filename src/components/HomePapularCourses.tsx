import React, { useEffect, useRef } from 'react';
import { popularCourses } from '../constants/courses';
import CourseCard from './CourceCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrowseCourseAButton from './BrowseCourseAButton';

const HomePopularCourses = () => {
  const sectionRef = useRef(null);

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

  return (
    <section ref={sectionRef} className="wrapper">
      <div className="container-grid">
        <h2 className="title-h2">Popular Courses</h2>
      </div>
      <div className="container-grid">
        {popularCourses.slice(0, 6).map((course, index) => (
          <div key={index} className="course-card card">
            <CourseCard course={course} view='home' />
          </div>
        ))}
      </div>
      <div className='container flex justify-center'>
        <BrowseCourseAButton />
      </div>
    </section>
  );
};

export default HomePopularCourses;
