import React from "react";
import type { Instructor } from "../@types/instructor";
import { FaEnvelope, FaPhone, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
import NumberAnimation from "./NumberAnimation";

const InstructorCard = ({ instructor }: { instructor: Instructor }) => {
  return (
    <div className="shadow-md rounded-xl p-6 space-y-4">


      {/* Bio */}
      {instructor.bio && (
        <p className="text-gray-300 text-sm leading-relaxed">{instructor.bio}</p>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
        {instructor.students && (
          <p>👥 Students: <span className="font-semibold"><NumberAnimation target={instructor.students} /></span></p>
        )}
        {instructor.courses && (
          <p>📚 Courses: <span className="font-semibold"><NumberAnimation target={12} /></span></p>
        )}
        {instructor.experience && (
          <p>💼 Experience: <span className="font-semibold">{instructor.experience} yrs</span></p>
        )}
        {instructor.rating && (
          <p>⭐ Rating: <span className="font-semibold">{instructor.rating}</span></p>
        )}
      </div>

      {/* Contact */}
      <div className="flex flex-wrap gap-3 mt-2 text-blue-600">
        {instructor.email && (
          <a href={`mailto:${instructor.email}`} className="flex items-center gap-1 hover:underline">
            <FaEnvelope /> Email
          </a>
        )}
        {instructor.phone && (
          <a href={`tel:${instructor.phone}`} className="flex items-center gap-1 hover:underline">
            <FaPhone /> Call
          </a>
        )}
        {instructor.linkedin && (
          <a href={instructor.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
            <FaLinkedin /> LinkedIn
          </a>
        )}
        {instructor.twitter && (
          <a href={instructor.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
            <FaTwitter /> Twitter
          </a>
        )}
        {instructor.website && (
          <a href={instructor.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
            <FaGlobe /> Website
          </a>
        )}
      </div>
    </div>
  );
};

export default InstructorCard;
