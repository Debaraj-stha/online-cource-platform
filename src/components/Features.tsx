import React, { useEffect, useRef } from 'react';
import { features } from '../constants/home';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featureImages } from '../constants/featureImages';
import FeatureCard from './FeatureCard';


const Features = () => {
    const ref = useRef<HTMLDivElement>(null)
useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;

    const cards = ref.current.querySelectorAll(".feature-card");
    const images = ref.current.querySelectorAll(".feature-image");

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 50 });
    gsap.set(images, { scale: 0.6, opacity: 0.5 });

    // Animate cards (fade + slide in)
    gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
        },
    });

    // Animate images (zoom in with scroll)
    images.forEach((image) => {
        gsap.to(image, {
            scale: 1.2,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: image,
                start: "top 90%",   // when image enters viewport
                end: "bottom 60%",  // end zoom when scrolled past
                scrub: true,        // tie animation to scroll
            },
        });
    });

    return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
}, []);




    return (
        <section className="py-16" ref={ref}>
            <div className="container grid grid-cols-1 sm:grid-cols-2">
                <h2 className="title-h2 font-heading">Platform Features</h2>
                <p className="text-para max-w-2xl mx-auto font-body sm:text-right"> Everything you need to teach, learn, and grow your skills — all in one place. </p>
            </div>
            <div className="container-grid">
                {features.map((feature, index) => {
                  
                    return (
                        <FeatureCard key={index} feature={feature}/>
                    );
                })}
            </div>
        </section>
    )
};

export default Features;
