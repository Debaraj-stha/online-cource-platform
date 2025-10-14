import type { Review } from "./reviews"

export interface InstructorCertificate {
    id: string
    title: string
    issuedBy: string
    date: string
    imageUrl: string | null
}
export type SocialLinkPlatform = "email" | "phone" | "website" | "linkedin" | "github" | "facebook" | "x" | "instagram" | "discord"
export interface SocialLinks {
    platform: SocialLinkPlatform
    url: string
}

export interface InstructorStats {
    publishedCourses?: number | null
    unpublishedCourses?: number | null
    totalEarnings?: number | null,
    averageRating?: number | null
    totalCourses?: number | null
    totalReviews?: number | null
    totalStudents?: number | null
}

export interface CoursePerformance{
    rating:number
    revenue:number
    title:string
    enrollments:number

}

export interface Instructor {
    name: string;
    title?: string; // e.g., "Senior Web Developer"
    bio?: string;
    profilePicture?: string | null; // profile image
    specialization?: string
    // Teaching stats
    experience?: number; // in years
    certificates?: InstructorCertificate[],
    socialLinks?: SocialLinks[] | [],
    targetAudience?: string[]
    topReviews?: Review[]
    stats: InstructorStats
}



export  interface Activity{
    title:string,
    _id:string,
    description?:string,
    course?:string,
    targetUser?:string,
    type:string,
    meta:{}
    createdAt?:string
}

export interface Todo{
    title:string,
    _id?:string
}