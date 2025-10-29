import { Link } from 'react-router-dom'

const BrowseCourseAButton = ({extraClass}:{extraClass?:string}) => {
    return (
        <Link
            to="/courses"
            className={`border border-white px-6 py-3 rounded-md font-semibold  hover:bg-white hover:text-blue-600 transition ${extraClass && extraClass}`}       >
            Browse Courses
        </Link>
    )
}

export default BrowseCourseAButton
