import React, { useEffect } from 'react';
import { features } from '../constants/home';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Features = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.set(".feature-card", { opacity: 0, y: 50 });

        gsap.to(".feature-card", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".feature-card", 
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        });
    }, []);

    return (
        <section className="wrapper py-16">
            <div className="container ">
                <h2 className="title-h2">Platform Features</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Everything you need to teach, learn, and grow your skills — all in one place.
                </p>
            </div>

            <div className="container grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card p-6 bg-white rounded-lg shadow transition-all cursor-pointer  hover:shadow-lg">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-black">
                            <span>{feature.icon}</span> {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
