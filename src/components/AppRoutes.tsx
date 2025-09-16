import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Cources from '../pages/Cources'
import Contact from '../pages/Contact'
import About from '../pages/About'
import AuthOutlet from './AuthOutlet'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import CookiePolicy from '../pages/CookiePolicy'
import Terms from '../pages/Terms'
import Support from '../pages/Support'
import QnA from '../pages/QnA'
import Course from '../pages/Course'
import Logout from '../pages/Logout'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'
import InstructorOutlet from './InstructorOutlet'
import InstructorDashboard from './Instructor/InstructorDashboard'
import Setting from '../pages/Setting'
import Reports from './Instructor/Reports'
import Instructorcourses from './Instructor/Instructorcourses'
import CreateCourse from './Instructor/CreateCourse'
import EditCourse from './Instructor/EditCourse'
import EditProfile from '../pages/EditProfile'
import ChangeEmail from '../pages/ChangeEmail'
import EmailVerification from '../pages/EmailVerification'
import MoreCourse from '../pages/MoreCourse'
import Payment from '../pages/Payment'


const AppRoutes = () => {
  return (
    <Routes>
      {/* public route */}
      <Route index path='/' element={<Home />} />
      <Route path='/courses' element={<Cources />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/cookie-policy' element={<CookiePolicy />} />
      <Route path='/terms-conditions' element={<Terms />} />
      <Route path='/support' element={<Support />} />
      <Route path='/questions' element={<QnA />} />
      <Route path='/courses/view-more' element={<MoreCourse />} />
      <Route path='/courses/:course_id' element={<Course />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/setting' element={<Setting />} />
      <Route path='/verify-email/' element={<EmailVerification />} />
      <Route path='/verify-email/:token' element={<EmailVerification />} />
      <Route path='/payment' element={<Payment />}/>
      {/* auth routes */}
      <Route path='/auth' element={<AuthOutlet />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='logout' element={<Logout />} />
      </Route>
      {/* instructor routes */}
      <Route path='/instructor' element={<InstructorOutlet />}>
        <Route index element={<InstructorDashboard />} />
        <Route index path='dashboard' element={<InstructorDashboard />} />
        <Route path='reports' element={<Reports />} />
        <Route path='courses' element={<Instructorcourses />} />
        <Route path='create-course' element={<CreateCourse />} />
        <Route path='edit-course' element={<EditCourse />} />
        <Route path='settings' element={<Setting />} />
        <Route path='settings/change-email' element={<ChangeEmail />} />
        <Route path='profile' element={<Profile />} />
        <Route path='profile/edit' element={<EditProfile />} />

      </Route>
      {/* route for any path */}
      <Route path='/*' element={<NotFound />} />

    </Routes>
  )
}

export default AppRoutes
