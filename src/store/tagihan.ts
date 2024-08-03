import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchWithToken } from "../lib/utils";
import { API_URL } from "../lib/variables";
import { stateType } from ".";

export interface tagihanType {
    id: number,
    judul_tagihan: string,
    total_tagihan: number,
    tenggat_waktu: string,
    userId: number,
    status: 'LUNAS' | 'BELUM_LUNAS',
}

const tagihanAdapter = createEntityAdapter({
    sortComparer: (a: tagihanType, b: tagihanType) => a.judul_tagihan.localeCompare(b.judul_tagihan)
})

const initialState = tagihanAdapter.getInitialState({
    loading: true,
    error: null
})

export const fetchTagihan = createAsyncThunk('/fetchTagihan', async (id: string) => {
    const res = await fetchWithToken(`${API_URL}/api/tagihan/read/admin/${id}`)
    return res.json
})

const tagihanSlice = createSlice({
    name: 'tagihan',
    initialState,
    reducers: {
        addTagihan: tagihanAdapter.addOne,
        updateTagihan: tagihanAdapter.updateOne,
        removeTagihan: tagihanAdapter.removeOne,
        resetTagihan: tagihanAdapter.removeAll
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTagihan.pending, (state, actions) => {
                state.loading = true;
            })
            .addCase(fetchTagihan.fulfilled, (state, actions) => {
                tagihanAdapter.addMany(state, (actions.payload as any).Tagihan)
                state.loading = false
            })
            .addCase(fetchTagihan.rejected, (state, actions) => {
                state.error = actions.error as any;
                state.loading = false;
            })
    }
})

export const { selectAll: selectAllTagihan, selectById: selectTagihanById } = tagihanAdapter.getSelectors((state: stateType) => state.tagihan)
export const { addTagihan, removeTagihan, updateTagihan, resetTagihan } = tagihanSlice.actions
export default tagihanSlice.reducer






