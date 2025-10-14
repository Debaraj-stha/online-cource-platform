import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../../@types/course";
import type { LoadCourseOptions } from "../reducer-types/course";
import apiHelper from "../../utils/apiHelper";
import { getCookie } from "../../utils/manage-cookie";
import type { Activity, CoursePerformance, Instructor, InstructorStats, SocialLinks, Todo } from "../../@types/instructor";
import { setMessageWithTimeout, type Message } from "./messageReducer";
import type { AppDispatch } from "../store";
export interface InstructorPayload {
    title?: string;
    bio?: string;
    specialization?: string;
    experience?: number;
    socialLinks?: SocialLinks[];
}

export interface ProfileEditPayload extends InstructorPayload {
    name?: string;
    profilePicture?: File | null; // profile image
}


type ProfileEditFieldValue<K extends keyof ProfileEditPayload> = ProfileEditPayload[K];


interface InstructorState {
    error: string | null
    loading: boolean
    recentCourses: Course[] | []
    popularCourses: Course[] | []
    courses: Course[] | []
    totalPages: number | null
    totalCourses: number | null
    openedInstructorCourseManageOptionsId: string | null
    instructor: Instructor | null,
    loadingInstructorDetails?: boolean
    profileEditPayload?: ProfileEditPayload
    isProfileUpdating?: boolean
    stats?: InstructorStats,
    activities?: Activity[]
    todos: Todo[]
    todo: Todo
    coursePerformance: CoursePerformance[]
}


const initialState: InstructorState = {
    error: null,
    loading: false,
    recentCourses: [],
    courses: [],
    popularCourses: [],
    totalCourses: null,
    totalPages: null,
    instructor: null,
    openedInstructorCourseManageOptionsId: null,
    isProfileUpdating: false,
    activities: [],
    todos: [],
    todo: {
        title: "",
        _id: ""
    },
    coursePerformance: []

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

export const loadInstructorPopularCourse = createAsyncThunk(
    "loadInstructorPopularCourse",
    async ({ options, instructorId }: { options: Omit<LoadCourseOptions, "studentId" | "filter" | "q" | "sortBy" | "sortOrder">, instructorId: string }, { rejectWithValue, dispatch }) => {
        try {
            const { limit, page, } = options
            const params: Record<string, string> = {}
            if (limit) params["limit"] = String(limit);
            if (page) params["page"] = String(page);
            params["order"] = "desc"
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
            console.log("popular course", res)
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
    async (
        {
            options,
            instructorId,
            isLoadMore,

        }: {
            options: Omit<LoadCourseOptions, "studentId" | "filter" | "q">
            instructorId: string
            isLoadMore?: boolean
        },
        { rejectWithValue, dispatch }
    ) => {
        try {
            const { limit, sortBy, sortOrder, page } = options
            const params: Record<string, string> = {}

            if (limit) params["limit"] = String(limit)
            if (page) params["page"] = String(page)


            if (sortBy) params["sortBy"] = sortBy
            if (sortOrder) params["order"] = sortOrder

            const query = new URLSearchParams(params).toString()


            const res = await apiHelper(
                `${SERVER_URL}/course/instructor/${instructorId}?${query}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
                false,
                dispatch
            )
            console.log(page, limit, res)

            return {
                courses: res.courses ?? [],
                totalCourses: res.totalCourses ?? 0,
                totalPages: res.totalPages ?? 0,
                isLoadMore,
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const loadInstructorDetails = createAsyncThunk(
    "loadInstructorDetails",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const res = await apiHelper(`${SERVER_URL}/instructor/details`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                }
            },
                false,
                dispatch)
            return {
                instructor: res.instructor
            }

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const updateProfile = createAsyncThunk(
    "updateProfile",
    async (profile: ProfileEditPayload, { rejectWithValue, dispatch }) => {
        try {

            const formData = new FormData()

            Object.entries(profile).forEach(([key, value]) => {
                console.log("key", key, "value", value)
                if (key === "socialLinks") {
                    formData.append("socialLinks", JSON.stringify(value))
                    return
                }
                formData.append(key, value)

            })

            const res = await apiHelper(`${SERVER_URL}/instructor/update-profile`, {
                body: formData,
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                },
                method: "PATCH"
            },
                true,
                dispatch
            )
            if (res) {
                const message: Message = {
                    messages: "Profile updated successfully",
                    type: "info",
                    id: Date.now()
                };
                (dispatch as AppDispatch)(setMessageWithTimeout(message))
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteCourse = createAsyncThunk(
    "deleteCourse",
    async ({ courseId }: { courseId: string }, { rejectWithValue, dispatch }) => {
        try {
            const res = await apiHelper(`${SERVER_URL}/course/${courseId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                }
            },
                false,
                dispatch)
            if (res) {
                const message: Message = {
                    messages: "Course deleted successfully",
                    type: "info",
                    id: Date.now()
                };
                (dispatch as AppDispatch)(setMessageWithTimeout(message))
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const instructorStats = createAsyncThunk(
    "instructorStats",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const url = `${SERVER_URL}/instructor/stats`
            const res = await apiHelper(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                },
            },
                false,
                dispatch
            )
            console.log("res", res)
            return res.stats
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const addTodo = createAsyncThunk(
    "addTodo",
    async (title: string, { rejectWithValue, dispatch }) => {
        try {

            const url = `${SERVER_URL}/todo/create`;
            const res = await apiHelper(url, {
                method: "POST",
                body: { title },
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                },
            },
                false,
                dispatch
            );
            if (res) {
                const message: Message = {
                    id: Date.now(),
                    type: "info",
                    messages: "Todo added successfully"
                };
                (dispatch as AppDispatch)(setMessageWithTimeout(message));
                return res.todo
            }

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const deleteTodo = createAsyncThunk(
    "deleteTodo",
    async (id: string, { rejectWithValue, dispatch }) => {
        try {

            const url = `${SERVER_URL}/todo/delete/${id}`;
            const res = await apiHelper(url, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                },
            },
                false,
                dispatch
            );
            if (res) {
                const message: Message = {
                    id: Date.now(),
                    type: "info",
                    messages: "Todo deleted successfully"
                };
                (dispatch as AppDispatch)(setMessageWithTimeout(message));
                return res.todo
            }

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getTodos = createAsyncThunk(
    "getTodos",
    async (_, { rejectWithValue, dispatch }) => {
        try {

            const url = `${SERVER_URL}/todo/todos`;
            const res = await apiHelper(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                },
            },
                false,
                dispatch
            );
            if (res) {
                return res.todos
            }
            return []

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)



export const updateTodo = createAsyncThunk(
    "updateTodo",
    async ({ id, title }: { id: string, title: string }, { rejectWithValue, dispatch }) => {
        try {

            const url = `${SERVER_URL}/todo/edit/${id}`;
            const res = await apiHelper(url, {
                method: "PATCH",
                body: { title },
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                },
            },
                false,
                dispatch
            );
            if (res) {
                const message: Message = {
                    id: Date.now(),
                    type: "info",
                    messages: "Todo updated successfully"
                };
                (dispatch as AppDispatch)(setMessageWithTimeout(message));
                return res.todo
            }

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const instructorActivities = createAsyncThunk(
    "instructorActivities",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const url = `${SERVER_URL}/user/activities`
            console.log(url)
            const res = await apiHelper(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                }
            },
                false, dispatch
            )
            if (res) {
                return res.activities
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const getCoursePerformance = createAsyncThunk(
    "getCoursePerformance",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const url = `${SERVER_URL}/course/performance`
            const res = await apiHelper(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`
                },
            },
                false,
                dispatch
            )
            if (res.coursePerformance) {
                return res.coursePerformance
            }
            return []
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
            toggleCourseManageOptions: (state, action: PayloadAction<{ courseId: string | null }>) => {
                const { courseId } = action.payload
                if (state.openedInstructorCourseManageOptionsId === courseId) {
                    state.openedInstructorCourseManageOptionsId = null
                } else {
                    state.openedInstructorCourseManageOptionsId = courseId
                }
            },
            setProfileEditPayloadField<K extends keyof ProfileEditPayload>(state: InstructorState, action: PayloadAction<{ field: K; value: ProfileEditFieldValue<K> }>) {
                const { field, value } = action.payload;
                if (!state.profileEditPayload) {
                    state.profileEditPayload = {};
                }
                state.profileEditPayload[field] = value;
            },
            setInstructorProfilePayload(state: InstructorState, action: PayloadAction<{ payload: InstructorPayload }>) {
                const { payload } = action.payload;
                state.profileEditPayload = {
                    ...state.profileEditPayload,
                    ...payload
                };

            },
            clearProfileEditPayload(state) {
                state.profileEditPayload = undefined;
            },
            setTodo(state, action: PayloadAction<Todo>) {
                state.todo = action.payload
            },
            setTodoTitle(state, action: PayloadAction<string>) {
                state.todo.title = action.payload
            },
            clearTodo(state) {
                state.todo = {
                    title: "",
                }
            }
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
            builder.addCase(loadInstructorCourses.fulfilled, (state, action: PayloadAction<{ courses: Course[] | [], totalCourses: number, totalPages: number, isLoadMore?: boolean }>) => {
                const { courses, totalCourses, totalPages, isLoadMore } = action.payload
                if (courses.length != 0) {
                    if (isLoadMore) {
                        const existingIds = new Set(state.courses.map(c => c.id))
                        const newCourses = courses.filter(e => !existingIds.has(e.id))
                        state.courses = [...state.courses, ...newCourses]
                    }
                    else {
                        state.courses = courses
                    }
                }
                else if (!isLoadMore) {
                    state.courses = []
                }
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
            builder.addCase(loadInstructorDetails.pending, (state) => {
                state.loadingInstructorDetails = true
            })
            builder.addCase(loadInstructorDetails.fulfilled, (state, action: PayloadAction<{ instructor: Instructor }>) => {
                state.instructor = action.payload.instructor
                state.loadingInstructorDetails = false
            })
            builder.addCase(loadInstructorDetails.rejected, (state, action) => {
                state.error = action.payload as string
                state.loadingInstructorDetails = false
            })
            builder.addCase(updateProfile.pending, (state) => {
                state.isProfileUpdating = true
            })
            builder.addCase(updateProfile.rejected, (state, action) => {
                state.isProfileUpdating = false
                state.error = action.payload as string
            })
            builder.addCase(updateProfile.fulfilled, (state) => {
                state.isProfileUpdating = false

            })
            //stats of instructor
            builder.addCase(instructorStats.fulfilled, (state, action: PayloadAction<InstructorState>) => {
                state.stats = action.payload

            })
            //activity
            builder.addCase(instructorActivities.fulfilled, (state, action: PayloadAction<Activity[]>) => {
                state.activities = action.payload
            })
            //creating  todo
            builder.addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos.push(action.payload)
            })
            //deleting  todo
            builder.addCase(deleteTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos = state.todos.filter((todo) => todo._id !== action.payload._id)
            })
            //feteching  todos
            builder.addCase(getTodos.fulfilled, (state, action: PayloadAction<Todo[] | []>) => {
                state.todos = action.payload
            })
            //updating  todos
            builder.addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos = state.todos.filter((todo) => todo._id !== action.payload._id)
                state.todos.push(action.payload)
            })
            //get course performances
            builder.addCase(getCoursePerformance.fulfilled, (state, action: PayloadAction<CoursePerformance[] | []>) => {
                state.coursePerformance = action.payload
            })
        }
    }
)
export const {
    toggleCourseManageOptions,
    setInstructorProfilePayload,
    setProfileEditPayloadField,
    setTodo,
    setTodoTitle,
    clearTodo
} = instructorSlice.actions
export default instructorSlice.reducer