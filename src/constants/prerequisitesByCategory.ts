import type { Category } from "../@types/course";

export const categoryPrerequisites: Partial<Record<Category, string[]>> = {
  "web-development": ["Basic HTML/CSS", "Basic JavaScript"],
 
  "ai-ml": ["Linear Algebra", "Python programming", "Basic statistics"],
  
  "data-science": ["Python programming", "Statistics", "Mathematics"],
  other: ["Open to learning", "Curiosity"],
};