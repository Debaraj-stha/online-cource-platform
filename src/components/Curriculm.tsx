import { useState, type JSX } from "react";
import type { Module, } from "../@types/course";
import {
  FaChevronDown, FaChevronUp, FaPlayCircle, FaClock,
  FaFileAlt, FaLink, FaImage, FaFileCode, FaFileAudio, FaFile
} from "react-icons/fa";

interface CurriculumProps {
  modules?: Module[];
}

const resourceIconMap: Record<string, JSX.Element> = {
  video: <FaPlayCircle className="text-red-500" />,
  document: <FaFileAlt className="text-blue-500" />,
  image: <FaImage className="text-purple-500" />,
  link: <FaLink className="text-green-500" />,
  code: <FaFileCode className="text-yellow-500" />,
  audio: <FaFileAudio className="text-pink-500" />,
  other: <FaFile className="text-gray-500" />
};

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
                <ul className="p-4 space-y-2 bg-gray-50 text-gray-800">
                  {mod.lessons.map((lesson) => {
                    const lessonOpen = openLesson === lesson.id;
                    return (
                      <li key={lesson.id} className="bg-white rounded-lg shadow-sm">
                        <div className="flex justify-between items-center p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
                          onClick={() => toggleLesson(lesson.id)}
                        >
                          <div className="flex items-center gap-2">
                            <FaPlayCircle className="text-blue-500" />
                            <span className="text-gray-800">{lesson.title}</span>
                            {lesson.resources && lesson.resources?.length > 0 && (
                              <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                {lesson.resources.length} Resources
                              </span>
                            )}
                          </div>
                          <span className="flex items-center text-sm text-gray-500 gap-1">
                            <FaClock /> {lesson.duration}
                          </span>
                        </div>


                        {/* Lesson resources */}
                        {lessonOpen && lesson.resources && lesson.resources.length > 0 && (
                          <ul className="p-3 border-t bg-gray-50 space-y-2">
                            {lesson.resources.map((res) => (
                              <li
                                key={res.id}
                                className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm hover:bg-gray-100"
                              >
                                {resourceIconMap[res.type] || resourceIconMap.other}
                                <div className="flex flex-col">
                                  <a
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 font-medium hover:underline"
                                  >
                                    {res.title}
                                  </a>
                                  {res.description && (
                                    <p className="text-xs text-gray-600">{res.description}</p>
                                  )}
                                </div>
                                {res.size && (
                                  <span className="ml-auto text-xs text-gray-500">{res.size}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
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
