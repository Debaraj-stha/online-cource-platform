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
    publishedCourses?: number
    unpublishedCourses?: number
    totalEarnings?: number,
    averageRating?: number
    totalCourses?: number
    totalReviews?: number
    totalStudents?: number
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
