import React, { useState } from "react";
import type { Module } from "../@types/course";
import { FaChevronDown, FaChevronUp, FaPlayCircle, FaClock } from "react-icons/fa";

interface CurriculumProps {
  modules?: Module[];
}

const Curriculum = ({ modules }: CurriculumProps) => {
  if(!modules)return
  const [openModule, setOpenModule] = useState<string | null>(null);

  const toggleModule = (id: string) => {
    setOpenModule(openModule === id ? null : id);
  };

  return (
    <div className="bg-white shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Course Curriculum</h2>

      <div className="space-y-4">
        {modules.map((mod) => {
          const isOpen = openModule === mod.id;

          return (
            <div key={mod.id} className="border rounded-lg">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="flex justify-between items-center w-full px-4 py-3 text-left text-lg font-semibold hover:bg-gray-100 text-gray-900"
              >
                <span>{mod.title}</span>
                {isOpen ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>

              {/* Lessons */}
              {isOpen && (
                <ul className="p-4 space-y-2 bg-gray-50 text-gray-800">
                  {mod.lessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <FaPlayCircle className="text-blue-500" />
                        <span className="text-gray-800">{lesson.title}</span>
                       
                      </div>
                      <span className="flex items-center text-sm text-gray-500 gap-1">
                        <FaClock /> {lesson.duration}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Curriculum;
