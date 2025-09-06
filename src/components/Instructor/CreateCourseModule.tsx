import React, { useEffect } from "react";
import Input from "../Input";
import { CgAdd, CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import {
    addDynamicField,
    removeDynamicField,
    updateDynamicField,
} from "../../store/reducers/courseReducer";
import type { Module, Lesson } from "../../@types/course";

const CreateCourseModule = () => {
    const dispatch = useDispatch<AppDispatch>();
    const module = useSelector(
        (state: RootState) => state.course.course.module
    );
    useEffect(()=>{
        addModule()
    },[])

    const addModule = () => {
        console.log("module added")
        dispatch(
            addDynamicField({
                field: "module",
                value: {
                    id: Date.now().toString(),
                    title: "",
                    lessons: [],
                },
            })
        );
    };

    const removeModule = (moduleId: string) => {
        dispatch(removeDynamicField({ field: "module", id: moduleId }));
    };


    const updateModuleName = (moduleId: string, title: string) => {
        dispatch(
            updateDynamicField({
                field: "module",
                id: moduleId,
                value: { title },
            })
        );
    };

    const addLesson = (moduleId: string) => {
        const newLesson: Lesson = {
            id: Date.now().toString(),
            title: "",
            duration: "",
            resources: [],
        };


        const currentModule = module?.find((m: Module) => m.id === moduleId);
        const currentLessons = currentModule?.lessons ?? [];

        dispatch(
            updateDynamicField({
                field: "module",
                id: moduleId,
                value: {
                    lessons: [...currentLessons, newLesson],
                },
            })
        );
    };

    const updateLesson = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        moduleId: string,
        lessonId: string
    ) => {
        const { name, value } = e.target;
        const currentModule = module?.find((m) => m.id === moduleId);
        const currentLessons = currentModule?.lessons ?? [];
        const updatedLessons = currentLessons.map((l) =>
            l.id === lessonId ? { ...l, [name]: value } : l
        );
        dispatch(
            updateDynamicField({
                field: "module",
                id: moduleId,
                value: {
                    lessons: updatedLessons,
                },
            })
        );
    };


    const removeLesson = (moduleId: string, lessonId: string) => {
        const currentModule = module?.find((m) => m.id === moduleId)
        const currentLessons = currentModule?.lessons ?? [];
        dispatch(
            updateDynamicField({
                field: "module",
                id: moduleId,
                value: {
                    lessons: currentLessons.filter((l) => l.id !== lessonId),
                },
            }) as any
        );
    };


    const updateLessonResources = (
        moduleId: string,
        lessonId: string,
        value: string
    ) => {
        const currentModule = module?.find(m => m.id === moduleId)
        const currentLessons = currentModule?.lessons ?? []
        const updatedLessons = currentLessons.map((l) => l.id === lessonId ? { ...l, resources: value.split(",").map((r) => r.trim()) } : l)
        dispatch(updateDynamicField({
            field: "module",
            id: moduleId,
            value: {
                lessons: updatedLessons
            }
        }))

    };

    return (
        <div className="input_section">
            <h2 className="title">Course Modules</h2>

            {(module || []).map((module) => (
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
                                title="Add Lesson"
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
                                    name="title"
                                    placeholder="Lesson title"
                                    value={lesson.title}
                                    extraClass="flex-1 w-full"
                                    textColorClass="text-gray-100"
                                    onChange={(e) => updateLesson(e, module.id, lesson.id)}
                                />
                                <Input
                                    type="text"
                                    name="duration"
                                    placeholder="Lesson duration"
                                    value={lesson.duration}
                                    extraClass="flex-1 w-full"
                                    textColorClass="text-gray-100"
                                    onChange={(e) => updateLesson(e, module.id, lesson.id)}
                                />
                                <Input
                                    type="text"
                                    name="resources"
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
                <CgAdd />
                Add Module
            </button>
        </div>
    );
};

export default CreateCourseModule;
