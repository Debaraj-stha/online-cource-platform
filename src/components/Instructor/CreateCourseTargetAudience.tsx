import React from 'react'
import { CgAdd, CgClose } from 'react-icons/cg'
import Input from '../Input'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { addDynamicField, removeDynamicField, updateDynamicField } from '../../store/reducers/courseReducer'
import type { TargetAudience } from '../../@types/course'

const CreateCourseTargetAudience = () => {
  const dispatch = useDispatch<AppDispatch>()
  const targetedAudiences = useSelector((state: RootState) => state.course.course.targetedAudiences)

  const addTargetAudience = () => {
    dispatch(
      addDynamicField({
        field: "targetedAudiences",
        value: { description: "", role: "", id: `${Date.now()}` } as TargetAudience
      })
    )
  }

  const removeTargetAudience = (audienceId: string) => {
    dispatch(removeDynamicField({
      field: "targetedAudiences",
      id: audienceId
    }))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    audienceId: string
  ) => {
    const { name, value } = e.target
    dispatch(updateDynamicField({
      field: "targetedAudiences",
      id: audienceId,
      value: { [name]: value } as Partial<TargetAudience>
    }))
  }

  return (
    <div className='input_section'>
      <h2 className='title'>Target Audiences</h2>
      {(targetedAudiences || []).map((audience) => (
        <div key={audience.id} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <Input
            name='role'
            value={audience.role}
            textColorClass='text-gray-100'
            onChange={(e) => handleChange(e, audience.id)}
            placeholder='Beginners, Students, Professionals'
          />
          <Input
            name='description'
            value={audience.description}
            textColorClass='text-gray-100'
            onChange={(e) => handleChange(e, audience.id)}
            placeholder='Who they are and why this course fits them'
          />
          <div>
            <button
              title='Remove audience'
              className='danger-button'
              type='button'
              onClick={() => removeTargetAudience(audience.id)}
            >
              <CgClose />
            </button>
          </div>
        </div>
      ))}

      <button
        title='Add Target Audience'
        className='primary-button'
        type='button'
        onClick={addTargetAudience}
      >
        <CgAdd />
      </button>
    </div>
  )
}

export default CreateCourseTargetAudience
