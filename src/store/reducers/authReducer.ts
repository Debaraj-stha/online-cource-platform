import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../@types/user";
import apiHelper from "../../utils/apiHelper";

interface AuthState {
    isProcessing: boolean
    isAuthenticating: boolean
    error: null | string
    token: string | null
    user: User | null
}
const initialUser: User = {
    name: "",
    email: "",
    password: null,
    conformPassword: null,
    role: null
}

const initialState: AuthState = {
    isProcessing: false,
    isAuthenticating: false,
    error: null,
    token: null,
    user: initialUser
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const signup = createAsyncThunk<{ token: string, user: User },
    void, { rejectValue: string }
>(
    "signup",
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiHelper(`${SERVER_URL}/auth/signup`, {
                method: "POST",
                body: initialState.user,
            });

            return {
                token: res.token,
                user: res.user,
            };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);



export const login = createAsyncThunk(
    "login",
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiHelper(`${SERVER_URL}/auth/login`, {
                method: "POST",
                body: {
                    email:initialState.user?.email,
                    password:initialState.user?.password
                },
            });

            return {
                token: res.token,
                user: res.user,
            };
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {

        },
        extraReducers: (builder) => {
            //signup
            builder.addCase(signup.pending, (state) => {
                state.isProcessing = true
            })
                .addCase(signup.rejected, (state, action) => {
                    state.error = action.payload as string
                    state.isProcessing = false
                })
                .addCase(signup.fulfilled, (state, action: PayloadAction<{ token: string, user: User }>) => {
                    const { token, user } = action.payload
                    state.error = null
                    state.isProcessing = false
                    state.token = token
                    state.user = user
                })
            //login
            builder.addCase(login.pending, (state) => {
                state.isProcessing = true
            })
                .addCase(login.rejected, (state, action) => {
                    state.error = action.payload as string
                    state.isProcessing = false
                })
                .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string, user: User }>) => {
                    const { token, user } = action.payload
                    state.error = null
                    state.isProcessing = false
                    state.token = token
                    state.user = user
                })
        }
    }
)
export const { } = authSlice.actions
export default authSlice.reducer