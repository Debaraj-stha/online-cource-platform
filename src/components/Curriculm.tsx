import { useState } from "react";
import type { Module, } from "../@types/course";
import {
  FaChevronDown, FaChevronUp,
} from "react-icons/fa";

import LessonItem from "./LessonItem";


interface CurriculumProps {
  modules?: Module[];
}



const Curriculum = ({ modules }: CurriculumProps) => {
  if (!modules) return null;
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [openLesson, setOpenLesson] = useState<string | null>(null);

  const toggleModule = (id: string) => {
    setOpenModule(openModule === id ? null : id);
  };

  const toggleLesson = (id: string) => {
    setOpenLesson(openLesson === id ? null : id);
  };



  return (
    <div className="bg-white shadow-md p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Course Curriculum</h2>

      <div className="space-y-4">
        {modules.map((mod) => {
          const isOpen = openModule === mod.id;

          return (
            <div key={mod.id} className="border rounded-lg">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className={`flex justify-between items-center w-full px-4 py-3 text-left text-lg font-semibold transition-colors
                    text-gray-900 ${isOpen ? "bg-gray-300 hover:bg-gray-200" : "hover:bg-gray-100"}`}
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
                <ul className="sm:p-4 space-y-2 bg-gray-50 text-gray-800">
                  {mod.lessons.map((lesson) => {
                    const lessonOpen = openLesson === lesson.id;
                    return <LessonItem key={lesson.id} lesson={lesson} lessonOpen={lessonOpen} toggleLesson={toggleLesson} />
                  })}
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
