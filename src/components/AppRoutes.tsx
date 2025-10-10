import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Common pages
import Home from "../pages/Home";
import Cources from "../pages/Cources";
import Contact from "../pages/Contact";
import About from "../pages/About";
import AuthOutlet from "./AuthOutlet";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import CookiePolicy from "../pages/CookiePolicy";
import Terms from "../pages/Terms";
import Support from "../pages/Support";
import QnA from "../pages/QnA";
import Course from "../pages/Course";
import Logout from "../pages/Logout";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Setting from "../pages/Setting";
import EditProfile from "../pages/EditProfile";
import ChangeEmail from "../pages/ChangeEmail";
import EmailVerification from "../pages/EmailVerification";
import MoreCourse from "../pages/MoreCourse";
import StudentRoute from "./StudentRoute";
import { getCookie } from "../utils/manage-cookie";
import DeleteCourse from "./Instructor/DeleteCourse";


// Lazy-load instructor-only routes
const InstructorOutlet = lazy(() => import("./InstructorOutlet"));
const InstructorDashboard = lazy(() => import("./Instructor/InstructorDashboard"));
const Reports = lazy(() => import("./Instructor/Reports"));
const Instructorcourses = lazy(() => import("./Instructor/Instructorcourses"));
const CreateCourse = lazy(() => import("./Instructor/CreateCourse"));
const EditCourse = lazy(() => import("./Instructor/EditCourse"));



//student only routes
const Payment = lazy(() => import("../pages/Payment"));
const PaymentSuccess = lazy(() => import("../pages/PaymentSuccess"));
const PaymentFail = lazy(() => import("../pages/PaymentFail"));
const Mylearning = lazy(() => import("../pages/Mylearning"));




const AppRoutes = () => {
  const user = getCookie("user")
  const parsed = user ? JSON.parse(user) : {}
  const role = parsed?.role ?? "guest"
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route index path="/" element={<Home />} />
        <Route path="/courses" element={<Cources />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/terms-conditions" element={<Terms />} />
        <Route path="/support" element={<Support />} />
        <Route path="/questions" element={<QnA />} />
        <Route path="/courses/view-more" element={<MoreCourse />} />
        <Route path="/courses/:course_id" element={<Course />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/verify-email/" element={<EmailVerification />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />

        {/* student only routes */}
        {
          role === "student" && (
            <>
              <Route path="/payment" element={<StudentRoute element={<Payment />} />} />
              <Route path="/payment/success" element={<StudentRoute element={<PaymentSuccess />} />} />
              <Route path="/payment/failure" element={<StudentRoute element={<PaymentFail />} />} />
              <Route path="/my-learning" element={<StudentRoute element={<Mylearning />} />} />
            </>
          )
        }


        {/* Auth routes */}
        <Route path="/auth" element={<AuthOutlet />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="logout" element={<Logout />} />
        </Route>


        {/* Instructor routes - only if role is instructor */}
        {role === "instructor" && (
          <Route path="/instructor" element={<InstructorOutlet />}>
            <Route index element={<InstructorDashboard />} />
            <Route path="dashboard" element={<InstructorDashboard />} />
            <Route path="reports" element={<Reports />} />
            <Route path="courses" element={<Instructorcourses />} />
            <Route path="course/:courseId/delete" element={<DeleteCourse />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="edit-course/:courseId" element={<EditCourse />} />
            <Route path="settings" element={<Setting />} />
            <Route path="settings/change-email" element={<ChangeEmail />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit" element={<EditProfile />} />
          </Route>
        )}

        {/* Catch all */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
