import React, { lazy, Suspense, useState } from "react";
import type { Course, } from "../../@types/course";
import Input from "../Input";
import StepControlButton from "./StepControlButton";

const CreateCourseFAQ = lazy(() => import("./CreateCourseFAQ"));
const CreateCouseResources = lazy(() => import("./CreateCouseResources"));
const CreateCourseTargetAudience = lazy(() => import("./CreateCourseTargetAudience"));
const BookBasicInfoStep = lazy(() => import("./BookBasicInfoStep"));
const BookClassificationStep = lazy(() => import("./BookClassificationStep"));
const CreateCourseModule = lazy(() => import("./CreateCourseModule"));

const CreateCourse = () => {
  const [course, setCourse] = useState<Partial<Course>>({
    title: "",
    description: "",
    price: 0,
    discount: 0,
    isFree: false,
    category: null,
    level: null,
    language: "english",
    faq: [],
    module: [],
    tags: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Course:", course);
    // TODO: send to backend (Firebase/Firestore/REST API)
  };
  const [step, setStep] = useState(1)
  const handleNext = () => setStep((prev) => prev + 1)
  const handlePrev = () => setStep(prev => prev - 1)

  return (
    <div className="container mt-6 md:mt-14 lg:mt-20 xl:mt-32 bg-gray-900 rounded-xl space-y-6 p-6 text-white">
      <h1 className="text-2xl font-bold">Create Course</h1>
      {
        step === 1 && <Suspense>
          <BookBasicInfoStep course={course} handleChange={handleChange} handleNext={handleNext} />
        </Suspense>

      }
      {
        step === 2 && <Suspense>
          <BookClassificationStep onNext={handleNext} onPrevious={handlePrev} />
        </Suspense>
      }
      {
        step == 3 && <div className="space-y-4">
          <Suspense>
            <CreateCourseModule />
          </Suspense>
          <StepControlButton onNext={handleNext} onPrevious={handlePrev} />
        </div>
      }
      {
        step == 4 && <div className="space-y-4">
          <Suspense>
            <CreateCourseFAQ />
          </Suspense>
          <StepControlButton onNext={handleNext} onPrevious={handlePrev} />
        </div>
      }
      {
        step == 5 && <div className="space-y-4">
          <Suspense>
            <CreateCouseResources />
          </Suspense>
          <StepControlButton onNext={handleNext} onPrevious={handlePrev} />
        </div>
      }
      {
        step == 6 && <div className="space-y-4">
          <Suspense>
            <CreateCourseTargetAudience />
          </Suspense>
          <StepControlButton onNext={handleNext} onPrevious={handlePrev} />
        </div>
      }
      {
        step == 7 && <div className="space-y-4">
          <Input
            type="text"
            name="tags"
            label="Tags"
            value={course.tags?.join(",") || ""}
            onChange={handleChange}
            placeholder="Tags"
            textColorClass="text-gray-100"
          />

          <StepControlButton onNext={handleNext} onPrevious={handlePrev} />
        </div>
      }
      {
        step === 8 && <div className="space-y-4">
          <h2 className="title">Prequisites</h2>
          <Input
            type="text"
            value=""
            name="prerequisites"
            onChange={handleChange}
            isTextArea={true}
            placeholder="Prerequisites"
          />

          <StepControlButton onNext={handleNext} onPrevious={handlePrev} />
        </div>
      }
      {
        step === 9 && <div className="space-y-4">
          <h2 className="title">What you will learn?</h2>
          <Input
            type="text"
            value=""
            isTextArea={true}
            name="whatYouWillLearn"
            onChange={handleChange}
            placeholder="What you will learn?"
          />

          <StepControlButton onNext={handleNext} onPrevious={handlePrev} />
        </div>
      }

      {
        step === 10 && <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-200">Certificate</h2>

          <div className="flex flex-col items-start">
            <label
              htmlFor="certificates"
              className="flex items-center gap-2 cursor-pointer border border-gray-600 rounded-lg px-4 py-3 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition"
            >
              <span className="text-2xl">+</span>
              <span>Upload Certificate</span>
            </label>
            <input
              id="certificates"
              type="file"
              name="certificates"
              accept="image/*"
              className="hidden"
            />
            <p className="mt-2 text-sm text-gray-400">Accepted formats: JPG, PNG (Max size 5MB)</p>
          </div>

          <StepControlButton onNext={handleNext} onPrevious={handlePrev} />
        </div>

      }
    </div>
  );
};

export default CreateCourse;
