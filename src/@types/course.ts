import type { Instructor } from "./instructor";
export type View = "home" | 'courses' | 'details'
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
export interface Lesson {
    id: string;
    title: string;
    duration: string;   // "10m", "1h 15m"
    resources?: string[]; // optional file/video links
}

// A module (section) of the course
export interface Module {
    id: string;
    title: string;      // e.g., "Introduction to React"
    lessons: Lesson[];
}
export type ResourceType = 
  | "video"       // supplemental videos
  | "pdf"         // lecture notes, slides
  | "document"    // Word docs, text files
  | "image"       // diagrams, infographics
  | "link"        // external links, references
  | "code"        // code snippets or projects
  | "audio"       // podcasts, recordings
  | "other";      // anything else

export interface CourseResource {
  id: string;           // unique id for the resource
  courseId: string;     // which course it belongs to
  title: string;        // display name
  type: ResourceType;   // type of resource
  url: string;          // link to download/view
  size?: string;        // optional size info (e.g., "2MB")
  description?: string; // optional description
  createdAt?: string;   // timestamp
}

export  interface CourseFAQ {
  id: string;
  courseId: string;
  question: string;
  answer: string;
  createdAt?: string;
}

export interface TargetAudience {
  id: string;
  role: string;       // e.g. "Beginners", "Students", "Professionals"
  description: string; // Who they are and why this course fits them
}
export interface Certificate {
  title: string;
  issuer: string; // e.g. "LearnHub Academy"
  imageUrl: string; // preview of certificate
  description: string; // short text about benefits
}


export interface Course {
    id: string;
    title: string;
    description: string;
    instructor?: Instructor | null;
    thumbnail: string;
    // Pricing
    price: number;
    discount?: number | null;
    isFree?: boolean;
    discountReason?:string|null //if has discount and what is the reasom of discount

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
    resources?:CourseResource[]
    certificateAvailable?: boolean;

    // Timestamps
    createdAt?: string;
    updatedAt?: string;
    isPublished?: boolean;
    publishedAt?: string;
    module?: Module[]
    tags?: string[];

    //faq
    faq:CourseFAQ[]
    //preview video url
    preview?:string,
    targetedAudiences?:TargetAudience[]
    certificate?:Certificate
}
