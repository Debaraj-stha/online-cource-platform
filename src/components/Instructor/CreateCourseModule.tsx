import React, { useState } from "react";
import Input from "../Input";
import { CgAdd, CgClose } from "react-icons/cg";
import type { Module } from "../../@types/course";


const CreateCourseModule
 = () => {
    const [modules, setModules] = useState<Module[]>([
        {
            id: Date.now().toString(), title: "", lessons: [
                { id: Date.now().toString(), title: "", duration: "", resources: [] }
            ],
        },
    ]);

    const addModule = () => {
        setModules((prev: Module[]) => [
            ...prev,
            { id: Date.now().toString(), title: "", lessons: [], },
        ]);
    };

    const removeModule = (moduleId: string) => {
        setModules((prev) => prev.filter((m) => m.id !== moduleId));
    };

    const updateModuleName = (moduleId: string, title: string) => {
        setModules((prev) =>
            prev.map((m) => (m.id === moduleId ? { ...m, title } : m))
        );
    };

    const addLesson = (moduleId: string) => {
        setModules((prev: Module[]) =>
            prev.map((m) =>
                m.id === moduleId
                    ? {
                        ...m,
                        lessons: [
                            ...m.lessons,
                            { id: Date.now().toString(), title: "", duration: "", resources: [] },
                        ],
                    }
                    : m
            )
        );
    };

    const updateLesson = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, moduleId: string, lessonId: string) => {
        const { name, value } = e.target
        setModules((prev) =>
            prev.map((m) =>
                m.id === moduleId
                    ? {
                        ...m,
                        lessons: m.lessons.map((l) =>
                            l.id === lessonId ? { ...l, [name]: value } : l
                        ),
                    }
                    : m
            )
        );
    };

    const removeLesson = (moduleId: string, lessonId: string) => {
        setModules((prev) =>
            prev.map((m) =>
                m.id === moduleId
                    ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
                    : m
            )
        );
    };
    const updateLessonResources = (
        moduleId: string,
        lessonId: string,
        value: string
    ) => {
        setModules((prevModules) =>
            prevModules.map((mod) =>
                mod.id === moduleId
                    ? {
                        ...mod,
                        lessons: mod.lessons.map((les) =>
                            les.id === lessonId
                                ? { ...les, resources: value.split(",").map((r) => r.trim()) }
                                : les
                        ),
                    }
                    : mod
            )
        );
    };


    return (
        <div className="input_section">
            <h2 className="title">Course Module</h2>
            {modules.map((module) => (
                <div
                    key={module.id}
                    className="border border-gray-700 p-4 rounded space-y-4 group"
                >
                    {/* Module Name */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <Input
                            type="text"
                            name={`module-${module.id}`}
                            label="Module Name"
                            placeholder="Module name"
                            value={module.title}
                            outerExtraClass="flex-1 w-full"
                            textColorClass="text-gray-100"
                            onChange={(e) => updateModuleName(module.id, e.target.value)}
                        />

                        <div className="hidden group-hover:flex gap-2">
                            <button
                                type="button"
                                title="Add Lession"
                                className="primary-button inline-block"
                                onClick={() => addLesson(module.id)}
                            >
                                <CgAdd />
                            </button>
                            <button
                                type="button"
                                title="Remove Module"
                                className="danger-button"
                                onClick={() => removeModule(module.id)}
                            >
                                <CgClose />
                            </button>
                        </div>
                    </div>

                    {/* Lessons */}
                    <div className="space-y-2 pl-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {module.lessons.map((lesson) => (
                            <div key={lesson.id} className="flex gap-2 items-center">
                                <Input
                                    type="text"
                                    name={`title`}
                                    placeholder="Lesson title"
                                    value={lesson.title}
                                    extraClass="flex-1 w-full"
                                    textColorClass="text-gray-100"
                                    onChange={(e) =>
                                        updateLesson(e, module.id, lesson.id)
                                    }
                                />
                                <Input
                                    type="text"
                                    name={`duration`}
                                    placeholder="Lesson duration"
                                    value={lesson.duration}
                                    extraClass="flex-1 w-full"
                                    textColorClass="text-gray-100"
                                    onChange={(e) =>
                                        updateLesson(e, module.id, lesson.id)
                                    }
                                />
                                <Input
                                    type="text"
                                    name={`resources`}
                                    placeholder="Lesson resources"
                                    value={lesson.resources ? lesson.resources.join(",") : ""}
                                    extraClass="flex-1 w-full"
                                    textColorClass="text-gray-100"
                                    onChange={(e) =>
                                        updateLessonResources(module.id, lesson.id, e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    title="Remove lesson"
                                    className="danger-button"
                                    onClick={() => removeLesson(module.id, lesson.id)}
                                >
                                    <CgClose />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <button
                type="button"
                className="primary-button flex items-center gap-2"
                onClick={addModule}
            >
                <CgAdd /> Add Module
            </button>
        </div>
    );
};

export default CreateCourseModule
;
