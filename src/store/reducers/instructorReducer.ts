import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../../@types/course";
import type { LoadCourseOptions } from "../reducer-types/course";
import apiHelper from "../../utils/apiHelper";
import { getCookie } from "../../utils/manage-cookie";

interface InstructorStata {
    error: string | null
    loading: boolean
    recentCourses: Course[] | []
    popularCourses: Course[] | []
    courses: Course[] | []
    totalPages: number | null
    totalCourses: number | null


}


const initialState: InstructorStata = {
    error: null,
    loading: false,
    recentCourses: [],
    courses: [],
    popularCourses: [],
    totalCourses: null,
    totalPages: null

}


const SERVER_URL = import.meta.env.VITE_SERVER_URL
const TOKEN = getCookie("token")


export const loadInstructorRecentCourse = createAsyncThunk(
    "loadInstructorRecentCourse",
    async ({ options, instructorId }: { options: Omit<LoadCourseOptions, "studentId" | "filter" | "q" | "sortBy" | "sortOrder">, instructorId: string }, { rejectWithValue, dispatch }) => {
        try {
            const { limit, page } = options
            const params: Record<string, string> = {}
            if (limit) params["limit"] = String(limit)
            if (page) params["page"] = String(page)
            const query = new URLSearchParams(params).toString()

            const res = await apiHelper(`${SERVER_URL}/course/instructor/${instructorId}?${query}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                }
            },
                false,
                dispatch)
            return {
                courses: res.courses ?? []
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const loadInstructorCourses = createAsyncThunk(
    "loadInstructorCourses",
    async ({ options, instructorId }: { options: Omit<LoadCourseOptions, "studentId" | "filter" | "q">, instructorId: string }, { rejectWithValue, dispatch }) => {
        try {
            const { limit, page, sortBy, sortOrder } = options
            const params: Record<string, string> = {}
            if (limit) params["limit"] = String(limit)
            if (page) params["page"] = String(page)
            if (sortBy) params["sortBy"] = sortBy
            if (sortOrder) params["order"] = sortOrder
            const query = new URLSearchParams(params).toString()

            const res = await apiHelper(`${SERVER_URL}/course/instructor/${instructorId}?${query}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                }
            },
                false,
                dispatch)
            return {
                courses: res.courses ?? [],
                totalCourses: res.totalCourses ?? 0,
                totalPages: res.totalPages ?? 0
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const loadInstructorPopularCourse = createAsyncThunk(
    "loadInstructorPopularCourse",
    async ({ options, instructorId }: { options: Omit<LoadCourseOptions, "studentId" | "filter" | "q" | "sortBy">, instructorId: string }, { rejectWithValue, dispatch }) => {
        try {
            const { limit, page, sortOrder } = options
            const params: Record<string, string> = {}
            if (limit) params["limit"] = String(limit);
            if (page) params["page"] = String(page);
            if (sortOrder) params["sortOrder"] = sortOrder;
            params["sortBy"] = "enrollment"
            const query = new URLSearchParams(params).toString()

            const res = await apiHelper(`${SERVER_URL}/course/instructor/${instructorId}?${query}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                }
            },
                false,
                dispatch)
            return {
                courses: res.courses ?? []
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


const instructorSlice = createSlice(
    {
        name: "instructor",
        initialState,
        reducers: {

        },
        extraReducers: (builder) => {
            builder.addCase(loadInstructorRecentCourse.fulfilled, (state, action: PayloadAction<{ courses: Course[] | [] }>) => {
                const { courses } = action.payload
                state.recentCourses = courses
            })
            builder.addCase(loadInstructorPopularCourse.fulfilled, (state, action: PayloadAction<{ courses: Course[] | [] }>) => {
                const { courses } = action.payload
                state.popularCourses = courses
            })
            builder.addCase(loadInstructorCourses.fulfilled, (state, action: PayloadAction<{ courses: Course[] | [], totalCourses: number, totalPages: number }>) => {
                const { courses, totalCourses, totalPages } = action.payload
                state.courses = courses
                state.totalCourses = totalCourses
                state.totalPages = totalPages
                state.loading = false
            })
            builder.addCase(loadInstructorCourses.pending, (state) => {
                state.loading = true
            })
            builder.addCase(loadInstructorCourses.rejected, (state, action) => {
                state.error = action.payload as string
                state.loading = false
            })
        }
    }
)
export const { } = instructorSlice.actions
export default instructorSlice.reducer