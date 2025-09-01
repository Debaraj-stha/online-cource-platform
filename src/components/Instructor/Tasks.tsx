import React from 'react'
import { FaTasks } from 'react-icons/fa';

const Tasks = () => {
            const tasks = [
  "Review new student questions",
  "Update React for Beginners course",
  "Check assignments to grade",
];
  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md">
           <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
             <FaTasks /> To-Do
           </h3>
           <ul className="space-y-3">
             {tasks.map((task, idx) => (
               <li
                 key={idx}
                 className="p-3 bg-gray-700 rounded-lg flex items-center justify-between text-sm"
               >
                 {task}
                 <button className="text-xs bg-green-600 px-2 py-1 rounded hover:bg-green-700">
                   Mark Done
                 </button>
               </li>
             ))}
           </ul>
         </div>
  )
}

export default Tasks
