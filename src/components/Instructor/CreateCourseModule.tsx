import React, { useEffect, useState } from "react";
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
import CourseLessonResource from "./CourseLessonResource";
import { BsChevronUp, BsChevronExpand } from "react-icons/bs";


interface Props {
    isEditMode?: boolean
}

const CreateCourseModule = ({ isEditMode = false }: Props) => {
    const [isCollapsed, setCollapsed] = useState<{ [key: number]: boolean }>({})

    const dispatch = useDispatch<AppDispatch>();
    const module = useSelector(
        (state: RootState) => state.course.course.module
    );


    useEffect(() => {
        addModule()
    }, [])

    //collapsed modules by default in editmode
    useEffect(() => {
        if (isEditMode && module?.length) {
            const moduleIndex: { [key: number]: boolean } = {};
            module.forEach((_, index) => (moduleIndex[index] = true));
            setCollapsed(moduleIndex);
        }
    }, [isEditMode, module]);

    const toggleCollapse = (index: number) => {
        setCollapsed((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

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




    return (
        <div className="input_section">
            <h2 className="title">Course Modules</h2>

            {(module || []).map((module, index) => {
                const collapsed = isCollapsed[index];
                return (
                    <div
                        key={module.id}
                        className="border border-gray-700 p-4 rounded space-y-4 group transition-all duration-300"
                    >
                        {/* Module Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-center gap-2 w-full">

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
                                <button
                                    type="button"
                                    title={collapsed ? "Expand" : "Collapse"}
                                    onClick={() => toggleCollapse(index)}
                                    className="text-gray-300 hover:text-white transition"
                                >
                                    {collapsed ? <BsChevronExpand /> : <BsChevronUp />}
                                </button>
                            </div>

                            <div className="hidden group-hover:flex gap-2">
                                <button
                                    type="button"
                                    title="Add Lesson"
                                    className="primary-button"
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

                        {/* Collapsible Section */}
                        {!collapsed && (
                            <div className="space-y-2 pl-6 grid grid-cols-1 gap-4">
                                {module.lessons.map((lesson) => (
                                    <div
                                        key={lesson.id}
                                        className="flex flex-wrap gap-2 items-center border border-gray-700 p-3 rounded-md"
                                    >
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

                                        <div className="w-full space-y-3">
                                            <h3>Course Resources</h3>
                                            <CourseLessonResource
                                                resources={lesson.resources ?? []}
                                                lessonId={lesson.id}
                                                moduleId={module.id}
                                            />
                                        </div>

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
                        )}
                    </div>
                );
            })}

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
