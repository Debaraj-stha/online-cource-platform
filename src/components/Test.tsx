import React, { useState } from 'react'
import AddCourseVideo from './Instructor/AddCourseVideo'

const Test = () => {
    const[openModal,setModalOpen]=useState(false)
  return (
    <div>
      <button onClick={()=>setModalOpen(true)}>Open modal</button>
      {
        openModal && <AddCourseVideo onClose={()=>setModalOpen(false)}/>
      }
    </div>
  )
}

export default Test
