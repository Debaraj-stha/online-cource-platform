import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react';
import { FcSalesPerformance } from 'react-icons/fc';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Skeleton from '../Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getCoursePerformance } from '../../store/reducers/instructorReducer';

const CoursePerformance = () => {
    const [loadingPerformances, setLoadingPerformances] = useState(false)

    const ref = useRef<HTMLDivElement>(null)
    gsap.registerPlugin(ScrollTrigger)
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        const fetchPerformances = async () => {
            try {
                setLoadingPerformances(true)
                await dispatch(getCoursePerformance())
            } finally {
                setLoadingPerformances(false)
            }
        }
        fetchPerformances()

    }, [dispatch])

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


    const { coursePerformance } = useSelector((state: RootState) => state.instructor)


    return (
        <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md" ref={ref}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><FcSalesPerformance />Course Performance</h3>
            <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                {
                    loadingPerformances ?
                        Array.from({ length: 5 }).map((_, index) =>
                            <div key={index} className="w-full h-24 bg-gray-900 rounded-xl p-4 flex flex-col gap-3">
                                <Skeleton extraClass={`h-6 bg-gray-700 ${index % 2 === 0 ? "w-48" : "w-72"}`} />
                                <Skeleton extraClass={`h-5 bg-gray-700 ${index % 3 === 0 ? "w-36" : "w-64"}`} />
                            </div>
                        )
                        :
                        coursePerformance.length == 0 ?
                            <div className='h-full w-full'>
                                <p>No course performance available to show</p>
                            </div> :
                            coursePerformance.map((performance, idx) => (
                                <li
                                    key={idx}
                                    className="p-3 bg-gray-700 rounded-lg flex justify-between items-center  performamce-card"
                                >
                                    <div>
                                        <p className="font-medium">{performance.title}</p>
                                        <p className="text-sm text-gray-300">
                                            {performance.enrollments} students • ⭐ {performance.rating}
                                        </p>
                                    </div>
                                    <span className="font-semibold">{performance.revenue}</span>
                                </li>
                            ))}
            </div>
        </div>
    )
}

export default CoursePerformance
