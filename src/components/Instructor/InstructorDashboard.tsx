import React from "react";
import {
  FaChartLine,
  FaPlus,
} from "react-icons/fa";
import TopStats from "./TopStats";
import CoursePerformance from "./CoursePerformance";
import EarningChart from "./EarningChart";
import EngagementAndTodo from "./EngagementAndTodo";
import QuickActions from "./QuickActions";








const InstructorDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <TopStats />


      {/* Earnings Chart (Placeholder) */}
      <EarningChart />
      {/* Course Performance */}
      <CoursePerformance />

      {/* Engagement & Tasks */}
      <EngagementAndTodo />

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};

export default InstructorDashboard;
