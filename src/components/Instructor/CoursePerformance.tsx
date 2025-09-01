import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { FcSalesPerformance } from 'react-icons/fc';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Skeleton from '../Skeleton';

const CoursePerformance = () => {
    const courses = [
        { title: "React for Beginners", enrollments: 420, rating: 4.7, revenue: "$3,200" },
        { title: "Advanced Node.js", enrollments: 300, rating: 4.5, revenue: "$2,100" },
        { title: "UI/UX Design Basics", enrollments: 520, rating: 4.8, revenue: "$4,000" },
        { title: "React for Beginners", enrollments: 420, rating: 4.7, revenue: "$3,200" },
        { title: "Advanced Node.js", enrollments: 300, rating: 4.5, revenue: "$2,100" },
        { title: "UI/UX Design Basics", enrollments: 520, rating: 4.8, revenue: "$4,000" },
        { title: "React for Beginners", enrollments: 420, rating: 4.7, revenue: "$3,200" },
        { title: "Advanced Node.js", enrollments: 300, rating: 4.5, revenue: "$2,100" },
        { title: "UI/UX Design Basics", enrollments: 520, rating: 4.8, revenue: "$4,000" },
    ];

    const ref = useRef<HTMLDivElement>(null)
    gsap.registerPlugin(ScrollTrigger)
    useGSAP(() => {
        if (!ref.current) return
        gsap.from("h3", {
            opacity: 0,
            y: 40,
            ease: "power1.inOut"
        })
        gsap.from(".performamce-card", {
            opacity: 0,
            stagger: 0.1,
            y: 40,
            ease: "power1.inOut",
            duration: 0.8,
            scrollTrigger: {
                trigger: ref.current,
                start: "top 90%",
                scrub: true,
                end: "top 40%",
                toggleActions: "play none none reverse"
            }
        })
    }, { scope: ref })
    const loading = true

    return (
        <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md" ref={ref}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><FcSalesPerformance />Course Performance</h3>
            <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                {
                    loading ?
                        Array.from({ length: 5 }).map((_, index) =>
                            <div key={index} className="w-full h-24 bg-gray-900 rounded-xl p-4 flex flex-col gap-3">
                                <Skeleton extraClass={`h-6 bg-gray-700 ${index % 2 === 0 ? "w-48" : "w-72"}`} />
                                <Skeleton extraClass={`h-5 bg-gray-700 ${index % 3 === 0 ? "w-36" : "w-64"}`} />
                            </div>
                        )
                        :
                        courses.map((course, idx) => (
                            <li
                                key={idx}
                                className="p-3 bg-gray-700 rounded-lg flex justify-between items-center  performamce-card"
                            >
                                <div>
                                    <p className="font-medium">{course.title}</p>
                                    <p className="text-sm text-gray-300">
                                        {course.enrollments} students • ⭐ {course.rating}
                                    </p>
                                </div>
                                <span className="font-semibold">{course.revenue}</span>
                            </li>
                        ))}
            </div>
        </div>
    )
}

export default CoursePerformance
