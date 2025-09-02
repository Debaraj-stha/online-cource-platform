import type { Category } from "../@types/course";


export const categoryLearningPoints: Record<Category, string[]> = {
  "web-development": [
    "Build responsive websites with HTML, CSS, and JS",
    "Learn React and Next.js for dynamic web apps",
    "Connect front-end with back-end APIs",
    "Understand deployment and hosting"
  ],
  design: [
    "Create professional UI/UX designs",
    "Use Figma and Adobe XD effectively",
    "Understand color theory and typography",
    "Prototype interactive designs"
  ],
  "ai-ml": [
    "Implement machine learning models with Python",
    "Understand deep learning and neural networks",
    "Work with real-world datasets",
    "Learn natural language processing and computer vision basics"
  ],
  business: [
    "Develop business strategies",
    "Understand financial planning",
    "Learn project management basics",
    "Build entrepreneurial skills"
  ],
  marketing: [
    "Learn SEO and digital marketing strategies",
    "Run social media campaigns",
    "Create content that converts",
    "Analyze marketing metrics and KPIs"
  ],
  "data-science": [
    "Analyze data using Python and Pandas",
    "Visualize data effectively",
    "Understand statistics for data science",
    "Work with large datasets and SQL"
  ],
  "personal-development": [
    "Improve productivity and time management",
    "Develop mindfulness and focus",
    "Enhance communication skills",
    "Set and achieve personal goals"
  ],
  "app development": [
    "Build Android and iOS apps",
    "Learn Flutter or React Native",
    "Connect apps to APIs",
    "Deploy apps to app stores"
  ],
  "software development": [
    "Master programming languages like Java or C++",
    "Understand software architecture and design patterns",
    "Practice Agile and version control",
    "Write and test clean code"
  ],
  leadership: [
    "Develop team management skills",
    "Learn decision-making techniques",
    "Handle conflicts effectively",
    "Motivate and inspire others"
  ],
  other: [
    "Gain general knowledge",
    "Learn skills applicable to multiple fields",
    "Explore beginner and advanced topics",
    "Develop lifelong learning habits"
  ]
}
