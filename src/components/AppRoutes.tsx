import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Sidebar from './Sidebar'
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
      <Route path='/auth' element={<AuthOutlet />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
