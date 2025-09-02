import React from 'react'
import Input from '../Input'
import type { Course } from '../../@types/course'

const BookBasicInfoStep = ({course,handleChange,handleNext}:{course:Partial<Course>,handleChange:(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>void,handleNext:()=>void}) => {
    return (
        <div className="space-y-6">
            {/* Basic Info */}

            <Input
                type="text"
                name="title"
                label="Title"
                value={course.title || ""}
                onChange={handleChange}
                placeholder="Enter course title"
                required={true}
                textColorClass="text-gray-100"
            />

            <Input
                name="description"
                value={course.description || ""}
                onChange={handleChange}
                label="Description"
                placeholder="Brief description of the course"
                required={true}
                isTextArea={true}
                textColorClass="text-gray-100"
            />


            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols lg:grid-cols-3 gap-4">
                <Input
                    type="number"
                    name="price"
                    label="Price($)"
                    value={course.price?.toString() || ""}
                    onChange={handleChange}
                    placeholder="Course price ($)"
                    textColorClass="text-gray-100"
                    required={true}
                />
                <Input
                    type="number"
                    name="discount"
                    label="Discount"
                    value={course.discount?.toString() || ""}
                    onChange={handleChange}
                    placeholder="Discount (Optional)"
                    textColorClass="text-gray-100"
                />
                <Input
                    type="text"
                    name="discount-reason"
                    label="Discoun Reason"
                    value={course.discountReason?.toString() || ""}
                    onChange={handleChange}
                    placeholder="Discount reason(Optional)"
                    textColorClass="text-gray-100"
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="isFree"
                    checked={course.isFree || false}
                    onChange={handleChange}
                />
                <label>Mark as Free</label>
            </div>

            <div>
                <label className="block text-sm">Thumbnail</label>
                <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    className="w-full p-2 rounded border border-gray-700"
                />
            </div>




            <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition"
            >
                Next
            </button>
        </div>
    )
}

export default BookBasicInfoStep
