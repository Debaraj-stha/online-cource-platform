import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Sidebar from './Sidebar'
import Cources from '../pages/Cources'

const AppRoutes = () => {
  return (
    <Routes>
      <Route index path='/' element={<Home/>}/>
        <Route path='/courses' element={<Cources/>}/>
    </Routes>
  )
}

export default AppRoutes
