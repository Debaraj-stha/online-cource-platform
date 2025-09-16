import React, { memo } from "react";
import type { Instructor } from "../@types/instructor";

import InstructorSocialLinks from "./InstructorSocialLinks";
import capitalize from "../utils/string-func";
const SERVER_URL=import.meta.env.VITE_SERVER_BASE_URL

const InstructorCard = memo(({ instructor }: { instructor: Instructor }) => {
  const imageURL=`${SERVER_URL}/uploads/${instructor.profilePicture}`
  console.log(instructor.totalStudents)
  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
      {/* Profile */}
      <div className="flex items-center gap-4">
        <img
          src={instructor.profilePicture ? imageURL: "https://via.placeholder.com/100"}
          alt={instructor.name}
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{capitalize(instructor.name)}</h2>
          {instructor.title && (
            <p className="text-sm text-gray-500">{instructor.title}</p>
          )}
        </div>
      </div>

      {/* Bio */}
      {instructor.bio && (
        <p className="text-gray-600 text-sm leading-relaxed">{instructor.bio}</p>
      )}
         {instructor.specialization && (
        <p className="text-gray-600 text-sm leading-relaxed">{instructor.specialization}</p>
      )}
      


      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
       
          <p>👥 Students: <span className="font-semibold">{instructor.totalStudents??0}</span></p>
     

          <p>📚 Courses: <span className="font-semibold">{instructor.totalCourses??0}</span></p>
    
          <p>💼 Experience: <span className="font-semibold">{instructor.experience??0} yrs</span></p>
      
          <p>⭐ Rating: <span className="font-semibold">{instructor.averageRating??0.0}</span></p>
      
      </div>

      {/* Contact */}
      <InstructorSocialLinks
      social={instructor.socialLinks}
      />
    </div>
  );
});

export default InstructorCard;
