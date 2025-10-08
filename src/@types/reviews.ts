
import type { ReviewReactionState } from "../store/reducer-types/course";
import type { User } from "./user";

/*

positive: 4-5 stars

neutral: 3 stars

negative: 1-2 stars
*/
export type ReviewType = "positive" | "neutral" | "negative";
export type ReactionType = "like" | "dislike"
export interface Review {
    id?: string;
    courseId: string;
    user?:User,
    rating: number; // 1 to 5
    review: string;
    createdAt?: string; // ISO date
    verifiedPurchase?: boolean; // optional
    anonymous:boolean
    type?: ReviewType
    name?:string|null
    email?:string|null
    edited?:boolean,
    userId?:string,
    hasUserReact:ReactionType|null
    reviewReactionCount?:ReviewReactionState
}

/*
is a label used to indicate that the student leaving the review actually bought or enrolled in the course 
through your platform, rather than just leaving a comment without taking the course.
*/