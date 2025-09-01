import { FcSalesPerformance } from 'react-icons/fc';

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
    return (
        <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><FcSalesPerformance />Course Performance</h3>
            <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                {courses.map((course, idx) => (
                    <li
                        key={idx}
                        className="p-3 bg-gray-700 rounded-lg flex justify-between items-center"
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
