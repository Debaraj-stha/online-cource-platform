import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Roles, User } from "../../@types/user";
import apiHelper from "../../utils/apiHelper";
import { setMessageWithTimeout, type Message } from "./messageReducer";
import type { AppDispatch } from "../store";
import getNavigatorDetails from "../../utils/getNavigatorDetails";
import { removeCookie, setCookie } from "../../utils/manage-cookie";
interface AuthState {
    isProcessing: boolean
    isAuthenticating: boolean
    error: null | string
    token: string | null
    user: User
    isExpired: boolean //token expired
}
const initialUser: User = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student"
}

const initialState: AuthState = {
    isProcessing: false,
    isAuthenticating: false,
    error: null,
    token: null,
    user: initialUser,
    isExpired: false
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

export const signup = createAsyncThunk(
    "signup",
    async (user: User, { rejectWithValue, dispatch }) => {
        try {
            console.log(user)
            const res = await apiHelper(`${SERVER_URL}/auth/signup`, {
                method: "POST",
                body: user,
            });
            console.log(res)

            if (res.message) {
                const message: Message = {
                    messages: res.message,
                    id: Date.now(),
                    type: "success",
                };
                (dispatch as AppDispatch)(setMessageWithTimeout(message, 4000));
                removeCookie("user")
                removeCookie("token")
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


export const verifyEmail = createAsyncThunk(
    "verifyEmail",
    async (token: string, { rejectWithValue, dispatch }) => {
        try {
            const res = await apiHelper(
                `${SERVER_URL}/auth/verify-email/${token}`,
                {
                    method: "POST",
                    body: {
                        deviceDetails: JSON.stringify(getNavigatorDetails())
                    }
                }
            )
            console.log(res)
            if (res) {
                if (res.isExpired) {
                    const message: Message = {
                        messages: res.message,
                        id: Date.now(),
                        type: "info",
                    };
                    (dispatch as AppDispatch)(setMessageWithTimeout(message, 4000));
                    return {
                        isExpired: res.isExpired,
                        token: null,
                        user: null
                    }
                }
                const message: Message = {
                    messages: res.message,
                    id: Date.now(),
                    type: "success",
                };
                (dispatch as AppDispatch)(setMessageWithTimeout(message, 4000));

                setCookie("token", res.token, expires)
                setCookie("user", res.user, expires)
                return {
                    isExpired: false,
                    token: res.token,
                    user: res.user
                }
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const login = createAsyncThunk(
    "login",
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const res = await apiHelper(`${SERVER_URL}/auth/login`, {
                method: "POST",
                body: {
                    email: email,
                    password: password
                },
            }); 
            //remove old user and token cookie if exists
            removeCookie("user")
            removeCookie("token")
            setCookie("token", res.token, expires)
            setCookie("user", res.user, expires)

            return {
                token: res.token,
                user: res.user,
            };
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const resendVerificationLink = createAsyncThunk(
    "resendVerificationLink",
    async (email: string, { rejectWithValue, dispatch }) => {
        try {
            const res = await apiHelper(`${SERVER_URL}/auth/verification-link/resend`, {
                body: {
                    email
                }
            })
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

export type EditableUserFields = Omit<User, "id" | "profilePicture">;

type FieldValue<K extends keyof EditableUserFields> = EditableUserFields[K] extends Roles | null ? Roles : string

const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            setFields<K extends keyof EditableUserFields>(
                state: AuthState,
                action: PayloadAction<{ field: K; value: FieldValue<K> }>
            ) {
                const { field, value } = action.payload;
                (state.user as any)[field] = value;
            },
            setUser(state, action: PayloadAction<User>) {
                state.user = action.payload
            },
            setToken(state, action: PayloadAction<string>) {
                state.token = action.payload
            }

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
                .addCase(signup.fulfilled, (state) => {

                    state.error = null
                    state.isProcessing = false
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
            //email verify
            builder.addCase(verifyEmail.pending, (state) => {
                state.isProcessing = true
                state.isAuthenticating = true
            })
                .addCase(verifyEmail.rejected, (state, action) => {
                    state.error = action.payload as string
                    state.isProcessing = false
                    state.isAuthenticating = false
                })
                .addCase(verifyEmail.fulfilled, (state, action: PayloadAction<{ token: string | null, user: User | null, isExpired: boolean | null } | undefined>) => {
                    if (action.payload) {
                        const { token, user } = action.payload;
                        state.error = null;
                        state.isProcessing = false;
                        state.token = token;
                        state.user = user!;
                        state.isAuthenticating = false
                    } else {
                        state.error = "Verification failed: No payload received.";
                        state.isProcessing = false;
                        state.isAuthenticating = false
                    }
                })

            //resend verification link
            builder.addCase(resendVerificationLink.pending, (state) => {
                state.isProcessing = true
            })
                .addCase(resendVerificationLink.rejected, (state, action) => {
                    state.error = action.payload as string
                    state.isProcessing = false
                })
                .addCase(resendVerificationLink.fulfilled, (state) => {
                    state.error = null
                    state.isProcessing = false

                })
        }
    }
)
export const { setFields, setToken, setUser } = authSlice.actions
export default authSlice.reducer