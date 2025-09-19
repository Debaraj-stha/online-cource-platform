import { useDispatch, useSelector } from 'react-redux'
import InstructorAllCoursesCards from '../InstructorAllCoursesCards'
import type { AppDispatch, RootState } from '../../store/store'

const Instructorcourses = () => {


    return (
        <div className='space-y-6'>
            <InstructorAllCoursesCards includeStudent={false} />
        </div>
    )
}

export default Instructorcourses
