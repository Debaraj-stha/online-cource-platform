import { FaFacebook, FaLinkedin, FaX } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { PiPhone } from 'react-icons/pi'
import { SOCIAL_LINK, SUPPORT_EMAIL, SUPPORT_TEL } from '../constants/common'

const ContactInfo = () => {
    const x=SOCIAL_LINK["x"]
    const facebook=SOCIAL_LINK["facebook"]
    const linkedin=SOCIAL_LINK["linkedin"]
    return (
        <div className="mt-10 space-y-2 text-gray-300 text-sm">
            <p className=''>
                <a href={`tel:${SUPPORT_TEL}`} className="hover:underline  inline-flex items-center gap-3"> <PiPhone /> {SUPPORT_TEL}</a>
            </p>
            <p className=''>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:underline  inline-flex items-center gap-3"> <MdEmail /> {SUPPORT_EMAIL}</a>
            </p>
            <p>
                🏢 123 Learning Street, Tech City, USA
            </p>

            {/* Social Media */}
            <div className="flex gap-4 mt-2">
                <a href={linkedin} className="hover:text-purple-400 inline-flex items-center gap-3" ><FaLinkedin /> LinkedIn</a>
                <a href={x} className="hover:text-purple-400 inline-flex items-center gap-3"><FaX /> Twitter</a>
                <a href={facebook} className="hover:text-purple-400 inline-flex items-center gap-3"><FaFacebook /> Facebook</a>
            </div>
        </div>

    )
}

export default ContactInfo
