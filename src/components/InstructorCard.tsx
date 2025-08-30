import React from "react";
import type { Instructor } from "../@types/instructor";

import InstructorSocialLinks from "./InstructorSocialLinks";

const InstructorCard = ({ instructor }: { instructor: Instructor }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
      {/* Profile */}
      <div className="flex items-center gap-4">
        <img
          src={instructor.profile || "https://via.placeholder.com/100"}
          alt={instructor.name}
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{instructor.name}</h2>
          {instructor.title && (
            <p className="text-sm text-gray-500">{instructor.title}</p>
          )}
        </div>
      </div>

      {/* Bio */}
      {instructor.bio && (
        <p className="text-gray-600 text-sm leading-relaxed">{instructor.bio}</p>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        {instructor.students && (
          <p>👥 Students: <span className="font-semibold">{instructor.students}</span></p>
        )}
        {instructor.courses && (
          <p>📚 Courses: <span className="font-semibold">{instructor.courses}</span></p>
        )}
        {instructor.experience && (
          <p>💼 Experience: <span className="font-semibold">{instructor.experience} yrs</span></p>
        )}
        {instructor.rating && (
          <p>⭐ Rating: <span className="font-semibold">{instructor.rating}</span></p>
        )}
      </div>

      {/* Contact */}
      <InstructorSocialLinks
        email={instructor.email}
        facebook={instructor.facebook}
        linkedin={instructor.linkedin}
        website={instructor.website}
        phone={instructor.phone}
        twitter={instructor.twitter}
      />
    </div>
  );
};

export default InstructorCard;
