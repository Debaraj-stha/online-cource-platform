import React from 'react';
import capitalize from '../utils/string-func';
import  RoundedSkeleton from './RoundedSkeleton';


interface Props {
  skills: string[];
}

const InstructorSkills = ({ skills }: Props) => {
  const loading = true
  if (!skills || skills.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">

      {
        loading ?
        <RoundedSkeleton/>
          :
          skills.map((skill, index) => (
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
