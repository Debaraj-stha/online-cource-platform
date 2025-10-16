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
    certificatesIssue?: null | number
}

export interface CoursePerformance {
    rating: number
    revenue: number
    title: string
    enrollments: number

}

export interface MonthlyEarning {
    totalEarning: number,
    month: number
    year: number
}

export interface EarningByCourse {
    course: String
    totalEarning: number
}

export interface EarningPerYear {
    totalEarning: number,
    year: number
}

export interface TopPerformingCoursesByEnrollment {
    courseId?: string
    title: string
    totalEnrollments: number
}

export interface AverageRatingPerCourse{
    title:string
    averageRating:number
}

export interface InstructorReports {
    earningByInstructorPerMonth: MonthlyEarning[]
    earningByCourse: EarningByCourse[]
    earningPerYear: EarningPerYear[]
    topPerformingCoursesByEnrollment: TopPerformingCoursesByEnrollment[]
    averageRatingsPerCourse:AverageRatingPerCourse[]
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



export interface Activity {
    title: string,
    _id: string,
    description?: string,
    course?: string,
    targetUser?: string,
    type: string,
    meta: {}
    createdAt?: string
}

export interface Todo {
    title: string,
    _id?: string
}