import React from 'react'
import {
    FaUsers,
    FaBook,
    FaDollarSign,
    FaStar
} from "react-icons/fa";
import { FaBookOpen } from 'react-icons/fa6';


const TopStats = () => {
    const stats = [
        { label: "Total Students", value: 1240, icon: FaUsers, color: "bg-blue-500" },
        { label: "Courses Published", value: 8, icon: FaBookOpen, color: "bg-green-500" },
        { label: "Total Earnings", value: "$12,340", icon: FaDollarSign, color: "bg-yellow-500" },
        { label: "Avg. Rating", value: "4.6", icon: FaStar, color: "bg-purple-500" },
         { label: "Unpublished Courses", value: "3", icon: FaBook, color: "bg-orange-500" },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={idx}
                        className="bg-gray-800 text-white p-4 rounded-xl flex items-center gap-4 shadow-md"
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

    )
}

export default TopStats
