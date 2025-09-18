import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Course, CourseFAQ, CourseResource, Module, TargetAudience } from "../../@types/course";
import { initialCourse } from "../../constants/initialCourse";
import apiHelper from "../../utils/apiHelper";
import { setMessageWithTimeout, type Message } from "./messageReducer";
import type { AppDispatch } from "../store";
import type { Instructor } from "../../@types/instructor";
import type { Review, ReactionType } from "../../@types/reviews";
import { getCookie } from "../../utils/manage-cookie";


export interface ReviewReactionState {
    "like": number,
    "dislike": number
}
type ReactionStatusTypes = "created" | "updated" | "removed"
const token = getCookie("token")
interface DetailCourseState {
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
type ReviewValue<K extends keyof ReviewEditableField> = ReviewEditableField[K]

const initialReview: Review = {
    name: null,
    email: null,
    type: "neutral",
    review: "",
    rating: 1,
    anonymous: false,
    courseId: "",
    verifiedPurchase: false,
    hasUserReact: null
}
interface MyCourses {
    totalCourses: number,
    courses: Course[] | []
}

interface CourseState {
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

}
const initialState: CourseState = {
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
    searchQuery: ""
};


// Fields we don't want to be directly editable
type FieldsToOmit =
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
type FieldValue<K extends keyof EditableFields> = EditableFields[K]
type DynamicFields = {
    targetedAudiences: TargetAudience[];
    faq: CourseFAQ[];
    resources: CourseResource[];
    module: Module[];
};

type DynamicFieldValue<K extends keyof DynamicFields> = DynamicFields[K][number];

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

const SERVER_URL = import.meta.env.VITE_SERVER_URL
export const createCourse = createAsyncThunk(
    "create",
    async ({ courseData, token }: { courseData: FormData, token: string }, { rejectWithValue, dispatch }) => {
        try {
            const url = `${SERVER_URL}/course`
            const res = await apiHelper(url,
                {
                    method: "POST",
                    body:
                        courseData,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                },
                true
            )
            if (res) {
                const message: Message = {
                    messages: res.message,
                    id: Date.now(),
                    type: "info"
                };
                (dispatch as AppDispatch)(setMessageWithTimeout(message, 4000));
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const searchCourses = createAsyncThunk(
    "searchCourses",
    async ({ q }: { q: string }, { rejectWithValue, dispatch }) => {
        try {
            // Collect params
            const params: Record<string, string> = {};
            if (q) params["q"] = q
            // Build query string
            const queryString = new URLSearchParams(params).toString();
            const url = `${SERVER_URL}/course${queryString ? `?${queryString}` : ""}`;

            const res = await apiHelper(url, { method: "GET" }, false, dispatch);
            if (res.course.length == 0) {
                const message:Message={
                    type:"info",
                    id:Date.now(),
                    messages:`No result found for query:${q}`
                };
                (dispatch as AppDispatch)(setMessageWithTimeout(message))
            }
            return {
                courses: res.courses,
            };


        } catch (error: any) {
            return rejectWithValue(error?.message || "Something went wrong");
        }
    }
);
export const loadPopularCourses = createAsyncThunk(
    "popularCourses",
    async ({ options, isLoadMore = false }: { options: Omit<LoadCourseOptions, "sortBy">, isLoadMore?: boolean }, { rejectWithValue, dispatch }) => {
        try {
            const { limit, page, sortOrder, q, filter, studentId } = options;
            // Collect params
            const params: Record<string, string> = {};
            if (filter) {
                params["filterOptions"] = JSON.stringify(filter);
            }
            if (limit) params["limit"] = String(limit);
            if (page) params["page"] = String(page);
            if (sortOrder) params["sortOrder"] = sortOrder;
            if (q) params["q"] = q
            params["sortBy"] = "enrollment"
            if (studentId) params["studentId"] = studentId
            // Build query string
            const queryString = new URLSearchParams(params).toString();
            const url = `${SERVER_URL}/course${queryString ? `?${queryString}` : ""}`;

            const res = await apiHelper(url, { method: "GET" }, false, dispatch)
            if (res) {
                return {
                    courses: res.courses,
                    totalPages: res.totalPages,
                    totalCourses: res.totalCourses,
                    isLoadMore,
                    enrolledCourseIds: res.enrolledCourseIds
                };
            }
            return {
                courses: [],
                totalPages: null,
                totalCourses: null,
                isLoadMore,
                enrolledCourseIds: []

            }


        } catch (error: any) {
            return rejectWithValue(error.message || "Exception while fetching popular courses")
        }
    }
)
export const loadNewestCourses = createAsyncThunk(
    "newestCourses",
    async ({ options, isLoadMore = false }: { options: Omit<LoadCourseOptions, "sortBy" | "sortOrder">, isLoadMore?: boolean }, { rejectWithValue, dispatch }) => {
        try {
            const { limit, page, q, filter, studentId } = options;
            // Collect params
            const params: Record<string, string> = {};
            if (filter) {
                // Backend expects JSON string under "filterOptions"
                params["filterOptions"] = JSON.stringify(filter);
            }
            if (q) params["q"] = q
            if (limit) params["limit"] = String(limit);
            if (page) params["page"] = String(page);
            //sort by created date in descending sortOrder
            params["sortBy"] = "createdAt"
            params["ordre"] = "desc"
            if (studentId) params["studentId"] = studentId

            // Build query string
            const queryString = new URLSearchParams(params).toString();
            const url = `${SERVER_URL}/course${queryString ? `?${queryString}` : ""}`;

            const res = await apiHelper(url, { method: "GET" }, false, dispatch);

            if (res) {

                return {
                    courses: res.courses,
                    totalPages: res.totalPages,
                    totalCourses: res.totalCourses,
                    isLoadMore,
                    enrolledCourseIds: res.enrolledCourseIds

                };
            }
            return {
                courses: [],
                totalPages: null,
                totalCourses: null,
                isLoadMore,
                enrolledCourseIds: []

            }


        } catch (error: any) {
            return rejectWithValue(error.message || "Exception while fetching popular courses")
        }
    }
)
export const loadHighestRatedCourses = createAsyncThunk(
    "highestedRated",
    async ({ options, isLoadMore = false }: { options: Omit<LoadCourseOptions, "sortBy">, isLoadMore?: boolean }, { rejectWithValue, dispatch }) => {
        try {
            const { limit, page, sortOrder, q, filter, studentId } = options;
            // Collect params
            const params: Record<string, string> = {};

            if (filter) {
                // Backend expects JSON string under "filterOptions"
                params["filterOptions"] = JSON.stringify(filter);
            }
            if (q) params["q"] = q
            if (limit) params["limit"] = String(limit);
            if (page) params["page"] = String(page);
            params["sortBy"] = "rating"
            if (sortOrder) params["order"] = sortOrder
            if (studentId) params["studentId"] = studentId

            // Build query string
            const queryString = new URLSearchParams(params).toString();
            const url = `${SERVER_URL}/course${queryString ? `?${queryString}` : ""}`;

            const res = await apiHelper(url, { method: "GET" }, false, dispatch);

            if (res) {

                return {
                    courses: res.courses,
                    totalPages: res.totalPages,
                    totalCourses: res.totalCourses,
                    isLoadMore,
                    enrolledCourseIds: res.enrolledCourseIds
                };
            }
            return {
                courses: [],
                totalPages: null,
                totalCourses: null,
                isLoadMore,
                enrolledCourseIds: []

            }


        } catch (error: any) {
            return rejectWithValue(error.message || "Exception while fetching popular courses")
        }
    }
)
//limit=similar course limit
export const loadCourse = createAsyncThunk(
    "loadCourse",
    async ({ courseId, limit }: { courseId: string, limit?: string }, { rejectWithValue, dispatch }) => {
        try {
            const user = getCookie("user")
            const parsedData = user ? JSON.parse(user) : {}
            const url = `${SERVER_URL}/course/${courseId}?limit=${limit}&studentId=${parsedData.id}`
            const res = await apiHelper(url, { method: "GET" })
            const courseDetails: DetailCourseState = {
                course: res.course,
                totalModules: res.totalModules,
                totalReviews: res.totalReviews,
                modules: res.modules,
                reviews: res.reviews,
                instructor: res.course.instructor,
                averageRating: res.averageRating,
                faqs: res.faqs,
                similarCourses: res.similarCourses,

            }
            return courseDetails
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const loadMoreReviews = createAsyncThunk(
    "loadMorereviews",
    async (options: LoadMoreOptions, { rejectWithValue }) => {
        try {

            let url = `${SERVER_URL}/course/${options.courseId}/reviews`
            const params: Record<string, string> = {}
            if (options.limit) params["limit"] = options.limit
            if (options.page) params["page"] = options.page
            const query = new URLSearchParams(params).toString()
            url += query ? `?${query}` : ""
            const res = await apiHelper(url, { method: "GET" })
            console.log(res)
            if (res.reviews) {
                return res.reviews
            }

            return []

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const submitReview = createAsyncThunk(
    "submitReview",
    async (review: Review, { dispatch, rejectWithValue }) => {
        try {
            console.log(review)
            if (!review.courseId) {
                console.log("course id is required", review.courseId)
            }
            console.log(review)
            const res = await apiHelper(`${SERVER_URL}/course/${review.courseId}/review`, {
                method: "POST",
                body: review,

            },
                false,
                dispatch
            )
            const message: Message = {
                messages: "Review submitted successfully",
                id: Date.now(),
                type: "info"
            };
            (dispatch as AppDispatch)(setMessageWithTimeout(message))
            return res.review

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

//fetching students enrolled courses
export const loadMyCourse = createAsyncThunk(
    "loadMyCourse",
    async ({ studentId, limit = "10", page = "1", loadMore = false }: { studentId: string, limit?: string, page?: string, loadMore?: boolean }, { rejectWithValue }) => {
        try {
            const params: Record<string, string> = {}
            params["limit"] = limit
            params["page"] = page
            const query = new URLSearchParams(params).toString()
            const url = `${SERVER_URL}/user/${studentId}/courses?${query}`
            const res = await apiHelper(url, { method: "GET" })
            console.log(res)
            return {
                loadMore,
                myCourses: {
                    courses: res.courses,
                    totalCourses: res.totalCourses
                }
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


//reacting to review
export const reactToReview = createAsyncThunk(
    "reactToReview",
    async ({ courseId, reviewId, type }: { courseId: string, reviewId: string, type: ReactionType }, { rejectWithValue }) => {
        try {
            const url = `${SERVER_URL}/course/${courseId}/review/${reviewId}/react`
            const res = await apiHelper(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: {
                    type,
                    reviewId
                }
            })
            return {
                reviewId,
                type,
                status: res.status,
                stats: res.stats
            }

        } catch (error: any) {
            return rejectWithValue(error.manage)
        }
    }
)

export const reportToReview = createAsyncThunk(
    "reportToreview",
    async ({ courseId, reviewId, reason }: { courseId: string, reviewId: string, reason: string }, { rejectWithValue, dispatch }) => {
        try {
            const url = `${SERVER_URL}/course/${courseId}/review/${reviewId}/report`
            const res = await apiHelper(
                url,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: {
                        reviewId,
                        reason
                    }
                }
            )
            const message: Message = {
                messages: "Review reported successfully",
                id: Date.now(),
                type: "info"
            };
            (dispatch as AppDispatch)(setMessageWithTimeout(message))

            return res;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const courseReducer = createSlice({
    name: "course",
    initialState,
    reducers: {
        // generic safe setter
        setCourseFields<K extends keyof EditableFields>(
            state: CourseState,
            action: PayloadAction<{ field: K; value: FieldValue<K> }>
        ) {
            const { field, value } = action.payload;
            (state.course as any)[field] = value
        },
        setFileFields(state, action: PayloadAction<{ field: "thumbnail" | "certificate", value: File }>) {
            const { field, value } = action.payload
            state.course[field] = value
        },
        resetCourse(state) {
            state.course = initialCourse;
        },
        addDynamicField<K extends keyof DynamicFields>(
            state: CourseState,
            action: PayloadAction<{ field: K; value: DynamicFieldValue<K> }>
        ) {
            const { field, value } = action.payload;

            if (!Array.isArray((state.course as any)[field])) {
                (state.course as any)[field] = [];
            }

            (state.course as any)[field].push(value);
        },

        removeDynamicField<K extends keyof DynamicFields>(
            state: CourseState,
            action: PayloadAction<{ field: K; id: string }>
        ) {
            const { field, id } = action.payload;
            if (Array.isArray((state.course as any)[field])) {
                (state.course as any)[field] = (state.course as any)[field].filter(
                    (item: any) => item.id !== id
                );
            }
        },

        updateDynamicField<K extends keyof DynamicFields>(
            state: CourseState,
            action: PayloadAction<{ field: K; id: string; value: Partial<DynamicFieldValue<K>> }>
        ) {
            const { field, id, value } = action.payload;
            if (Array.isArray((state.course as any)[field])) {
                (state.course as any)[field] = (state.course as any)[field].map((item: any) =>
                    item.id === id ? { ...item, ...value } : item
                );
            }
        },
        updatePage(state, action: PayloadAction<number | undefined>) {
            console.log("current page", state.currentPage)
            state.currentPage = action.payload ?? (state.currentPage ?? 0) + 1
        },
        //set value to review input fields
        setReview<K extends keyof ReviewEditableField>(state: CourseState, action: PayloadAction<{ field: K, value: ReviewValue<K> }>) {
            const { field, value } = action.payload
            state.review[field] = value
        },

        resetSearchResult(state) {
            state.searchResult = []
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload
        }

    },
    extraReducers: (builder) => {
        //loading individual course
        builder.addCase(loadCourse.pending, (state) => {
            state.loadingCourse = true
        })
        builder.addCase(loadCourse.rejected, (state, action) => {
            state.loadingCourse = false
            state.error = action.payload as string
        })
        builder.addCase(loadCourse.fulfilled, (state, action: PayloadAction<DetailCourseState>) => {
            state.loadingCourse = false
            state.detailedCourse = action.payload

        });
        //saving course to db
        builder.addCase(createCourse.pending, (state) => {
            state.isProcessing = true
        })
        builder.addCase(createCourse.rejected, (state, action) => {
            state.isProcessing = false
            state.error = action.payload as string
        })
        builder.addCase(createCourse.fulfilled, (state) => {
            state.isProcessing = false
        });
        //loading courses
        builder.addCase(searchCourses.pending, (state) => {
            state.loadingCourses = true
        })
        builder.addCase(searchCourses.rejected, (state, action) => {
            state.loadingCourses = false
            state.error = action.payload as string
        })
        builder.addCase(searchCourses.fulfilled, (state, action: PayloadAction<{ courses: Course[] | [] }>) => {
            const { courses } = action.payload
            state.loadingCourses = false
            state.searchResult = courses

        });
        // New courses
        builder.addCase(loadNewestCourses.pending, (state) => {
            state.loadingNewCourses = true
        })
        builder.addCase(loadNewestCourses.rejected, (state, action) => {
            state.loadingNewCourses = false
            state.newCourseError = action.payload as string
        })
        builder.addCase(loadNewestCourses.fulfilled, (state, action: PayloadAction<LoadCoursesPayload>) => {
            const { courses, totalCourses, totalPages, isLoadMore, enrolledCourseIds } = action.payload
            state.loadingNewCourses = false

            if (courses.length !== 0) {
                // Replace for initial load, append for load more
                state.newestCourses = isLoadMore
                    ? [...state.newestCourses, ...courses]
                    : courses;
            } else if (!isLoadMore) {
                // Clear on initial load if no courses
                state.newestCourses = [];
            }

            state.totalCourses = totalCourses
            state.totalpages = totalPages
            state.enrolledCourseIds = enrolledCourseIds
        });

        // Popular courses
        builder.addCase(loadPopularCourses.pending, (state) => {
            state.loadingPopularCourse = true
        })
        builder.addCase(loadPopularCourses.rejected, (state, action) => {
            state.loadingPopularCourse = false
            state.popularError = action.payload as string
        })
        builder.addCase(loadPopularCourses.fulfilled, (state, action: PayloadAction<LoadCoursesPayload>) => {
            const { courses, totalCourses, totalPages, isLoadMore, enrolledCourseIds } = action.payload

            if (courses.length !== 0) {
                state.popularCourses = isLoadMore
                    ? [...state.popularCourses, ...courses]
                    : courses;
            } else if (!isLoadMore) {
                state.popularCourses = [];
            }

            state.loadingPopularCourse = false
            state.totalCourses = totalCourses
            state.totalpages = totalPages
            state.enrolledCourseIds = enrolledCourseIds
        });

        // Highest rated courses
        builder.addCase(loadHighestRatedCourses.pending, (state) => {
            state.loadingHighestRated = true
        })
        builder.addCase(loadHighestRatedCourses.rejected, (state, action) => {
            state.loadingHighestRated = false
            state.highestRatedError = action.payload as string
        })
        builder.addCase(loadHighestRatedCourses.fulfilled, (state, action: PayloadAction<LoadCoursesPayload>) => {
            const { courses, totalCourses, totalPages, isLoadMore, enrolledCourseIds } = action.payload
            state.loadingHighestRated = false

            if (courses.length !== 0) {
                state.highestRatedCourses = isLoadMore
                    ? [...state.highestRatedCourses, ...courses]
                    : courses;
            } else if (!isLoadMore) {
                state.highestRatedCourses = [];
            }

            state.totalCourses = totalCourses
            state.totalpages = totalPages
            state.enrolledCourseIds = enrolledCourseIds
        })
        //loading more reviews
        builder.addCase(loadMoreReviews.rejected, (state, action) => {
            state.error = action.payload as string
        })
        builder.addCase(loadMoreReviews.fulfilled, (state, action: PayloadAction<Review[] | []>) => {
            if (action.payload.length > 0 && state.detailedCourse) {
                state.detailedCourse.reviews.push(...action.payload)
            }
            { }
        })
        //submitting review
        builder.addCase(submitReview.fulfilled, (state, action: PayloadAction<Review>) => {
            if (!state.detailedCourse?.reviews) {
                state.detailedCourse?.reviews.push(action.payload)
            }
            else {
                state.detailedCourse.reviews = [action.payload]
            }
        })
        builder.addCase(loadMyCourse.fulfilled, (state, action: PayloadAction<{ loadMore: boolean, myCourses: MyCourses }>) => {
            const { loadMore, myCourses } = action.payload
            if (myCourses.courses.length != 0) {
                state.myCourses.courses = loadMore ? [...state.myCourses.courses, ...myCourses.courses] : myCourses.courses
            }
            else if (!loadMore) {
                state.myCourses.courses = []
            }

        })
        //isremoved is true if user removed the reaction
        builder.addCase(reactToReview.fulfilled, (state, action: PayloadAction<{ reviewId: string, status: ReactionStatusTypes, stats: ReviewReactionState, type: ReactionType }>) => {
            const { reviewId, stats, type, status } = action.payload
            const review = state.detailedCourse?.reviews.find((review) => review.id === reviewId)
            if (review && review.reviewReactionCount) {
                review.reviewReactionCount = stats
                if (status === "removed") review.hasUserReact = null
                else review.hasUserReact = type //update reaction type like/unlike on ui on react
            }

        })
    },
});

export const {
    setCourseFields,
    resetCourse,
    setFileFields,
    addDynamicField,
    updateDynamicField,
    removeDynamicField,
    updatePage,
    setReview,
    setSearchQuery,
    resetSearchResult
} = courseReducer.actions;
export default courseReducer.reducer;
