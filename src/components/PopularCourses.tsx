import React, { useEffect, useRef } from 'react';
import { popularCourses } from '../constants/home';
import CourseCard from './CourceCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PopularCourses = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.course-card');

    gsap.from(cards, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    gsap.set(cards,{opacity:1,y:0})
  }, []);

  return (
    <section ref={sectionRef} className="wrapper py-12 bg-gray-50">
      <div className="container mb-8">
        <h2 className="title-h2 text-3xl font-bold text-center">Popular Courses</h2>
      </div>
      <div className="container grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {popularCourses.map((course, index) => (
          <div key={index} className="course-card">
            <CourseCard {...course} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCourses;
