import type { Category } from "../@types/course";

export const categoryTags: Record<Category, string[]> = {
  "web-development": ["HTML", "CSS", "JavaScript", "React", "Next.js", "Node.js"],
 
  "ai-ml": ["Machine Learning", "Deep Learning", "Neural Networks", "NLP", "TensorFlow"],
 
  "data-science": ["Python", "Pandas", "Data Visualization", "Statistics", "Big Data"],

  other: ["General", "Miscellaneous", "Beginner", "Advanced"],
};