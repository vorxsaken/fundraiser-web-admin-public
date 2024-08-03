import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { fetchWithToken } from "../lib/utils";
import { API_URL } from "../lib/variables";
import { stateType } from ".";

export interface siswaStoreType {
  id: number;
  nama: string;
  password: string;
  nis: string;
  kelas: string;
  tingkat: string;
  angkatan: string;
  alamat: string;
  no_telp: string;
  email: string;
  foto?: string | null;
  role: string;
}

const siswaAdapter = createEntityAdapter({
  sortComparer: (a: siswaStoreType, b: siswaStoreType) =>
    a.nama.localeCompare(b.nama),
});

const initialState = siswaAdapter.getInitialState({
  loading: true,
  error: null,
});

export const fetchSiswa = createAsyncThunk("/fetchSiwa", async () => {
  const user = await fetchWithToken(`${API_URL}/api/user/read/siswa`);
  return user.json;
});

const siswaSlices = createSlice({
  name: "siswa",
  initialState,
  reducers: {
    addSiswa: siswaAdapter.addOne,
    updateSiswa: siswaAdapter.updateOne,
    removeSiswa: siswaAdapter.removeOne,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSiswa.fulfilled, (state, actions) => {
        siswaAdapter.upsertMany(state, actions.payload);
        state.loading = false;
      })
      .addCase(fetchSiswa.rejected, (state, actions) => {
        state.error = actions.error as any;
        state.loading = false;
      });
  },
});

export default siswaSlices.reducer;

export const {
  selectAll: selectAllSiswa,
  selectById: selectSiswaById,
  selectIds: selectSiswaId,
} = siswaAdapter.getSelectors((state: stateType) => state.siswa);

export const { addSiswa, removeSiswa, updateSiswa } = siswaSlices.actions;
