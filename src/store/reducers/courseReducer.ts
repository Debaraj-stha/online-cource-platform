import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Course, CourseFAQ, CourseResource, Module, TargetAudience } from "../../@types/course";
import { initialCourse } from "../../constants/initialCourse";
import apiHelper from "../../utils/apiHelper";
import { setMessageWithTimeout, type Message } from "./messageReducer";
import type { AppDispatch } from "../store";

interface CourseState {
    course: Course;
    loadingCourse: boolean;
    isProcessing: boolean;
    error: string | null;
}

const initialState: CourseState = {
    loadingCourse: false,
    isProcessing: false,
    course: initialCourse,
    error: null,
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


    },
    extraReducers: (builder) => {
        //saving course to db
        builder.addCase(createCourse.pending, (state) => {
            state.isProcessing = true
        })
            .addCase(createCourse.rejected, (state, action) => {
                state.isProcessing = false
                state.error = action.payload as string
            }).addCase(createCourse.fulfilled, (state) => {
                state.isProcessing = false
            })
    },
});

export const { setCourseFields, resetCourse, setFileFields,
    addDynamicField,
    updateDynamicField,
    removeDynamicField
} = courseReducer.actions;
export default courseReducer.reducer;
