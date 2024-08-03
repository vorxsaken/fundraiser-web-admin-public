import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithToken } from "../lib/utils";
import { API_URL } from "../lib/variables";

interface userStoreType {
    user: {
        id: number,
        nama: string,
        password: string,
        alamat: string,
        no_telp: string,
        email: string,
        foto?: string,
        role: string
    } | null,
    loading: boolean,
    error: any
}

const initialState: userStoreType = {
    user: null,
    loading: true,
    error: null
}

export const fetchUserInfo = createAsyncThunk('/fetchUser', async (userId: string) => {
    const user = await fetchWithToken(`${API_URL}/api/user/read`, {id: userId});
    return user.json;
})

const userSlices = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeProfile(state, actions) {
            state.user = { ...actions.payload }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchUserInfo.fulfilled, (state, actions) => {
            state.user = actions.payload as any;
            state.loading = false
        }).addCase(fetchUserInfo.rejected, (state, actions) => {
            state.error = actions.error as any;
            state.loading = false;
        })
    }
})

export default userSlices.reducer;

export const { changeProfile } = userSlices.actions