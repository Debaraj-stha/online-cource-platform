import type { Review } from "../@types/reviews";
import { initialCourse } from "../constants/initialCourse";
import type { CourseState } from "./reducer-types/course";


export const initialReview: Review = {
    name: null,
    email: null,
    type: "neutral",
    review: "",
    rating: 1,
    anonymous: false,
    status: "pending",
    courseId: "",
    verifiedPurchase: false,
    hasUserReact: null
}

export const courseInitialState: CourseState = {
    loadingCourse: false,
    isProcessing: false,
    course: initialCourse,
    searchResult: [],
    error: null,
    totalCourses: null,
    totalpages: 0,
    loadingCourses: false,
    popularCourses: [],
    highestRatedCourses: [],
    newestCourses: [],
    highestRatedError: null,
    popularError: null,
    newCourseError: null,
    loadingHighestRated: false,
    loadingNewCourses: false,
    loadingPopularCourse: false,
    currentPage: 0,
    detailedCourse: null,
    review: initialReview,
    myCourses: {
        courses: [],
        totalCourses: 0
    },
    enrolledCourseIds: [],
    searchQuery: "",
    selectedCategory: "all",
    courseUpdateError: null,
    courseUpdating: false
};