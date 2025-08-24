import { Link } from 'react-router-dom';
import Bg from "../assets/images/bg4.jpg";
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
            { opacity: 1, color: "#ccc", stagger: 0.02, duration: 0.5, ease: "power2.out" },
            ">0.2"
        );
        gsap.set(".hero-image", { borderRadius: "20%", scale: 0.7 })
        gsap.to(".hero-image", {
            borderRadius: "20px",
            scale: 1,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top 60%",
                scrub: true

            }
        })


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
                    <h1 className="text-4xl font-heading md:text-6xl font-extrabold leading-tight tracking-tight sm:leading-snug sm:tracking-normal">
                        <span className="text-gradient block mb-2">
                            Unlock Your Potential with
                        </span>
                        <span className="block bg-clip-text bg-gradient-to-b from-gray-100 to-gray-300 text-transparent">
                            World-Class Online Learning
                        </span>
                    </h1>

                    <p className="hero-para  max-w-xl mt-6 text-lg md:text-xl leading-relaxed tracking-wide font-body">
                        Discover top-rated courses, expert instructors, and a vibrant learning community —
                        all at your fingertips. Learn at your own pace, anytime, anywhere.
                    </p>


                    {/* CTAs */}
                    <div className="flex gap-4 flex-wrap font-body">
                        <Link to="/signup" className="primary-button font-heading">
                            Get Started
                        </Link>
                        <Link to="/courses" className="transparent-primary-button font-heading">
                            Browse Courses
                        </Link>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-100 text-sm mt-6">
                        <div>
                            <NumberAnimation target={1500} extraText="+" /><br />Courses
                        </div>
                        <div>
                            <NumberAnimation target={300} extraText="+" /><br />Instructors
                        </div>
                        <div>
                            <NumberAnimation target={98} extraText="+" /><br />Satisfaction Rate
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
                    <p className="text-sm text-gray-100 mt-4 font-body">
                        Trusted by <strong>50,000+</strong> learners across 120+ countries 🌍
                    </p>
                </div>

                {/* Hero Image (Static) */}
                <div className="mt-10">
                    <img
                        src={Bg}
                        alt="Online Learning"
                        className="w-full rounded-lg shadow-lg hero-image"
                    />
                </div>
            </div>


        </section>
    );
};

export default Hero;
