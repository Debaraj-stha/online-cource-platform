import type { CourseResource } from '../@types/course';
import { type JSX } from "react";
import {
    FaPlayCircle, FaFileAlt, FaLink, FaImage,
    FaFileCode, FaFileAudio, FaFile
} from "react-icons/fa";
import { fetchSignedUrl } from '../utils/helper';

interface Props {
    resource: CourseResource;
    lessonTitle: string;
}

const resourceIconMap: Record<string, JSX.Element> = {
    video: <FaPlayCircle className="text-red-500" size={25} />,
    document: <FaFileAlt className="text-blue-500" size={25} />,
    image: <FaImage className="text-purple-500" size={25} />,
    link: <FaLink className="text-green-500" size={25} />,
    code: <FaFileCode className="text-yellow-500" size={25} />,
    audio: <FaFileAudio className="text-pink-500" size={25} />,
    other: <FaFile className="text-gray-500" size={25} />
};

const LessonResourceItem = ({ resource, lessonTitle }: Props) => {
    const filename = resource.url.split("/").pop();

    return (
        <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white sm:p-3 rounded-lg shadow-sm hover:bg-gray-100">
            {/* Main content */}
            <div className="1 min-w-0 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                    {/* Icon + Title/Filename on the same line */}
                    <div className="flex items-center gap-2">
                        {resourceIconMap[resource.type] || resourceIconMap.other}
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                fetchSignedUrl({ type: resource.type, url: resource.url });
                            }}
                            href="#"
                            className="text-blue-600 text-sm sm:text-lg hover:underline break-words"
                        >
                            {resource.title ?? filename}
                        </a>
                    </div>

                    {/* Thumbnail for videos */}
                    {resource.type === "video" && resource.thumbnail && (
                        <div className='w-full sm:w-40'>
                            <img
                                src={resource.thumbnail.toString()}
                                alt={`${lessonTitle} thumbnail`}
                                className="rounded-lg w-full h-full object-cover mt-2"
                            />
                        </div>
                    )}

                    {/* Description */}
                    {resource.description && (
                        <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                            {resource.description}
                        </p>
                    )}

                    {/* Preview button */}
                    {resource.type === "video" && resource.preview && (
                        <button
                            className="text-sm text-blue-600 hover:underline mt-1 bg-blue-200 hover:bg-blue-100 transition-colors rounded duration-200"
                            onClick={(e) => {
                                e.preventDefault();
                                fetchSignedUrl({
                                    type: resource.type,
                                    previewURL: resource.preview,
                                });
                            }}
                        >
                            ▶ Preview
                        </button>
                    )}
                </div>

                {/* File size */}
                {resource.size && (
                    <span className="text-xs text-gray-500 whitespace-nowrap mt-2 sm:mt-0 sm:ml-auto">
                        {parseInt(resource.size).toFixed(1)} KB
                    </span>
                )}
            </div>
        </li>
    );
};

export default LessonResourceItem;
