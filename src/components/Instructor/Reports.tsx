import React, { Suspense,  useState } from "react";
import useLoadEarningStats from "../../hooks/useLoadEarningStats";


//lazy load so that components can be imported when they are required
// Milestones / Summary
const Milestone = React.lazy(() => import("./Milestone"));

// Earnings / Revenue
const EarningByCourse = React.lazy(() => import("./EarningByCourse"));
const EarningPerYear = React.lazy(() => import("./EarningPerYear"));
const RevenueSource = React.lazy(() => import("./RevenueSource"));

// Course Performance
const TopPerformingCourse = React.lazy(() => import("./TopPerformingCourse"));
const CourseCompletionRate = React.lazy(() => import("./CourseCompletionRate"));
const AverageRatingPerCourse = React.lazy(() => import("./AverageRatingPerCourse"));
const EnrollmentTrend = React.lazy(() => import("./EnrollmentTrend"));

// Student Insights
const StudentGeography = React.lazy(() => import("./StudentGeography"));
const StudentEngagement = React.lazy(() => import("./StudentEngagement"));
const NewVsReturningStudents = React.lazy(() => import("./NewVsReturningStudents"));

// Student Satisfaction
const FeedbackTrends = React.lazy(() => import("./FeedbackTrends"));
const RefundStatistics = React.lazy(() => import("./RefundStatistics"));

const Reports = () => {
    const [showEarnings, setShowEarnings] = useState(true);
    const [showCoursePerformance, setShowCoursePerformance] = useState(false);
    const [showStudentInsights, setShowStudentInsights] = useState(false);
    const [showSatisfaction, setShowSatisfaction] = useState(false);

    const { loadStats } = useLoadEarningStats()
    loadStats()


    return (
        <div className="space-y-6">
            {/* ==================== Milestones / Summary ==================== */}
            <Suspense fallback={<div>Loading Milestones...</div>}>
                <Milestone />
            </Suspense>

            {/* ==================== Earnings / Revenue ==================== */}
            <div>
                <button
                    className="primary-button w-md"
                    onClick={() => setShowEarnings((prev) => !prev)}
                >
                    {showEarnings ? "Hide" : "Show"} Earnings / Revenue Charts
                </button>
            </div>
            {showEarnings && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Suspense fallback={<div>Loading Earning By Course...</div>}>
                        <EarningByCourse />
                    </Suspense>
                    <Suspense fallback={<div>Loading Earning Per Year...</div>}>
                        <EarningPerYear />
                    </Suspense>
                    <Suspense fallback={<div>Loading Revenue Source...</div>}>
                        <RevenueSource />
                    </Suspense>
                </div>
            )}

            {/* ==================== Course Performance ==================== */}
            <div>
                <button
                    className=" primary-button w-md"
                    onClick={() => setShowCoursePerformance((prev) => !prev)}
                >
                    {showCoursePerformance ? "Hide" : "Show"} Course Performance Charts
                </button>
            </div>
            {showCoursePerformance && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Suspense fallback={<div>Loading Top Performing Courses...</div>}>
                        <TopPerformingCourse />
                    </Suspense>
                    <Suspense fallback={<div>Loading Course Completion Rate...</div>}>
                        <CourseCompletionRate />
                    </Suspense>
                    <Suspense fallback={<div>Loading Average Ratings...</div>}>
                        <AverageRatingPerCourse />
                    </Suspense>
                    <Suspense fallback={<div>Loading Enrollment Trend...</div>}>
                        <EnrollmentTrend />
                    </Suspense>
                </div>
            )}

            {/* ==================== Student Insights / Engagement ==================== */}
            <div className="">
                <button
                    className="primary-button w-md"
                    onClick={() => setShowStudentInsights((prev) => !prev)}
                >
                    {showStudentInsights ? "Hide" : "Show"} Student Insights
                </button>
            </div>
            {showStudentInsights && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Suspense fallback={<div>Loading Student Geography...</div>}>
                        <StudentGeography />
                    </Suspense>
                    <Suspense fallback={<div>Loading Student Engagement...</div>}>
                        <StudentEngagement />
                    </Suspense>
                    <Suspense fallback={<div>Loading New vs Returning Students...</div>}>
                        <NewVsReturningStudents />
                    </Suspense>
                </div>
            )}

            {/* ==================== Student Satisfaction / Issues ==================== */}
            <div className="">
                <button
                    className="primary-button w-md"
                    onClick={() => setShowSatisfaction((prev) => !prev)}
                >
                    {showSatisfaction ? "Hide" : "Show"} Feedback & Refunds
                </button>
            </div>
            {showSatisfaction && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Suspense fallback={<div>Loading Feedback Trends...</div>}>
                        <FeedbackTrends />
                    </Suspense>
                    <Suspense fallback={<div>Loading Refund Statistics...</div>}>
                        <RefundStatistics />
                    </Suspense>
                </div>
            )}
        </div>
    );
};

export default Reports;
