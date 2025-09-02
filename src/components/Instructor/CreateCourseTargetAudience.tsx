import React, { useState } from 'react'
import type { TargetAudience } from '../../@types/course'
import { CgAdd, CgClose } from 'react-icons/cg'
import Input from '../Input'

const CreateCourseTargetAudience = () => {
  const [targetAudiences, setTargetAudiences] = useState<TargetAudience[]>([{ description: "", role: "", id: `${new Date().getTime()}` }])

  const addTargetResources = () => {
    setTargetAudiences((prev) => ([...prev, { description: "", role: "", id: `${new Date().getTime()}` }]))
  }
  const removeTargetAudience = (audienceId: string) => {
    setTargetAudiences((prev) => prev.filter(f => f.id !== audienceId))
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, audienceId: string) => {
    const { name, value } = e.target
    setTargetAudiences((prev) => prev.map((ele) => ele.id === audienceId ? { ...ele, [name]: value } : ele))
  }

  return (
    <div className='input_section'>
      <h2 className='title'>Target Audiences</h2>
      {
        targetAudiences.map((audience) => (
          <div key={audience.id} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' >
            <Input
              name='role'
              value={audience.role}
              textColorClass='text-gray-100'
              onChange={(e) => handleChange(e, audience.id)}
              placeholder='Beginners,Students, Professionals'
            />
            <Input
              name='description'
              value={audience.description}
              textColorClass='text-gray-100'
              onChange={(e) => handleChange(e, audience.id)}
              placeholder='who they are and why this course fits them'
            />
            <div>
              <button title='Remove resources'
                className='danger-button'
                type='button'
                onClick={() => removeTargetAudience(audience.id)}
              >
                <CgClose />
              </button>
            </div>
          </div>
        ))
      }
      <button title='Add TargetResources'
        className='primary-button'
        type='button'
        onClick={addTargetResources}
      >
        <CgAdd />
      </button>
    </div >
  )
}

export default CreateCourseTargetAudience
