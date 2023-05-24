import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../api/api";
import {AuthDataType} from "../../types/types";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type initialStateType = {
    isLoggedIn: boolean
    status: RequestStatusType
    error: string | null
    token: string
}

export const initialState: initialStateType = {
    isLoggedIn: false,
    status: 'idle',
    error: null,
    token: ''
}
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        },
        setStatus(state: initialStateType, action: PayloadAction<RequestStatusType>) {
            state.status = action.payload
        },
        setError(state: initialStateType, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
        setToken(state: initialStateType, action: PayloadAction<string>) {
            state.token = action.payload
        },
    }
})

export const login = createAsyncThunk(
    'app/login',
    async (authData: AuthDataType, {dispatch}) => {
        try {
            const response = await authAPI.login(authData)
            localStorage.setItem('tokenInfo', JSON.stringify(response.data))
            dispatch(setToken(response.data.access_token))
        } catch (error: any) {
            dispatch(setError(error.message))
        }
    }
)


export const {
    setIsLoggedIn,
    setStatus,
    setError,
    setToken
} = appSlice.actions

export default appSlice.reducer