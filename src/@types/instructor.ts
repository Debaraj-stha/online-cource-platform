export interface InstructorCertificate {
    id: string
    title: string
    issuedBy: string
    date: string
    imageUrl: string | null
}
export type SocialLinkPlatform="email" | "phone" | "website" | "linkedin" | "github" | "facebook" | "x" | "instagram" | "discord"
export interface SocialLinks {
    platform: SocialLinkPlatform
    url: string
}

export interface Instructor {
    name: string;
    title?: string; // e.g., "Senior Web Developer"
    bio?: string;
    profilePicture?: string | null; // profile image
    specialization?: string
    // Teaching stats
    totalStudents?: number;
    courses?: number;
    experience?: number; // in years
    certificates?: InstructorCertificate,
    socialLinks?: SocialLinks[] | [],
    averageRating?: number
    totalCourses?:number
}
