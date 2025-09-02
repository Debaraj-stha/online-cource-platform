import React, { lazy, Suspense, useRef, useState } from "react";
import type { Course, } from "../../@types/course";
import StepControlButton from "./StepControlButton";
import StepIndecitor from "./StepIndecitor";

const CreateCourseFAQ = lazy(() => import("./CreateCourseFAQ"));
const CreateCouseResources = lazy(() => import("./CreateCouseResources"));
const CreateCourseTargetAudience = lazy(() => import("./CreateCourseTargetAudience"));
const BookBasicInfoStep = lazy(() => import("./BookBasicInfoStep"));
const BookClassificationStep = lazy(() => import("./BookClassificationStep"));
const CreateCourseModule = lazy(() => import("./CreateCourseModule"));
const CreateCourseTags = lazy(() => import("./CreateCourseTags"));
const CreateCoursePrerequisites = lazy(() => import("./CreateCoursePrerequisites"));
const CreateWhatWillLearn = lazy(() => import("./CreateWhatWillLearn"));

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

  const previewRef = useRef<HTMLDivElement>(null)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (name === "certificate" && type === "file") {
      const files = (e.target as HTMLInputElement).files;
      if (!files || files.length === 0) return
      const img = document.createElement("img")
      img.classList.add("w-full","h-full")
      img.src = URL.createObjectURL(files[0])
      previewRef.current?.appendChild(img)
      const file = files[0]
      setCourse((prev) => ({ ...prev, certificate: file }))
      return

    }
    if (name === "tags" || name === "prerequisites" || name === "whatYouWillLearn") {
      const values = value.split(",").map(t => t.trim())

      setCourse((prev) => ({
        ...prev,
        [name]: values
      }));
      console.log("changing", value)
      return
    }
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
  const goToStep=(step:number)=>setStep(step)

  return (
    <div className="container mt-6 md:mt-14 lg:mt-20 xl:mt-32 bg-gray-900 rounded-xl space-y-6 p-6 text-white">
    
      <h1 className="text-2xl font-bold">Create Course</h1>
        <StepIndecitor steps={10} currentStep={step} onClick={goToStep} />
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
        step == 7 &&
        <div className="space-y-4">
          <Suspense>
            <CreateCourseTags tags={course.tags} handleChange={handleChange} />

          </Suspense>
          <StepControlButton onNext={handleNext} onPrevious={handlePrev} />
        </div>
      }
      {
        step === 8 && <div className="space-y-4">
          <Suspense>
            <CreateCoursePrerequisites handleChange={handleChange} prerequisites={course.prerequisites} />
          </Suspense>
          <StepControlButton onNext={handleNext} onPrevious={handlePrev} />
        </div>
      }
      {
        step === 9 && <div className="space-y-4">
          <Suspense>
            <CreateWhatWillLearn handleChange={handleChange} whatYouWillLearn={course.whatYouWillLearn} selectedCategory="ai-ml" />
          </Suspense>

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
              name="certificate"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
            <p className="mt-2 text-sm text-gray-400">Accepted formats: JPG, PNG (Max size 5MB)</p>
          </div>
          <div ref={previewRef} className="w-96">
          </div>

          <StepControlButton onNext={handleNext} onPrevious={handlePrev} />
        </div>

      }
    </div>
  );
};

export default CreateCourse;
