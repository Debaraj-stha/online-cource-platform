import React from 'react'
import {
  FaTasks,
  FaBell,
} from "react-icons/fa";
import Notifications from './Notifications';
import Tasks from './Tasks';
const EngagementAndTodo = () => {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
   <Notifications/>

        {/* Tasks */}
     <Tasks/>
      </div>
  )
}

export default EngagementAndTodo
