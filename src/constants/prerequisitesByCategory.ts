import type { Category } from "../@types/course";

export const categoryPrerequisites: Record<Category, string[]> = {
  "web-development": ["Basic HTML/CSS", "Basic JavaScript"],
  design: ["Basic drawing skills", "Familiarity with design tools"],
  "ai-ml": ["Linear Algebra", "Python programming", "Basic statistics"],
  business: ["Basic business knowledge", "Financial literacy"],
  marketing: ["Understanding of social media", "Basic marketing concepts"],
  "data-science": ["Python programming", "Statistics", "Mathematics"],
  "personal-development": ["Motivation to learn", "Self-reflection skills"],
  "app development": ["Basic programming", "Understanding of mobile platforms"],
  "software development": ["Basic programming", "Problem-solving skills"],
  leadership: ["Communication skills", "Teamwork experience"],
  other: ["Open to learning", "Curiosity"],
};