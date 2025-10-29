import type { Category } from "../@types/course";


export const categoryLearningPoints: Record<Partial<Category>, string[]> = {
  "web-development": [
    "Build responsive websites with HTML, CSS, and JS",
    "Learn React and Next.js for dynamic web apps",
    "Connect front-end with back-end APIs",
    "Understand deployment and hosting"
  ],
  
  "ai-ml": [
    "Implement machine learning models with Python",
    "Understand deep learning and neural networks",
    "Work with real-world datasets",
    "Learn natural language processing and computer vision basics"
  ],
 
  "data-science": [
    "Analyze data using Python and Pandas",
    "Visualize data effectively",
    "Understand statistics for data science",
    "Work with large datasets and SQL"
  ],


  "other": [
    "Gain general knowledge",
    "Learn skills applicable to multiple fields",
    "Explore beginner and advanced topics",
    "Develop lifelong learning habits"
  ]
}
