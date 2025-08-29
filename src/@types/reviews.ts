/*

positive: 4-5 stars

neutral: 3 stars

negative: 1-2 stars
*/
export type ReviewType = "positive" | "neutral" | "negative";

export interface Review {
    id: string;
    courseId: string;
    studentName: string;
    studentAvatar?: string; // optional profile pic
    rating: number; // 1 to 5
    title?: string;
    comment: string;
    createdAt: string; // ISO date
    verifiedPurchase?: boolean; // optional
    type?: ReviewType
}

/*
is a label used to indicate that the student leaving the review actually bought or enrolled in the course 
through your platform, rather than just leaving a comment without taking the course.
*/