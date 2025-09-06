import type { Course } from "../@types/course";

export const getCourseFormData = (course: Course,instructor_id:string) => {
  try {
    const formData = new FormData();

    Object.entries(course).forEach(([key, value]) => {
      if (value === undefined || value === null ||value==0) return;
      console.log("key",key,"value",value)

      // File fields
      if (key === "thumbnail" || key === "certificate") {
        if (value instanceof File) {
          console.log("appending file",key)
          formData.append(key, value);
        }
        return;
      }

      // Arrays of strings
      if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
        
        value.forEach((v) => formData.append(`${key}[]`, v));
        return;
      }

      // Objects or arrays of objects → JSON stringify
      if (typeof value === "object") {
        console.log("object pushing",key)
        formData.append(key, JSON.stringify(value));
        return;
      }

      // Primitive values (string, number, boolean)
      formData.append(key, String(value));
    });
    formData.append("instructor",instructor_id)

    return formData;
  } catch (error) {
    console.error("Error building FormData:", error);
    return null;
  }
};
