import type { Instructor } from "./instructor";

export type Category =
    | "web-development"
    | "design"
    | "ai-ml"
    | "business"
    | "marketing"
    | "data-science"
    | "personal-development"
    | "app development"
    | "software development"
    | "leadership"
    | "other";

export type Level = "beginner" | "intermediate" | "advanced";

export type Language = "english" | "nepali" | "hindi" | "other";

export interface Course {
    id: string;
    title: string;
    description: string;
    instructor?: Instructor|null;
    thumbnail: string;
    // Pricing
    price: number;
    discount?: number | null;
    isFree?: boolean;

    // Meta
    rating: number | null;
    totalEnrolled: number | null;
    views?: number;
    likes?: number;
    reviewsCount?: number;

    // Classification
    category?: Category | null;
    level?: Level | null;
    language?: Language;

    // Content
    duration?: string; // e.g., "5h 30m"
    lessonCount?: number;
    prerequisites?: string[]; 
    whatYouWillLearn?: string[];
    resources?: string[]; // download links or file names
    certificateAvailable?: boolean;

    // Timestamps
    createdAt?: string;
    updatedAt?: string;
    isPublished?: boolean;
    publishedAt?: string;

    tags?: string[];
}
