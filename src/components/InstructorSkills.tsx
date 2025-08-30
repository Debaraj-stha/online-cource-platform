import React from 'react';
import capitalize from '../utils/string-func';

interface Props {
  skills: string[];
}

const InstructorSkills = ({ skills }: Props) => {
  if (!skills || skills.length === 0) return null;

  return (
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="badge text-sm"
          >
        {capitalize(skill)}
          </span>
        ))}
      </div>
  );
};

export default InstructorSkills;
