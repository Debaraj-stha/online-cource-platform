import React from 'react'
import { FaBell } from 'react-icons/fa';

const Notifications = () => {


const notifications = [
  "New review on React for Beginners ⭐⭐⭐⭐⭐",
  "Admin approved your new course",
  "Student enrolled in Advanced Node.js",
];
  return (
        <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md">
             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
               <FaBell /> Notifications
             </h3>
             <ul className="space-y-3">
               {notifications.map((note, idx) => (
                 <li key={idx} className="p-3 bg-gray-700 rounded-lg text-sm">
                   {note}
                 </li>
               ))}
             </ul>
           </div>
  )
}

export default Notifications
