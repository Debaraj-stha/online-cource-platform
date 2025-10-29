import { type JSX } from "react";

import {  FaFileCode, FaVideo, FaLink, FaFileAlt, FaFileImage, FaFileAudio } from "react-icons/fa";
import type { CourseResource, ResourceType } from "../@types/course";

interface ResourcesProps {
    resources: CourseResource[];
}

const typeIcons: Record<ResourceType, JSX.Element> = {
    code: <FaFileCode className="text-green-500" />,
    video: <FaVideo className="text-blue-500" />,
    link: <FaLink className="text-purple-500" />,
    document: <FaFileAlt className="text-gray-500" />,
    image: <FaFileImage className="text-pink-500" />,
    audio: <FaFileAudio className="text-yellow-500" />,
    other: <FaFileAlt className="text-gray-400" />,
};

const ResourcesCard = ({ resources }: ResourcesProps) => {
    if (!resources || resources.length === 0) {
        return <p className="text-gray-500">No resources available for this course.</p>;
    }

    return (
        <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📂 Course Resources</h2>

            <ul className="space-y-3">
                {resources.map((res) => (
                    <li
                        key={res.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                    >
                        <div className="text-xl">{typeIcons[res.type]}</div>
                        <div className="flex-1">
                            <a
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                {res.title}
                            </a>
                            {res.description && (
                                <p className="text-gray-600 text-sm">{res.description}</p>
                            )}
                        </div>
                        {res.size && <span className="text-gray-400 text-xs">{res.size}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResourcesCard;
