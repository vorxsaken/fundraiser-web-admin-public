import { configureStore } from "@reduxjs/toolkit";
import siswa from "./siswa";
import pembayaran from './pembayaran';
import tagihan from "./tagihan";
import admin from "./admin";
import user from "./user";

const store = configureStore({
    reducer: {
        user,
        admin,
        siswa,
        pembayaran,
        tagihan
    }
})

export default store;
export const state =  store.getState();
export type stateType = typeof state;
export const { dispatch } = store;