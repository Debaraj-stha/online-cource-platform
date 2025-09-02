import type { Category } from "../@types/course";

export const categoryTags: Record<Category, string[]> = {
  "web-development": ["HTML", "CSS", "JavaScript", "React", "Next.js", "Node.js"],
  design: ["UI/UX", "Figma", "Photoshop", "Illustrator", "Prototyping"],
  "ai-ml": ["Machine Learning", "Deep Learning", "Neural Networks", "NLP", "TensorFlow"],
  business: ["Entrepreneurship", "Finance", "Management", "Strategy", "Startups"],
  marketing: ["SEO", "Social Media", "Content Marketing", "Advertising", "Branding"],
  "data-science": ["Python", "Pandas", "Data Visualization", "Statistics", "Big Data"],
  "personal-development": ["Productivity", "Mindfulness", "Communication", "Time Management"],
  "app development": ["Android", "iOS", "Flutter", "React Native", "Swift"],
  "software development": ["C++", "Java", "Software Architecture", "Agile", "Testing"],
  leadership: ["Team Management", "Decision Making", "Coaching", "Conflict Resolution"],
  other: ["General", "Miscellaneous", "Beginner", "Advanced"],
};