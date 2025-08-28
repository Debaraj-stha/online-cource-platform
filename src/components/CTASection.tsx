
import gsap from 'gsap';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NumberAnimation from './NumberAnimation';
import BrowseCourseAButton from './BrowseCourseAButton';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {


    const buttons = sectionRef.current?.querySelectorAll('.cta_button');
    if (!sectionRef.current || !buttons) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    tl.from('.cta-heading', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
    })
      .from('.cta-text', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      }, "-=0.4")
      .to(buttons, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.2,
        ease: 'power2.out',
      }, "-=0.4");
    return () => tl.kill()
  }, { scope: sectionRef });


  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-br from-gray-900 to-gray-950  py-12 px-6 text-center"
    >
      <div className="max-w-4xl mx-auto space-y-5">
        <h2 className="cta-heading title-h2 text-transparent font-headinng">
          Ready to Start Learning?
        </h2>
        <p className="cta-text text-lg md:text-xl mb-6 text-para font-body">
          Join thousands of students and gain access to expert-led courses, quizzes, and more!
        </p>
        <p className='text-lg'><span className='text-blue-600 font-bold'><NumberAnimation target={2500}/></span>+ students joins today</p>
        <div className="flex justify-center gap-4 flex-wrap font-heading ">
          <Link
            to="/signup"
            className=" cta_button bg-white  text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Get Started for Free
          </Link>
          <BrowseCourseAButton extraClass='cta_button'/>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
