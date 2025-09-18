import type { Course } from "../@types/course";
import type { Feature } from "../@types/Feature";
import type { Testimonial } from "../@types/Testimonial";




export const features: Feature[] = [
  {
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with years of real-world experience. Our instructors are handpicked for their expertise and teaching skills.",
    icon: "🎓",
  },
  {
    title: "Flexible Learning",
    description:
      "Access courses anytime, anywhere. Learn at your own pace with lifetime access to all your enrolled courses.",
    icon: "⏰",
  },
  {
    title: "Affordable Price",
    description:
      "High-quality education at a price that doesn’t break the bank. We believe in making learning accessible for everyone.",
    icon: "💲",
  },
  {
    title: "Certificates of Completion",
    description:
      "Earn certificates for every course you complete to showcase your skills and enhance your resume.",
    icon: "📜",
  },
  {
    title: "Community Support",
    description:
      "Join a community of learners and instructors. Ask questions, get answers, and collaborate via our Q&A and discussion boards.",
    icon: "💬",
  },
  {
    title: "Secure Payments",
    description:
      "Pay confidently with secure payment options like Stripe and PayPal. Your data is always protected.",
    icon: "🔒",
  },
];


export const testimonials: Testimonial[] = [
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
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "Simply click on the course you want to join, and then click the 'Enroll Now' button. For paid courses, you'll be prompted to complete the payment process first."
  },
  {
    question: "Can I access courses on mobile devices?",
    answer:
      "Yes, our platform is fully responsive. You can access courses from your smartphone, tablet, or desktop browser."
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit/debit cards, PayPal, and other secure payment methods depending on your region."
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes, we offer a refund policy for paid courses. Refund eligibility depends on the course and the time since purchase. Please check our Refund Policy for details."
  },
  {
    question: "Can I interact with instructors?",
    answer:
      "Yes! Many courses offer discussion forums, Q&A sections, and direct messaging with instructors for guidance."
  },
  {
    question: "Are the course materials downloadable?",
    answer:
      "Some courses provide downloadable PDFs, slides, or resources. Video lessons are usually streamed online and not downloadable."
  },
  {
    question: "Do you provide group or corporate training?",
    answer:
      "Yes, we offer group and corporate training solutions. Contact our support team to discuss packages and pricing."
  }
];
