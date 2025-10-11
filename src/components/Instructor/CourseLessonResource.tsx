import React, { useState } from 'react';
import type { CourseResource, ResourceType } from '../../@types/course';
import Input from '../Input';
import { resourceTypes } from '../../constants/resourceTypes';
import { BsChevronExpand, BsChevronUp } from 'react-icons/bs';
import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateDynamicField } from '../../store/reducers/courseReducer';

interface Props {
  resources: CourseResource[] | [];
  moduleId: string;
  lessonId: string;
}

const CourseLessonResource = ({ resources, moduleId, lessonId }: Props) => {
  // track collapsed state by index
  const [collapsed, setCollapsed] = useState<{ [key: number]: boolean }>({});

  //hide all resources by default
  React.useEffect(() => {
    const initialCollapsedState: { [key: number]: boolean } = {};
    resources.forEach((_, index) => {
      initialCollapsedState[index] = true; // all collapsed initially
    });
    setCollapsed(initialCollapsedState);
  }, [resources]);


  const dispatch = useDispatch<AppDispatch>();
  const module = useSelector(
    (state: RootState) => state.course.course.module
  );


  const toggleCollapse = (index: number) => {
    setCollapsed((prev) => ({ ...prev, [index]: !prev[index] }));
  };


  const updateFieldValue = (index: number, name: string, value: string) => {
    const currentModule = module?.find(m => m.id === moduleId)
    const currentLessons = currentModule?.lessons ?? []
    const currentResources = currentLessons.find(l => l.id === lessonId)?.resources ?? []
    const updatedResource = currentResources.map((r, i) => i === index ? { ...r, [name]: value } : r)
    // Dispatch the action to update the resources of the specific lesson in the specific module
    const updatedLessons = currentLessons.map((l) => l.id === lessonId ? { ...l, resources: updatedResource } : l)
    dispatch(updateDynamicField({
      field: "module",
      id: moduleId,
      value: {
        lessons: updatedLessons
      }
    }))
  }


  const updateLessonResources = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target
    updateFieldValue(index, name, value)
  }

  const allowedTypes=["document","code","link","other"]


  return (
    <div className="space-y-4">
      {/* not rendering audio,video and image resources here,we will handle it differently */}
      {resources.filter((r)=>allowedTypes.includes(r.type)).map((resource, index) => {
        const isCollapsed = collapsed[index];
        return (
          <div
            key={index}
            className="border border-gray-700 rounded-lg p-4 bg-gray-800/60 transition-all"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-gray-100">
                Resource {index + 1}
              </h3>
              <button
                type="button"
                title={isCollapsed ? 'Expand' : 'Collapse'}
                onClick={() => toggleCollapse(index)}
                className="text-gray-300 hover:text-white transition"
              >
                {isCollapsed ? <BsChevronExpand size={20} /> : <BsChevronUp size={20} />}
              </button>
            </div>

            {/* Collapsible content */}
            {!isCollapsed && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-7 animate-fadeIn">
                <Input
                  label="URL"
                  type="text"
                  name="url"
                  placeholder="Lesson resources"
                  value={resource.url}
                  extraClass="flex-1 w-full"
                  textColorClass="text-gray-100"
                  required
                  onChange={(e) => updateLessonResources(e, index)}
                />
                <Input
                  label="Thumbnail (Optional)"
                  type="text"
                  name="thumbnail"
                  placeholder="Thumbnail URL"
                  value={resource.thumbnail}
                  extraClass="flex-1 w-full"
                  textColorClass="text-gray-100"
                  onChange={(e) => updateLessonResources(e, index)}
                />
                <Input
                  label="Description (Optional)"
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={resource.description}
                  extraClass="flex-1 w-full"
                  isTextArea
                  textColorClass="text-gray-100"
                  onChange={(e) => updateLessonResources(e, index)}
                />
                <div>
                  <label htmlFor={`type-${index}`} className="block mb-1 text-gray-200">
                    Type
                  </label>
                  <select
                    id={`type-${index}`}
                    className="w-full p-2 rounded bg-gray-700 text-gray-100"
                    defaultValue={resource.type}
                    name="type"
                    onChange={(e) => {
                      updateFieldValue(index, "type", e.target.value)
                    }}
                  >
                    {resourceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseLessonResource;
