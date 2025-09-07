// hooks/useCourseGridAnimation.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const useCourseGridAnimation = (id: string, dependencies: any[] = []) => {
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
                    start: 'top bottom-=100', //start animation when element reach 100px above bottom of viewport
                    toggleActions: 'play none none reverse',
                    id: id //uniquely identify each trigger
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.id === id) {
                    trigger.kill();
                }
            });
        };
    }, [id, ...dependencies]);

    return gridRef;
};