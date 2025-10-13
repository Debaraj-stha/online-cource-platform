import React, { useEffect, useRef, useState } from 'react'
import {
    FaUsers,
    FaBook,
    FaDollarSign,
    FaStar
} from "react-icons/fa";
import { FaBookOpen } from 'react-icons/fa6';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Skeleton from '../Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { instructorStats } from '../../store/reducers/instructorReducer';


const TopStats = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();


    let stats = useSelector((state: RootState) => state.instructor.stats);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                await dispatch(instructorStats());
            } finally {
                setLoading(false);
            }
        };
        if (!stats || Object.keys(stats).length === 0)
            fetchStats();

    }, [dispatch]);

    stats = useSelector((state: RootState) => state.instructor.stats);

    const instructorStatistics = [
        { label: "Total Students", value: stats?.totalStudents ?? 0, icon: FaUsers, color: "bg-blue-500" },
        { label: "Courses Published", value: stats?.publishedCourses ?? 0, icon: FaBookOpen, color: "bg-green-500" },
        { label: "Total Earnings", value: `$ ${(stats?.totalEarnings ?? 0).toFixed(1)}`, icon: FaDollarSign, color: "bg-yellow-500" },
        { label: "Avg. Rating", value: `${(stats?.averageRating ?? 0).toFixed(1)}`, icon: FaStar, color: "bg-purple-500" },
        { label: "Unpublished Courses", value: stats?.unpublishedCourses ?? 0, icon: FaBook, color: "bg-orange-500" },
    ];

    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;
        gsap.from(".stats-card", {
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            y: 40,
            ease: "power1.inOut"
        });
    }, {scope:ref}); 

    return (
        <>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-full h-28 bg-gray-900 rounded-xl p-4 space-y-4 flex flex-col items-center"
                        >
                            <Skeleton
                                extraClass={`h-7 bg-gray-700 ${index % 2 === 0
                                    ? "w-56"
                                    : index % 3 === 0
                                        ? "w-44"
                                        : "w-64"
                                    }`}
                            />
                            <Skeleton
                                extraClass={`h-7 bg-gray-700 ${index % 3 === 0
                                    ? "w-40"
                                    : index % 2 === 0
                                        ? "w-20"
                                        : "w-36"
                                    }`}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" ref={ref}>
                    {instructorStatistics.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-gray-800 text-white p-4 rounded-xl flex items-center gap-4 shadow-md stats-card"
                            >
                                <div className={`p-3 rounded-lg ${stat.color}`}>
                                    <Icon className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-300">{stat.label}</p>
                                    <h2 className="text-xl font-bold">{stat.value}</h2>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default TopStats;
