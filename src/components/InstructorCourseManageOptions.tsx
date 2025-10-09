import { MdMoreVert } from 'react-icons/md'
import AbsoluteCard from './AbsoluteCard'
import { Link } from 'react-router-dom'
import type { AppDispatch, RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCourseManageOptions } from '../store/reducers/instructorReducer'

interface Props {
    courseId: string,
}
const InstructorCourseManageOptions = ({ courseId }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const { openedInstructorCourseManageOptionsId } = useSelector((state: RootState) => state.instructor) //to re-render when user state changes

    return (
        <div className='relative mb-6'>
            <button type='button' title='More' onClick={() => dispatch(toggleCourseManageOptions({ courseId }))}><MdMoreVert size={20} /></button>
            {
                // open menu if its id matches and menu is
                openedInstructorCourseManageOptionsId === courseId &&
                // close the menu on clicking outside
                <AbsoluteCard extraClass='w-40 h-68 animate-slide-up' onClick={() => dispatch(toggleCourseManageOptions({ courseId: null }))}>
                    <div className='space-y-1'>
                        <Link to={`/instructor/edit-course/${courseId}`} className='block px-4 py-2 hover:bg-gray-200 hover:text-blue-500 transition-colors rounded'>Edit Course</Link>
                        <Link to={`/instructor/course/${courseId}`} className='block px-4 py-2 hover:bg-gray-200  hover:text-blue-500 transition-colors rounded'>View Course</Link>
                        <Link to={`/instructor/course/${courseId}/students`} className='block px-4 py-2 hover:bg-gray-200  hover:text-blue-500 transition-colors rounded'>View Students</Link>
                        <Link to={`/instructor/course/${courseId}/analytics`} className='block px-4 py-2 hover:bg-gray-200  hover:text-blue-500 transition-colors rounded'>View Analytics</Link>
                        <Link to={`/instructor/course/${courseId}/delete`} className='block px-4 py-2 text-red-500 hover:bg-gray-200  hover:text-red-600 transition-colors rounded'>Delete</Link>
                    </div>
                </AbsoluteCard>
            }
        </div>
    )
}

export default InstructorCourseManageOptions
