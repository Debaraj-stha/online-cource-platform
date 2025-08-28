import { testimonials } from '../constants/home'
import TestimonialCard from '../components/TestimonialCard'
import Features from '../components/Features';
import TeamCarousel from '../components/TeamCarousel';
import BrowseCourseAButton from '../components/BrowseCourseAButton';
import AboutUs from '../components/AboutUs';
import Story from '../components/Story';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
const About = () => {
    const introRef = useRef<HTMLDivElement>(null)
    const storyRef = useRef<HTMLDivElement>(null)
    const testimonialRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);
        if (!introRef.current) return;
        const paras = introRef.current.querySelectorAll(".para");
        const h2 = introRef.current.querySelector("h2");
        const img = introRef.current.querySelector("img");

        // Heading animation (word by word)
        const splitHeading = new SplitText(h2, { type: "chars" });
        gsap.from(splitHeading.chars, {
            opacity: 0,
            y: 30,
            stagger: 0.08,
            duration: 0.8,
            ease: "power2.out",
        });

        // Paragraph animation (line by line)
        paras.forEach((p) => {
            const splitLines = new SplitText(p, { type: "lines" });
            gsap.from(splitLines.lines, {
                opacity: 0,
                y: 20,
                stagger: 0.2, // lines appear one by one
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: introRef.current,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: true,
                    toggleActions: "play none play reverse",

                }
            });
        });


        gsap.from(img, {
            y: 40,
            duration: 0.2,
            ease: "power2.out",
            scale: 0.6,
            scrollTrigger: {
                trigger: introRef.current,
                start: "top 60%",
                end: "top 40%",
                scrub: true,
                toggleActions: "play none none reverse"
            }
        })


        return () => {
            ScrollTrigger.getAll().forEach(tri => tri.kill())
            splitHeading.revert()
        }

    }, [introRef]);

    useGSAP(() => {
        if (!storyRef) return
        const current = storyRef.current
        const h = current?.querySelector("h2")
        const paras = current?.querySelectorAll(".para")
       const splitHeading = new SplitText(h!, { type: "chars" });
        gsap.from(splitHeading.chars, {
            opacity: 0,
            y: 30,
            stagger: 0.08,
            duration: 0.8,
            ease: "power2.out",
        });


        paras!.forEach((p) => {
            const splitLines = new SplitText(p, { type: "lines" });
            gsap.from(splitLines.lines, {
                opacity: 0,
                y: 20,
                stagger: 0.2, // lines appear one by one
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: storyRef.current,
                    scrub: true, //links the progress of the animation to the scroll progress.
                    start: "top 70%",
                    end: "top 40%",
                    toggleActions: "play none none reverse"
                }
            });

        })
        return () => {
            ScrollTrigger.getAll().forEach(tri => tri.kill())
            splitHeading.revert()
        }

    }, [storyRef])


    useGSAP(() => {
        if (!testimonialRef.current) return
        gsap.from(testimonialRef.current.querySelectorAll(".testimonial-card"), {
            opacity: 0,
            y: 40,
            duration: 0.6,
            stagger: 0.2,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: testimonialRef.current,
                start: "top 70%",
                end:"top 50%",
                scrub:true,
                toggleActions: "play none none reverse"
            }
        })
        return () => {
            ScrollTrigger.getAll().forEach(tri => tri.kill())

        }
    }, [testimonialRef])

    useGSAP(() => {
        if (!ctaRef) return
        gsap.from(ctaRef.current, {
            opacity: 0,
            y: 40,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ctaRef.current,
                start: "top 80%",
                scrub:true,
                end:"top 50%",
                toggleActions: "play none none reverse"
            }
        })
        return () => ScrollTrigger.killAll()
    }, [ctaRef])



    return (
        <div className='wrapper'>
            <div className='container space-y-16'>
                {/* Hero / Intro */}
                <section className="flex flex-col md:flex-row gap-8 items-center intro-section" ref={introRef}>
                    <AboutUs />
                </section>
                {/* Story */}
                <div className='space-y-5 story-section' ref={storyRef}>
                    <Story />
                </div>

                {/* Features / What We Offer */}
                <Features />

                {/* Team */}
                <TeamCarousel />
                {/* Testimonials */}
                <h2 className='title-h2'>What Our Learners Say</h2>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6' ref={testimonialRef}>
                    {testimonials.map((t, index) => (
                        <div className='testimonial-card'>
                            <TestimonialCard key={index} testimonial={t} />
                        </div>
                    ))}
                </div>


                {/* Call to Action */}
                <section className="cta text-center bg-gradient-to-r from-blue-500 to-purple-600 py-10 rounded-2xl text-white" ref={ctaRef}>
                    <h3 className="text-2xl font-bold mb-4">Ready to Start Learning?</h3>
                    <BrowseCourseAButton />
                </section>


            </div>
        </div>
    )
}

export default About
