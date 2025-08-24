import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { testimonials } from '../constants/home';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  }, []);


  return (
    <section ref={containerRef} className="wrapper py-16">
      <div className="container">
        <h2 className="title-h2 font-headinng">What Our Learners Say</h2>
      </div>
      <div

        className="container grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-black"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="card font-body"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="text-md font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.title}</p>
              </div>
            </div>
            <p className="text-gray-600 italic mb-3">“{testimonial.message}”</p>
            <div className="text-yellow-400">
              {"★".repeat(Math.floor(testimonial.rating))}
              {testimonial.rating % 1 !== 0 && "½"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
