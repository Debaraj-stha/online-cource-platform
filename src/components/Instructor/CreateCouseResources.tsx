import React, { } from 'react'
import type { CourseResource, } from '../../@types/course'
import { CgAdd, CgClose } from 'react-icons/cg'
import Input from '../Input'
import { resourceTypes } from '../../constants/resourceTypes'
import type { AppDispatch, RootState } from '../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { addDynamicField, removeDynamicField, updateDynamicField } from '../../store/reducers/courseReducer'



const CreateCouseResources = () => {
    const dispatch = useDispatch<AppDispatch>()
    const resources = useSelector((state: RootState) => state.course.course.resources)

    const addResource = () => {
        dispatch(addDynamicField({
            field: "resources",
            value: {
                title: "", url: "", id: `${new Date().getTime()}`, courseId: "demo",
                type: "code", size: undefined,
                createdAt: `${new Date().toISOString()}`
            }
        }))

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, resourceId: string) => {
        const { value, name } = e.target
        dispatch(updateDynamicField({
            field: "resources",
            id: resourceId,
            value: { [name]: value } as Partial<CourseResource>
        }))
    }

    const handleTypeSelection = (e: React.ChangeEvent<HTMLSelectElement>, resourceId: string) => {
        dispatch(updateDynamicField({
            field: "resources",
            id: resourceId,
            value: { "type": e.target.value } as Partial<CourseResource>
        }))
    }

    const removeResource = (id: string) => {
        dispatch(removeDynamicField({ field: "resources", id }))
    }
    return (
        <div className='input_section'>
            <h2 className='title'>Course Resources</h2>
            {
                (resources || []).map((resource) => (
                    <div key={resource.id} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 '>
                        <Input
                            name='title'
                            placeholder='Title'
                            textColorClass='text-gray-100'
                            value={resource.title}
                            onChange={(e) => handleChange(e, resource.id)}
                        />
                        <Input
                            name='url'
                            placeholder='Resouce URL'
                            textColorClass='text-gray-100'
                            value={resource.url}
                            onChange={(e) => handleChange(e, resource.id)}
                        />
                        <Input
                            name='description'
                            placeholder='Resouce description(Optional)'
                            textColorClass='text-gray-100'
                            value={resource.description}
                            onChange={(e) => handleChange(e, resource.id)}
                        />
                        <select
                            name='type'
                            className='border border-gray-700'
                            onChange={(e) => handleTypeSelection(e, resource.id)}
                            value={resource.type || ""}
                        >
                            <option value="" disabled>Resource Type</option>
                            {resourceTypes.map((resourceType) => (
                                <option key={resourceType} value={resourceType}>{resourceType}</option>
                            ))}
                        </select>


                        <div>
                            <button title='Remove resources'
                                className='danger-button'
                                type='button'
                                onClick={() => removeResource(resource.id)}
                            >
                                <CgClose />
                            </button>
                        </div>

                    </div>
                ))
            }
            <button title='Add Resource'
                className='primary-button'
                type='button'
                onClick={addResource}
            >
                <CgAdd />
            </button>
        </div>
    )
}

export default CreateCouseResources
