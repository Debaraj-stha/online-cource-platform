import React, { useState } from 'react'
import Modal from '../Modal'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { addResourceToLesson, clearResourceValue, setResourceField } from '../../store/reducers/instructorReducer'
import type { CourseResource, ResourceType } from '../../@types/course'
interface AddResourceModalProps {
    onCloseModal: () => void
}

const AddResourceModal = ({ onCloseModal }: AddResourceModalProps) => {
    const resource = useSelector((state: RootState) => state.instructor.resource)
    const dispatch = useDispatch<AppDispatch>()
    const [isAdding, setIsAdding] = useState(false)


    const addResource = async () => {
        try {
            setIsAdding(true)
            if (!resource) return
            await dispatch(addResourceToLesson(resource!))

        } catch (error) {
            console.error('Error adding resource:', error)

        } finally {
            setIsAdding(false)
            onCloseModal()
        }
    }

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;

  if (name === "type") {
    // First clear
    dispatch(clearResourceValue(type as ResourceType));

    //  set new type after a short delay (so clear takes effect first)
    setTimeout(() => {
      dispatch(setResourceField({ field: "type", value }));
    }, 0);
    return;
  }

  if (type === "file") {
    const file = (e.target as HTMLInputElement).files?.[0] || null;
    dispatch(setResourceField({ field: name as keyof CourseResource, value: file! }));
  } else {
    dispatch(setResourceField({ field: name as keyof CourseResource, value }));
  }
};

    return (
        <Modal >
            <div className="bg-gray-900 p-6 rounded-lg w-96">
                <h2 className="text-xl font-semibold mb-4 text-white">Add Resource</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-1" htmlFor="resourceType">
                            Resource Type
                        </label>
                        <select
                            id="resourceType"
                            name='type'
                            value={resource?.type}
                            onChange={handleChange}

                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                        >
                            <option value="video">Video</option>
                            <option value="document">Document</option>
                        </select>
                    </div>

                    {
                        resource?.type === 'video' && (
                            <>
                                <div>
                                    <label className="block text-gray-300 mb-1" htmlFor="documentFile">
                                        File
                                    </label>
                                    <input
                                        id="resourceFile"
                                        type="file"
                                        onChange={handleChange}
                                        name='full_video'
                                        accept='video/*'
                                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-1" htmlFor="preview">
                                        Preview(optional)
                                    </label>
                                    <input
                                        id="preview"
                                        onChange={handleChange}
                                        name='preview'
                                        type="file"
                                        accept='video/*'
                                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-1" htmlFor="thumbnail">
                                        Thumbnail(optional)
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        id="thumbnail"
                                        type="file"
                                        name='thumbnail'
                                        accept='image/*'
                                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                                    />
                                </div>
                            </>
                        )
                    }
                    {
                        resource?.type === 'document' && (
                            <div>
                                <label className="block text-gray-300 mb-1" htmlFor="documentFile">
                                    Document
                                </label>
                                <input
                                    id="documentFile"
                                    type="file"
                                    onChange={handleChange}
                                    name='doc'
                                    accept='.pdf,.doc,.docx,.txt,.ppt,.pptx'
                                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                                />
                            </div>
                        )
                    }

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                            onClick={() => {
                                onCloseModal()
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            disabled={isAdding}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50"
                            onClick={() => {
                                // Handle resource upload logic here
                                addResource()

                            }}
                        >
                            Add Resource
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AddResourceModal
