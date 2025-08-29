import type { CourseResource } from "../@types/course";

export const resources: CourseResource[] = [
  {
    id: "res1",
    courseId: "web-dev-101",
    title: "HTML & CSS Cheatsheet",
    type: "pdf",
    url: "/resources/html-css-cheatsheet.pdf",
    size: "1.2MB",
    description: "Quick reference for HTML & CSS",
  },
  {
    id: "res2",
    courseId: "web-dev-101",
    title: "Sample Project Code",
    type: "code",
    url: "/resources/fullstack-project.zip",
    size: "8MB",
    description: "Starter project files for exercises",
  },
  {
    id: "res3",
    courseId: "web-dev-101",
    title: "Supplemental Video",
    type: "video",
    url: "https://cdn.example.com/videos/bonus-lesson.mp4",
    size: "200MB",
  },
  {
    id: "res4",
    courseId: "web-dev-101",
    title: "External Reference",
    type: "link",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    description: "MDN HTML documentation",
  },
];
