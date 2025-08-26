import type { Course } from "../@types/course";

export const features = [
  {
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience. Our instructors are handpicked for their expertise and teaching skills.",
    icon: "🎓", // You can replace with actual icon component if needed
  },
  {
    title: "Flexible Learning",
    description: "Access courses anytime, anywhere. Learn at your own pace with lifetime access to all your enrolled courses.",
    icon: "⏰",
  },
  {
    title: "Interactive Quizzes",
    description: "Test your knowledge with quizzes after every module to reinforce learning and track your progress.",
    icon: "✅",
  },
  {
    title: "Certificates of Completion",
    description: "Earn certificates for every course you complete to showcase your skills and enhance your resume.",
    icon: "📜",
  },
  {
    title: "Community Support",
    description: "Join a community of learners and instructors. Ask questions, get answers, and collaborate via our Q&A and discussion boards.",
    icon: "💬",
  },
  {
    title: "Secure Payments",
    description: "Pay confidently with secure payment options like Stripe and PayPal. Your data is always protected.",
    icon: "🔒",
  }
];
export const popularCourses: Course[] = [
  {
    id: 'web-dev-101',
    title: 'Full-Stack Web Development',
    instructor: {
      name: 'John Doe',
      email: null,
      phone: null,
      profile: null
    },
    description: 'Master HTML, CSS, JavaScript, and backend technologies like Node.js and MongoDB to become a full-stack developer.',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 59.99,
    rating: 4.7,
    totalEnrolled: 1820,
    duration:"5 hours",
    level:"intermediate",
    language:"english"
  },
  {
    id: 'react-advanced',
    title: 'Advanced React & Redux',
    instructor: {
      name: 'Will Smith',
      email: null,
      phone: null,
      profile: null
    },
    description: 'Build scalable frontend apps using React, Redux Toolkit, RTK Query, and performance best practices.',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 49.99,
    rating: 4.8,
    totalEnrolled: 1450,
  },
  {
    id: 'python-beginner',
    title: 'Python for Beginners',
    instructor: {
      name: 'Ajay Rana',
      email: null,
      phone: null,
      profile: null
    },
    description: 'A beginner-friendly course to learn Python programming, automation, and basic data handling.',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 39.99,
    rating: 4.6,
    totalEnrolled: 2100,
  },
  {
    id: 'data-science-bootcamp',
    title: 'Data Science Bootcamp',
    instructor: {
      name: 'John Abharam',
      email: null,
      phone: null,
      profile: null
    },
    description: 'Dive into data analysis, visualization, machine learning, and real-world projects using Python and Pandas.',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 79.99,
    rating: 4.9,
    totalEnrolled: 1320,
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Masterclass',
    instructor: {
      name: 'Bikky',
      email: null,
      phone: null,
      profile: null
    },
    description: 'Learn user research, wireframing, Figma prototyping, and UI design best practices from scratch.',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 44.99,
    rating: 4.5,
    totalEnrolled: 980,
  },
  {
    id: 'node-express-api',
    title: 'Node.js & Express API Development',
    instructor: {
      name: 'Alex',
      email: null,
      phone: null,
      profile: null
    },
    description: 'Learn to build RESTful APIs using Node.js, Express, and MongoDB with proper authentication & testing.',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 54.99,
    rating: 4.7,
    totalEnrolled: 1140,
  },
    {
    id: 'node-js-crash',
    title: 'Node.js crash course',
    instructor: {
      name: 'Alex',
      email: null,
      phone: null,
      profile: null
    },
    description: 'Learn to build RESTful APIs using Node.js, Express, and MongoDB with proper authentication & testing.',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 54.99,
    rating: 4.7,
    totalEnrolled: 1140,
    duration:"10 hours",
    level:"beginner",
    language:"nepali"
  },
    {
    id: 'frontend-developement',
    title: 'frontend developmenet',
    instructor: {
      name: 'Alex',
      email: null,
      phone: null,
      profile: null
    },
    description: 'Learn to build RESTful APIs using Node.js, Express, and MongoDB with proper authentication & testing.',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 54.99,
    rating: 4.7,
    totalEnrolled: 1140,
  }
];


export const testimonials = [
  {
    name: "Anjali K.",
    title: "Software Engineer at TechWorx",
    message:
      "This platform has completely transformed the way I learn! The instructors are top-notch and the content is up-to-date with real-world examples.",
    avatar:
      "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    name: "Ramesh S.",
    title: "Full Stack Developer",
    message:
      "As a working professional, I love the flexibility this site offers. The hands-on projects made it easier to apply what I learned right away.",
    avatar:
      "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4.5,
  },
  {
    name: "Sneha P.",
    title: "Student, BSc. CSIT",
    message:
      "The platform is very intuitive and beginner-friendly. I was able to grasp complex topics easily with their step-by-step approach.",
    avatar:
      "https://randomuser.me/api/portraits/women/52.jpg",
    rating: 4.7,
  },
  {
    name: "Dipesh B.",
    title: "Freelance Web Developer",
    message:
      "Excellent value for money! The community and mentors are always helpful. I landed my first freelance gig after completing the MERN stack course.",
    avatar:
      "https://randomuser.me/api/portraits/men/44.jpg",
    rating: 5,
  },
];


export const faq = [
  {
    question: "What is New Learning?",
    answer:
      "New Learning is an online learning platform that offers a wide range of courses designed to help you acquire new skills, earn certifications, and grow your career or personal development."
  },
  {
    question: "Are the courses free or paid?",
    answer:
      "We offer both free and premium courses. While many introductory lessons are free, advanced modules and certifications may require a one-time purchase or subscription."
  },
  {
    question: "Do I get a certificate after completing a course?",
    answer:
      "Yes, upon successful completion of a certified course, you’ll receive a digital certificate that you can share on LinkedIn or add to your resume."
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Absolutely. All of our courses are self-paced, allowing you to learn whenever and wherever it suits you best."
  },
  {
    question: "Do I need any prior experience?",
    answer:
      "No prior experience is required for most beginner courses. Each course clearly states its difficulty level and prerequisites, if any."
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team through the Help Center or by emailing support@newlearning.com. We're here to help!"
  }
];
