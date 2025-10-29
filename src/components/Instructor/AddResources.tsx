import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { CgChevronDown, CgChevronUp } from 'react-icons/cg'

import AddResourceModal from './AddResourceModal'
import { setResourceField } from '../../store/reducers/instructorReducer'

const AddResources = () => {
    const course = useSelector((state: RootState) => state.course.course)
    const modules = course?.module ?? []
    const dispatch = useDispatch<AppDispatch>()

    const [openedIndexMap, setOpenedIndexMap] = useState<{ [key: number]: boolean }>({})
    const [lessonIndex, setLessonIndex] = useState<string | null>(null)
    const [modukeIndex, setModuleIndex] = useState<string | null>(null)

    // close all modules by default when modules change
    useEffect(() => {
        const initialMap: { [key: number]: boolean } = {}
        modules.forEach((_, i) => (initialMap[i] = false))
        setOpenedIndexMap(initialMap)
    }, [modules])

    // Toggle module open/close
    const toggleModule = (index: number) => {
        setOpenedIndexMap((prev) => ({ ...prev, [index]: !prev[index] }))
    }

    // Close modal and reset selected lesson/module
    const onCloseModal = () => {
        setLessonIndex(null)
        setModuleIndex(null)
    }

    // Set resource courseId, lessonId, moduleId when lesson/module is selected
    useEffect(() => {
        if (lessonIndex && modukeIndex) {
            dispatch(setResourceField({ field: "courseId", value: course.id }))
            dispatch(setResourceField({ field: "lessonId", value: lessonIndex }))
            dispatch(setResourceField({ field: "moduleId", value: modukeIndex }))
        }
    }, [lessonIndex, modukeIndex])


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add Resources</h1>

            {modules.length === 0 ? (
                <p className="text-gray-400">No modules found. Please add modules first.</p>
            ) : (
                <div className="space-y-4">
                    {modules.map((module, moduleIndex) => {
                        const isOpen = openedIndexMap[moduleIndex]

                        return (
                            <div
                                key={moduleIndex}
                                className="border border-gray-700 rounded-lg p-4 bg-gray-800 transition-all duration-300"
                            >
                                {/* Module Header */}
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleModule(moduleIndex)}
                                >
                                    <h2 className="text-lg font-semibold text-white">{module.title}</h2>
                                    {isOpen ? (
                                        <CgChevronUp className="text-gray-300" />
                                    ) : (
                                        <CgChevronDown className="text-gray-300" />
                                    )}
                                </div>

                                {/* Lessons */}
                                {isOpen && (
                                    <div className="mt-4 space-y-2">
                                        {module.lessons?.length === 0 ? (
                                            <p className="text-gray-400 text-sm">No lessons in this module.</p>
                                        ) : (
                                            module.lessons.map((lesson, lessonIndex) => (
                                                <div
                                                    key={lessonIndex}
                                                    className="border border-gray-600 rounded-md p-3 bg-gray-700 hover:bg-gray-600 transition-colors"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h3 className="font-medium text-white">{lesson.title}</h3>
                                                            <p className="text-sm text-gray-400">
                                                                Duration: {lesson.duration || 'N/A'}
                                                            </p>
                                                        </div>

                                                        {/* Resource Upload Placeholder */}
                                                        <button
                                                            type="button"
                                                            className="text-sm text-blue-400 hover:text-blue-300"
                                                            onClick={() => {
                                                                setLessonIndex(lesson.id!)
                                                                setModuleIndex(module.id!)
                                                            }
                                                            }
                                                        >
                                                            + Add Resource
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
            {
                lessonIndex && modukeIndex &&
                <AddResourceModal onCloseModal={onCloseModal} />
            }
        </div>
    )
}

export default AddResources
