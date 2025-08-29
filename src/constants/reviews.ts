import type { Review } from "../@types/reviews";

export const reviews: Review[] = [
  {
    id: "r1",
    courseId: "web-dev-101",
    studentName: "Alice Johnson",
    studentAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    title: "Excellent Course!",
    comment: "I learned so much about full-stack development. The instructor explained concepts clearly.",
    createdAt: "2025-08-25T10:30:00Z",
    verifiedPurchase: true,
    type:"positive"
  },
  {
    id: "r2",
    courseId: "web-dev-101",
    studentName: "Bob Smith",
    studentAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    comment: "Good course, but some lessons could be more detailed.",
    createdAt: "2025-08-26T15:00:00Z",
    verifiedPurchase: true,
    type:"positive"
  },
  {
    id: "r3",
    courseId: "web-dev-101",
    studentName: "Charlie Lee",
    studentAvatar: "https://randomuser.me/api/portraits/men/23.jpg",
    rating: 3,
    comment: "Average course. Some parts were confusing.",
    createdAt: "2025-08-27T12:15:00Z",
    verifiedPurchase: false,
    type:"neutral"
  },
    {
    id: "r3",
    courseId: "web-dev-101",
    studentName: "Charlie Lee",
    studentAvatar: "https://randomuser.me/api/portraits/men/23.jpg",
    rating: 2,
    comment: "Average course. Some parts were confusing.",
    createdAt: "2025-08-27T12:15:00Z",
    verifiedPurchase: false,
    type:"negative"
  },
];
