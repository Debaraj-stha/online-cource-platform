import type { Category, Course, Language, Level } from "../@types/course"
import { faqs } from "./courseFaq";
import { instructors } from "./instructors";
import { webDevModules } from "./lessions";
import { resources } from "./resources";
import { targetAudience } from "./targetAudiences";

// constants/categories.ts
export const categories: Category[] = [
  "web-development",
  "design",
  "ai-ml",
  "business",
  "marketing",
  "data-science",
  "personal-development",
  "app development",
  "software development",
  "leadership",
  "other"
]

// constants/levels.ts
export const levels: Level[] = ["beginner", "intermediate", "advanced"]

// constants/languages.ts
export const languages: Language[] = [
  "english", "nepali", "hindi", "other"
]
export const popularCourses: Course[] = [
  {
    id: 'web-dev-101',
    title: 'Full-Stack Web Development',
    instructor: instructors[0],
    description:
      'Master HTML, CSS, JavaScript, and backend technologies like Node.js and MongoDB to become a full-stack developer.',
    thumbnail:
      'https://img.freepik.com/free-vector/teaching-students-online-internet-learning-computer-programming-online-it-courses-best-online-it-training-online-certification-courses-concept_335657-194.jpg',
    price: 59.99,
    rating: 4.7,
    totalEnrolled: 1820,
    duration: '5h 30m',
    level: 'intermediate',
    language: 'english',
    lessonCount: 42,
    category: 'web-development',
    prerequisites: ['Basic HTML & CSS knowledge', 'Basic computer literacy'],
    whatYouWillLearn: [
      'Build responsive websites',
      'Use JavaScript to add interactivity',
      'Work with Node.js & Express backend',
      'Manage databases with MongoDB',
    ],
    resources: resources,
    certificateAvailable: true,
    createdAt: '2025-07-01',
    updatedAt: '2025-08-01',
    isPublished: true,
    publishedAt: '2025-07-05',
    tags: ['frontend', 'backend', 'mongodb', 'javascript'],
    module: webDevModules,
    faq: faqs,
    preview: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    targetedAudiences: targetAudience,
    certificate: {
      title: "Certificate of Completion",
      issuer: "LearnHub Academy",
      imageUrl: "https://img.freepik.com/premium-photo/classy-design-achievement-certificate-template_53876-1081611.jpg",
      description: "Receive a shareable Certificate of Completion to showcase on LinkedIn and your resume."
    }

  },
  {
    id: 'react-advanced',
    title: 'Advanced React & Redux',
    instructor: { name: 'Will Smith', email: null, phone: null, profile: null },
    description:
      'Build scalable frontend apps using React, Redux Toolkit, RTK Query, and performance best practices.',
    thumbnail:
      'https://img.freepik.com/free-vector/creative-abstract-quantum-illustration_23-2149236239.jpg',
    price: 49.99,
    rating: 4.8,
    totalEnrolled: 1450,
    duration: '7h 45m',
    level: 'advanced',
    language: 'english',
    lessonCount: 38,
    category: 'web-development',
    prerequisites: ['Good understanding of React basics', 'JavaScript ES6+'],
    whatYouWillLearn: [
      'Optimize React apps for performance',
      'State management with Redux Toolkit',
      'Integrate APIs with RTK Query',
      'Best practices for large React apps',
    ],
    resources: resources,
    certificateAvailable: true,
    tags: ['react', 'redux', 'frontend'],
    module: webDevModules,
    faq: faqs,
    preview: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    targetedAudiences: targetAudience
  },
  {
    id: 'python-beginner',
    title: 'Python for Beginners',
    instructor: { name: 'Ajay Rana', email: null, phone: null, profile: null },
    description:
      'A beginner-friendly course to learn Python programming, automation, and basic data handling.',
    thumbnail:
      'https://img.freepik.com/free-vector/programming-languages-learning-software-coding-courses-website-development-class-script-writing-it-programmers-cartoon-characters_335657-789.jpg',
    price: 39.99,
    rating: 4.6,
    totalEnrolled: 2100,
    duration: '6h',
    level: 'beginner',
    language: 'english',
    lessonCount: 50,
    category: 'software development',
    prerequisites: ['No prior programming required'],
    whatYouWillLearn: [
      'Install and set up Python',
      'Write Python scripts',
      'Automate tasks with Python',
      'Basic file handling & data structures',
    ],
    certificateAvailable: true,
    tags: ['python', 'automation', 'beginners'],
    module: webDevModules,
    resources: resources,
    faq: faqs
  },
  {
    id: 'data-science-bootcamp',
    title: 'Data Science Bootcamp',
    instructor: { name: 'John Abharam', email: null, phone: null, profile: null },
    description:
      'Dive into data analysis, visualization, machine learning, and real-world projects using Python and Pandas.',
    thumbnail:
      'https://img.freepik.com/premium-vector/science-research-modern-flat-concept-web-banner-design-woman-scientist-researches-atomic_9209-8343.jpg',
    price: 79.99,
    rating: 4.9,
    totalEnrolled: 1320,
    duration: '10h',
    level: 'advanced',
    language: 'english',
    lessonCount: 60,
    category: 'data-science',
    prerequisites: ['Basic Python knowledge', 'High-school level math'],
    whatYouWillLearn: [
      'Work with Pandas & Numpy',
      'Visualize data with Matplotlib & Seaborn',
      'Apply machine learning with Scikit-learn',
      'Build real-world projects',
    ],
    certificateAvailable: true,
    tags: ['data-science', 'machine-learning', 'python'],
    module: webDevModules,
    resources,
    faq: faqs
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Masterclass',
    instructor: { name: 'Bikky', email: null, phone: null, profile: null },
    description:
      'Learn user research, wireframing, Figma prototyping, and UI design best practices from scratch.',
    thumbnail:
      'https://img.freepik.com/free-vector/young-person-learning-courses-online_23-2148522854.jpg',
    price: 44.99,
    rating: 4.5,
    totalEnrolled: 980,
    duration: '8h 20m',
    level: 'beginner',
    language: 'english',
    lessonCount: 35,
    category: 'design',
    prerequisites: ['No prior design experience needed'],
    whatYouWillLearn: [
      'Understand UX principles',
      'Conduct user research',
      'Design wireframes & prototypes in Figma',
      'Apply UI design best practices',
    ],
    certificateAvailable: true,
    tags: ['ui', 'ux', 'figma', 'design'],
    module: webDevModules,
    resources,
    faq: faqs
  },
  {
    id: 'node-express-api',
    title: 'Node.js & Express API Development',
    instructor: { name: 'Alex', email: null, phone: null, profile: null },
    description:
      'Learn to build RESTful APIs using Node.js, Express, and MongoDB with proper authentication & testing.',
    thumbnail:
      'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149057633.jpg',
    price: 54.99,
    rating: 4.7,
    totalEnrolled: 1140,
    duration: '9h',
    level: 'intermediate',
    language: 'english',
    lessonCount: 40,
    category: 'software development',
    prerequisites: ['Basic JavaScript knowledge'],
    whatYouWillLearn: [
      'Set up Node.js projects',
      'Build REST APIs with Express',
      'Use MongoDB for database management',
      'Implement authentication & testing',
    ],
    certificateAvailable: true,
    tags: ['node', 'express', 'api'],
    module: webDevModules,
    resources,
    faq: faqs
  },
  {
    id: 'node-js-crash',
    title: 'Node.js Crash Course',
    instructor: { name: 'Alex', email: null, phone: null, profile: null },
    description:
      'A beginner-friendly crash course to learn Node.js, Express, and MongoDB basics quickly.',
    thumbnail:
      'https://img.freepik.com/free-vector/programmers-using-javascript-programming-language-computer-tiny-people-javascript-language-javascript-engine-js-web-development-concept-bright-vibrant-violet-isolated-illustration_335657-986.jpg',
    price: 54.99,
    rating: 4.7,
    totalEnrolled: 1140,
    duration: '10h',
    level: 'beginner',
    language: 'nepali',
    lessonCount: 25,
    category: 'web-development',
    prerequisites: ['Basic programming knowledge'],
    whatYouWillLearn: [
      'Introduction to Node.js',
      'Build simple APIs',
      'Work with Express framework',
      'Store data in MongoDB',
    ],
    certificateAvailable: false,
    tags: ['node', 'express', 'mongodb'],
    module: webDevModules,
    resources,
    faq: faqs
  },
  {
    id: 'frontend-developement',
    title: 'Frontend Development',
    instructor: { name: 'Alex', email: null, phone: null, profile: null },
    description:
      'Learn HTML, CSS, JavaScript and modern frontend workflows to create responsive websites.',
    thumbnail:
      'https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg',
    price: 54.99,
    rating: 4.7,
    totalEnrolled: 1140,
    duration: '12h',
    level: 'beginner',
    language: 'english',
    lessonCount: 48,
    category: 'web-development',
    prerequisites: ['Basic computer literacy'],
    whatYouWillLearn: [
      'Understand HTML & CSS fundamentals',
      'Build responsive layouts',
      'Use JavaScript for interactivity',
      'Intro to modern frontend tools',
    ],
    certificateAvailable: true,
    tags: ['frontend', 'html', 'css', 'javascript'],
    module: webDevModules,
    resources,
    faq: faqs
  },
];

export const similarCourses = [...popularCourses]