import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchWithToken } from "../lib/utils";
import { API_URL } from "../lib/variables";
import { stateType } from ".";

interface adminStoreType {
    id: number,
    nama: string,
    password: string,
    alamat: string,
    no_telp: string,
    email: string,
    foto?: string,
    role: string
}

const adminAdapter = createEntityAdapter({
    sortComparer: (a: adminStoreType, b: adminStoreType) => b.nama.localeCompare(a.nama)
})

const initialState = adminAdapter.getInitialState({
    loading: true,
    error: null
})

export const fetchAdmin = createAsyncThunk('/fetchAdmin', async (userId: number) => {
    const { json } = await fetchWithToken(`${API_URL}/api/user/read/admin`);
    const admins = (json as adminStoreType[]).filter(admin => admin.id !== userId)
    return admins;
})

const adminSlices = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        addAdmin: adminAdapter.addOne,
        updateAdmin: adminAdapter.updateOne,
        removeAdmin: adminAdapter.removeOne,
    },
    extraReducers(builder) {
        builder.addCase(fetchAdmin.fulfilled, (state, actions) => {
            adminAdapter.upsertMany(state, actions.payload)
            state.loading = false
        }).addCase(fetchAdmin.rejected, (state, actions) => {
            state.error = actions.error as any;
            state.loading = false;
        })
    }
})

export default adminSlices.reducer;

export const {
    selectAll: selectAllAdmin,
    selectById: selectAdminById,
    selectIds: selectAdminId
} = adminAdapter.getSelectors((state: stateType) => state.admin)

export const { addAdmin, removeAdmin, updateAdmin } = adminSlices.actions