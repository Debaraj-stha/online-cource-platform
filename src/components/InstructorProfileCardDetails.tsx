import InstructorSocialLinks from './InstructorSocialLinks'
import type { Instructor } from '../@types/instructor'

interface Props {
    instructor: Partial<Instructor>
}
const InstructorProfileCardDetails = ({ instructor }: Props) => {
    return (
        <>
            {

                instructor?.bio && (
                    <p className="text-sm text-gray-300  bio">{instructor.bio}</p>
                )
            }
            {
                instructor?.title && (
                    <p className="text-sm text-gray-300 instructor-title">{instructor.title}</p>
                )
            }
            {
                instructor?.experience && (
                    <p className="text-sm text-gray-300 instructor-title">Experience:{instructor.experience.toFixed(1)}</p>
                )
            }

            <InstructorSocialLinks
                loading={false}
                social={instructor?.socialLinks}

            />

        </>
    )
}

export default InstructorProfileCardDetails
