import {
    PayloadAction,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '../store';

type TUser = {
    email: string | null
    id: string | null
    name: string | null
}
const initialState: TUser = {
    email: null,
    id: null,
    name: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<TUser>) {
            state.email = action.payload.email
            state.id = action.payload.id
            state.name = action.payload.name
        },
        removeUser(state) {
            state.email = null
            state.id = null
            state.name = null
        }
    }
});

export const getUserSelector = (state: RootState) => state.userPage;

export const {
    removeUser,
    setUser
} = userSlice.actions;

export default userSlice.reducer;