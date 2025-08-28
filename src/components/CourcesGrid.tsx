import React, { useEffect, useRef } from 'react';
import type { Course, View } from '../@types/course';
import CourseCard from './CourceCard';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CourcesGrid = ({ courses, view = "home" }: { courses: Course[], view?: View }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!gridRef.current) return;

        const cards = gridRef.current.querySelectorAll('.course-card');

        gsap.fromTo(cards,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top bottom',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);


    return (
        <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10"
        >
            {courses.map((course) => (
                <div key={course.id} className="course-card card " style={{ opacity: 1 }}>
                    <CourseCard course={course} view={view} />
                </div>
            ))}
        </div>
    );
};

export default CourcesGrid;
