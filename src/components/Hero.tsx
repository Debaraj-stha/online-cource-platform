import { Link } from 'react-router-dom';
import Bg from "../assets/images/bg1.jpg";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import { SplitText } from 'gsap/SplitText';
import NumberAnimation from './NumberAnimation';

const Hero = () => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        // Text animation
        const titleSplit = new SplitText(".title-h1", { type: "words,chars" });
        const paragraphSplit = new SplitText("p.hero-para", { type: "words,chars" });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top 80%",
                toggleActions: "play none play reverse",
            }
        });

        timeline.from(titleSplit.chars, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 0.6,
            ease: "power3.out"
        });

        timeline.fromTo(paragraphSplit.chars,
            { opacity: 0, color: "#aaa" },
            { opacity: 1, color: "#4B5563", stagger: 0.02, duration: 0.5, ease: "power2.out" },
            ">0.2"
        );

        // Image animation
        gsap.set("#hero-image", {
            opacity: 0.1,
            scale: 0.1,
                });

        gsap.to("#hero-image", {
            scale: 1,
            opacity: 1,
          
            ease: "circ.inOut",
            scrollTrigger: {
                trigger: "#hero-image",
                start: "top 90%",
                end: "top 70%",
                scrub: true,
                pin: true,
            }
        });

        return () => {
            titleSplit.revert();
            paragraphSplit.revert();
            timeline.kill();
        };
    }, []);

    return (
        <section className="hero-wrapper hero-section px-0">
            <div className="container mt-20">
                {/* Text Content */}
                <div className="space-y-6">
                    <h1 className="title-h1 text-4xl md:text-5xl font-bold leading-tight">
                        Unlock Your Potential with <br className="hidden md:block" />
                        <span className="text-blue-600">World-Class Online Learning</span>
                    </h1>

                    <p className="text-lg hero-para text-gray-600">
                        Discover top-rated courses, expert instructors, and a vibrant learning community —
                        all at your fingertips. Learn at your own pace, anytime, anywhere.
                    </p>

                    {/* CTAs */}
                    <div className="flex gap-4 flex-wrap">
                        <Link to="/signup" className="primary-button">
                            Get Started
                        </Link>
                        <Link to="/courses" className="transparent-primary-button">
                            Browse Courses
                        </Link>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600 mt-6">
                        <div>
                            <NumberAnimation target={1500} extraText="+"/><br />Courses
                        </div>
                        <div>
                            <NumberAnimation target={300} extraText="+"/><br />Instructors
                        </div>
                        <div>
                            <NumberAnimation target={98} extraText="+"/><br />Satisfaction Rate
                        </div>
                        <div>
                            <strong className='text-xl text-blue-600'>24/7</strong><br />Support
                        </div>
                    </div>

                    {/* Popular Categories */}
                    <div className="flex gap-2 mt-4 flex-wrap text-sm">
                        <span className="badge">Web Development</span>
                        <span className="badge">Design</span>
                        <span className="badge">AI & ML</span>
                        <span className="badge">Business</span>
                    </div>

                    {/* Trusted By */}
                    <p className="text-sm text-gray-500 mt-4">
                        Trusted by <strong>50,000+</strong> learners across 120+ countries 🌍
                    </p>
                </div>

                {/* Hero Image (Static) */}
                <div className="mt-10">
                    <img
                        src={Bg}
                        alt="Online Learning"
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Hero Image (Animated with ScrollTrigger) */}
            <div className="mt-10 overflow-hidden">
                <img
                    id="hero-image"
                    src={Bg}
                    alt="Scroll Animated Learning"
                    className="w-full mx-auto"
                />
            </div>
        </section>
    );
};

export default Hero;
