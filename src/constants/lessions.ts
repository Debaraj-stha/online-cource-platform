import type { Module } from "../@types/course";

export const webDevModules: Module[] = [
  {
    id: "mod-1",
    title: "Introduction & Setup",
    lessons: [
      { id: "l1", title: "Welcome & Course Overview", duration: "5m", },
      { id: "l2", title: "Installing VS Code & Node.js", duration: "12m" },
      { id: "l3", title: "Project Setup", duration: "8m" }
    ]
  },
  {
    id: "mod-2",
    title: "Frontend Basics",
    lessons: [
      { id: "l4", title: "HTML & Semantic Structure", duration: "15m" },
      { id: "l5", title: "CSS Styling Essentials", duration: "20m" },
      { id: "l6", title: "JavaScript Basics", duration: "30m" }
    ]
  },
  {
    id: "mod-3",
    title: "Backend with Node.js",
    lessons: [
      { id: "l7", title: "Intro to Node.js & NPM", duration: "10m" },
      { id: "l8", title: "Express.js Basics", duration: "25m" },
      { id: "l9", title: "Connecting MongoDB", duration: "35m" }
    ]
  },
  {
    id: "mod-4",
    title: "Final Project",
    lessons: [
      { id: "l10", title: "Project Overview", duration: "7m" },
      { id: "l11", title: "Building the App", duration: "40m" },
      { id: "l12", title: "Deployment & Wrap Up", duration: "15m" }
    ]
  }
];
