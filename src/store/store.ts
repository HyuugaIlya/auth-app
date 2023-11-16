import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { userSlice } from "./slices/userSlice"

const rootReducer = combineReducers({
    userPage: userSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch