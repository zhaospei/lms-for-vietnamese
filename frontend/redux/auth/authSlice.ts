import { createSlice } from "@reduxjs/toolkit";
import { updateAuthState } from "./actions/changeAuthState";

export interface AuthState {
    signedIn?: boolean,
    logging: boolean,
    role?: "admin" | "user",
    studentId: string,
    name?: string,
    avtLink?: string,
    book?: number,
}

const initialState: AuthState = {
    signedIn: false,
    logging: true,
    role: "user",
    studentId: '',
    book: 0
}

export const {reducer: authReducer, actions: authActions} = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuthState
    }
})
