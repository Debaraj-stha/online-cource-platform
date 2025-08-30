import React from 'react'
import { FaEnvelope, FaPhone, FaLinkedin, FaTwitter, FaGlobe, FaFacebook } from "react-icons/fa";

interface Props {
    email?: string | null
    linkedin?: string | null
    facebook?: string | null
    phone?: string | null
    twitter?: string | null
    website?: string | null
}
const InstructorSocialLinks = ({ email, facebook, phone, linkedin, website, twitter }: Props) => {
    return (
        <div className="flex flex-wrap gap-3 mt-2 ">
            {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-1 hover:underline hover:text-blue-400 transition-colors">
                    <FaEnvelope /> Email
                </a>
            )}
            {phone && (
                <a href={`tel:${phone}`} className="flex items-center gap-1 hover:underline hover:text-blue-400 transition-colors">
                    <FaPhone /> Call
                </a>
            )}
            {linkedin && (
                <a href={linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline hover:text-blue-400 transition-colors">
                    <FaLinkedin /> LinkedIn
                </a>
            )}
            {twitter && (
                <a href={twitter} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline hover:text-blue-400 transition-colors">
                    <FaTwitter /> Twitter
                </a>
            )}
            {facebook && (
                <a href={facebook} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline hover:text-blue-400 transition-colors">
                    <FaFacebook /> Twitter
                </a>
            )}
            {website && (
                <a href={website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline hover:text-blue-400 transition-colors">
                    <FaGlobe /> Website
                </a>
            )}
        </div>
    )
}

export default InstructorSocialLinks
