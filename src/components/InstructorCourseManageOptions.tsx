import { MdMoreVert } from 'react-icons/md'
import AbsoluteCard from './AbsoluteCard'
import { Link } from 'react-router-dom'
import type { AppDispatch, RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCourseManageOptions } from '../store/reducers/instructorReducer'

interface Props {
  courseId: string
}

const InstructorCourseManageOptions = ({ courseId }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { openedInstructorCourseManageOptionsId } = useSelector(
    (state: RootState) => state.instructor
  )

  const menuItems = [
    { label: 'Edit Course', path: `/instructor/edit-course/${courseId}` },
    { label: 'View Course', path: `/instructor/course/${courseId}` },
    { label: 'View Students', path: `/instructor/course/${courseId}/students` },
    { label: 'View Analytics', path: `/instructor/course/${courseId}/analytics` },
    {
      label: 'Delete',
      path: `/instructor/course/${courseId}/delete`,
      textColor: 'text-red-500 hover:text-red-600',
    },
  ]

  return (
    <div className='relative mb-6'>
      <button
        type='button'
        title='More'
        onClick={() => dispatch(toggleCourseManageOptions({ courseId }))}
      >
        <MdMoreVert size={20} />
      </button>

      {openedInstructorCourseManageOptionsId === courseId && (
        <AbsoluteCard
          extraClass='w-40 animate-slide-up'
          onClick={() => dispatch(toggleCourseManageOptions({ courseId: null }))}
        >
          <div className='space-y-1'>
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`block px-4 py-2 hover:bg-gray-200 transition-colors rounded ${
                  item.textColor || 'hover:text-blue-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </AbsoluteCard>
      )}
    </div>
  )
}

export default InstructorCourseManageOptions
