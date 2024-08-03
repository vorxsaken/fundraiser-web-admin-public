import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchWithToken } from "../lib/utils";
import { API_URL } from "../lib/variables";
import { stateType } from ".";

export interface pembayaranType {
    id: number,
    userId: number,
    tagihanId: number,
    nominal: number,
    tanggal_bayar: string,
    metode_bayar: string,
    bank: string,
    Tagihan: {
        judul_tagihan: string
    }
}

const pembayaranAdapter = createEntityAdapter({
    sortComparer: (a: pembayaranType, b: pembayaranType) => b.tanggal_bayar.localeCompare(a.tanggal_bayar)
})

const initialState = pembayaranAdapter.getInitialState({
    loading: true,
    error: null
})

export const fetchPembayaran = createAsyncThunk('/fetchPembayaran', async (id: string) => {
    const pembayaran = await fetchWithToken(`${API_URL}/api/pembayaran/read/admin/${id}`);
    return pembayaran.json;
})

const pembayaranSlice = createSlice({
    name: 'pembayaran',
    initialState,
    reducers: {
        addPembayaran: pembayaranAdapter.addOne,
        updatePembayaran: pembayaranAdapter.updateOne,
        removePembayaran: pembayaranAdapter.removeOne,
        resetPembayaran: pembayaranAdapter.removeAll
    },
    extraReducers(builder){
        builder
        .addCase(fetchPembayaran.pending, (state, actions) => {
            state.loading = true
        })
        .addCase(fetchPembayaran.fulfilled, (state, actions) => {
            pembayaranAdapter.addMany(state, actions.payload)
            state.loading = false;
        })
        .addCase(fetchPembayaran.rejected, (state, actions) => {
            state.error = actions.error as any;
            state.loading = false
        })
    }
})

export default pembayaranSlice.reducer;

export const {
    selectAll: selectAllPembayaran,
    selectById: selectPembayaranById
} = pembayaranAdapter.getSelectors((state: stateType) => state.pembayaran);

export const { addPembayaran, removePembayaran, updatePembayaran, resetPembayaran} = pembayaranSlice.actions