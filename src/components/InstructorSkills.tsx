import { useRef } from 'react';
import capitalize from '../utils/string-func';
import RoundedSkeleton from './RoundedSkeleton';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


interface Props {
  skills: string[];
}

const InstructorSkills = ({ skills }: Props) => {
  const loading = false
  if (!skills || skills.length === 0) return null;
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (!ref.current) return
    gsap.registerPlugin(ScrollTrigger)
    gsap.to(".skill-item", {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power1.inOut",
      scrollTrigger: {
        start: "top 90%",
        trigger: ref.current,
        toggleActions: "play none none reverse"
      }
    })
  }, { scope: ref })

  return (
    <div className="flex flex-wrap gap-2" ref={ref}>

      {
        loading ?
          <RoundedSkeleton />
          :
          skills.map((skill, index) => (
            <span
              key={index}
              className="badge text-sm skill-item"
              style={{ opacity: "0", transform: `translateY(40px)` }}
            >
              {capitalize(skill)}
            </span>
          ))}
    </div>
  );
};

export default InstructorSkills;
