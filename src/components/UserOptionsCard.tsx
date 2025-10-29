import { useEffect } from 'react';
import gsap from 'gsap'
import LanguageSelector from './LanguageSelector'
import { Link } from 'react-router-dom';
const UserOptionsCard = () => {
    useEffect(() => {
        gsap.set(".user-info-card", {
            opacity: 0,
            right: "-400px;"
        })
        gsap.to(".user-info-card", {
            opacity: 1,
            right: "0",
            ease: "expo"
        })
    }, [])
    return (
        <div className='user-info-card bg-gray-700 absolute rounded px-3 py-5 w-80 right-0 top-12 space-y-3 shadow hover:shadow-lg transition'>
            <LanguageSelector />
            <Link to="/profile" className='block hover:text-gray-300 transition'>Profile</Link>
            <Link to="/settings" className='block hover:text-gray-300 transition'>Settings</Link>
            <button className='bg-red-600 rounded hover:bg-red-500 transition'>Logout</button>
        </div>
    )
}

export default UserOptionsCard
