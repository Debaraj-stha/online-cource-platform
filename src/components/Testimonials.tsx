import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { testimonials } from '../constants/home';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.testimonial-card');

    gsap.set(cards, { opacity: 0, y: 50 });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <section ref={containerRef} className="wrapper py-16">
      <div className="container-grid">
        <h2 className="title-h2 font-headinng">What Our Learners Say</h2>
      </div>
      <div

        className="container-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-black"
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
