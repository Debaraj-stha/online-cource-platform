export interface InstructorCertificate {
    id: string
    title: string
    issuedBy: string
    date: string
    imageUrl: string | null
}
export interface SocialLinks {
    platform: "email" | "phone" | "website" | "linkedin" | "github" | "facebook" | "x" | "instagram" | "discord",
    url: string
}

export interface Instructor {
    name: string;
    title?: string; // e.g., "Senior Web Developer"
    bio?: string;
    profilePicture?: string | null; // profile image
    specialization?: string
    // Teaching stats
    students?: number;
    courses?: number;
    experience?: number; // in years
    certificates?: InstructorCertificate,
    socialLinks?: SocialLinks[] | [],
    averageRating?: number
}
