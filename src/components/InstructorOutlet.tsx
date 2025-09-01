import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const InstructorOutlet = () => {
    return (
        <div className='flex gap-4'>
            <Sidebar />
            <div className='p-6 flex-1'>
                <Outlet />
            </div>
        </div>

    )
}

export default InstructorOutlet
