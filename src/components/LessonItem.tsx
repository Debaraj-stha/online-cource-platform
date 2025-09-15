
import { FaPlayCircle } from 'react-icons/fa'
import { FaClock } from 'react-icons/fa6'
import LessonResourceItem from './LessonResourceItem'
import type { Lesson } from '../@types/course'
interface  Props{
lessonOpen:boolean
lesson:Lesson
toggleLesson:(id:string)=>void
}
const LessonItem = ({lessonOpen,lesson,toggleLesson}:Props) => {
    return (
        <li  className="bg-white rounded-lg shadow-sm">
            <div className="flex justify-between flex-col sm:flex-row sm:items-center sm:p-3 gap-3 hover:bg-gray-100 cursor-pointer rounded-lg"
                onClick={() => toggleLesson(lesson.id)}
            >
                <div className="flex sm:items-center gap-2 flex-col sm:flex-row">
                   <div className='flex  gap-3 '>
                     <FaPlayCircle className="text-blue-500 mt-1" size={25} />
                    <span className="text-gray-800 text-sm sm:text-lg">{lesson.title}</span>
                   </div>
                   <div>
                     {lesson.resources && lesson.resources?.length > 0 && (
                        <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {lesson.resources.length} Resources
                        </span>
                    )}
                    </div>
                </div>
                <span className="flex items-center text-sm text-gray-500 gap-1">
                    <FaClock /> {lesson.duration}
                </span>
            </div>


            {/* Lesson resources */}
            {lessonOpen && lesson.resources && lesson.resources.length > 0 && (
                <ul className="sm:p-3 border-t bg-gray-50 space-y-2">
                    {lesson.resources.map((res) => {
                        return <LessonResourceItem key={res.id} resource={res} lessonTitle={lesson.title} />
                    }
                    )}
                </ul>
            )}
        </li>
    )
}

export default LessonItem
