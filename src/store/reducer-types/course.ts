import type { Category, Course, CourseFAQ, CourseResource, Module, TargetAudience } from "../../@types/course"
import type { Instructor } from "../../@types/instructor"
import type { Review } from "../../@types/reviews"


export interface ReviewReactionState {
    "like": number,
    "dislike": number
}
export type ReactionStatusTypes = "created" | "updated" | "removed"


export interface DetailCourseState {
    course: Course,
    totalModules: number
    modules: Module[],
    reviews: Review[],
    totalReviews: number
    instructor: Instructor
    averageRating: number
    faqs: CourseFAQ[],
    similarCourses: Course[],

}

export type ReviewEditableField = Omit<Review, "id" | "createdAt" | "user" | "verifiedPurchase" | "reviewReactionCount">
export type ReviewValue<K extends keyof ReviewEditableField> = ReviewEditableField[K]


export interface MyCourses {
    totalCourses: number,
    courses: Course[] | []
}

export interface CourseState {
    course: Course
    searchResult: Course[] | []
    loadingCourse: boolean
    loadingCourses: boolean
    isProcessing: boolean
    error: string | null
    totalpages: number | null
    totalCourses: number | null
    popularCourses: Course[] | [],
    newestCourses: Course[] | []
    highestRatedCourses: Course[] | []
    loadingPopularCourse: boolean
    popularError: string | null
    loadingNewCourses: boolean
    newCourseError: string | null
    loadingHighestRated: boolean
    highestRatedError: string | null
    currentPage: number,
    detailedCourse: DetailCourseState | null
    review: Review
    myCourses: MyCourses
    enrolledCourseIds: string[] | []
    searchQuery: string
    selectedCategory: "all" | Category

}


// Fields we don't want to be directly editable
export type FieldsToOmit =
    | "id"
    | "rating"
    | "totalEnrolled"
    | "views"
    | "likes"
    | "reviewsCount"
    | "lessonCount"
    | "updatedAt"
    | "createdAt"
    | "publishedAt"
    | "thumbnail"
    | "faq"
    | "module"
    | "targetedAudiences"
    | "resources"
    | "certificate";

export type EditableFields = Omit<Course, FieldsToOmit>;

// For each key, pick the correct value type
export type FieldValue<K extends keyof EditableFields> = EditableFields[K]
export type DynamicFields = {
    targetedAudiences: TargetAudience[];
    faq: CourseFAQ[];
    resources: CourseResource[];
    module: Module[];
};

export type DynamicFieldValue<K extends keyof DynamicFields> = DynamicFields[K][number];

export interface LoadCourseOptions {
    limit?: number
    page?: number
    q?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
    filter?: Record<string, string>,
    studentId?: string | null
}

export interface LoadMoreOptions {
    page?: string,
    limit?: string,
    courseId: string
}

export interface LoadCoursesPayload {
    enrolledCourseIds: []
    courses: Course[] | [],
    totalPages: number | null,
    totalCourses: number | null,
    isLoadMore?: boolean,
}