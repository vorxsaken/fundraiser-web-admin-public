import { z } from 'zod';

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const EMAIL_ERROR_MSG = 'Email tidak valid'
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
const PASSWORD_ERROR_MSG = 'Password harus memiliki minimal 1 karakter besar, kecil dan angka';
const MAX_FILE_SIZE = 500000;
const ACC_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const loginSchema = z.object({
    username: z.string()
        .refine((string) => string !== '', 'Username tidak boleh kosong')
        .refine((string) => string.length >= 3, 'Panjang karakter username minimal 3'),
    password: z.string().refine(str => str !== '', 'Password tidak boleh kosong').refine(str => PASSWORD_PATTERN.test(str), PASSWORD_ERROR_MSG)
})

export const siswaSchema = z.object({
    nama: z.string().refine((string) => string !== '', 'Nama tidak boleh kosong').refine((string) => string.length >= 3, 'Panjang karakter minimal 3'),
    password: z.string().refine(str => str !== '', 'Password tidak boleh kosong').refine(str => PASSWORD_PATTERN.test(str), PASSWORD_ERROR_MSG),
    nis: z.string().refine((string) => string !== '', 'Nis tidak boleh kosong').refine((string) => string.length >= 10, 'Panjang karakter minimal 10'),
    kelas: z.string().refine((string) => string !== '', 'Kelas tidak boleh kosong').refine((string) => string.length >= 3, 'Panjang karakter minimal 3'),
    tingkat: z.string().refine((string) => string !== '', 'Tingkat tidak boleh kosong').refine((string) => string.length >= 1, 'Panjang karakter minimal 1'),
    angkatan: z.string().refine((string) => string !== '', 'Angkatan tidak boleh kosong').refine((string) => string.length >= 9, 'Panjang karakter minimal 9'),
    alamat: z.string().refine((string) => string !== '', 'Alamat tidak boleh kosong').refine((string) => string.length >= 10, 'Panjang karakter minimal 10'),
    no_telp: z.string().refine((string) => string !== '', 'No Telp tidak boleh kosong').refine((string) => string.length >= 10, 'Panjang karakter minimal 10'),
    email: z.string().refine((string) => string !== '', 'Email tidak boleh kosong').refine((string) => EMAIL_PATTERN.test(string), EMAIL_ERROR_MSG),
    foto: z
        .any()
        .refine((file) => file != null, "Foto tidak boleh kosong")
        .refine((file) => {
            if (typeof file === 'string') return true;
            if (file?.size <= MAX_FILE_SIZE) return true;
        }, 'Ukuran  maksimal foto 5 mb')
        .refine((file) => {
            if (typeof file === 'string') return true;
            if (ACC_IMAGE_TYPES.includes(file?.type)) return true;
        }, 'Format file foto harus: .jpg, .jpeg, .png and .webp'),
})

export const adminSchema = z.object({
    nama: z.string().refine((string) => string !== '', 'Nama tidak boleh kosong').refine((string) => string.length >= 3, 'Panjang karakter minimal 3'),
    password: z.string().refine(str => str !== '', 'Password tidak boleh kosong').refine(str => PASSWORD_PATTERN.test(str), PASSWORD_ERROR_MSG),
    alamat: z.string().refine((string) => string !== '', 'Alamat tidak boleh kosong').refine((string) => string.length >= 10, 'Panjang karakter minimal 10'),
    no_telp: z.string().refine((string) => string !== '', 'No Telp tidak boleh kosong').refine((string) => string.length >= 10, 'Panjang karakter minimal 10'),
    email: z.string().refine((string) => string !== '', 'Email tidak boleh kosong').refine((string) => EMAIL_PATTERN.test(string), EMAIL_ERROR_MSG),
    foto: z
        .any()
        .refine((file) => file != null, "Foto tidak boleh kosong")
        .refine((file) => {
            if (typeof file === 'string') return true;
            if (file?.size <= MAX_FILE_SIZE) return true;
        }, 'Ukuran  maksimal foto 5 mb')
        .refine((file) => {
            if (typeof file === 'string') return true;
            if (ACC_IMAGE_TYPES.includes(file?.type)) return true;
        }, 'Format file foto harus: .jpg, .jpeg, .png and .webp'),
})

export const tagihanSchema = z.object({
    judul_tagihan: z.string().refine((string) => string !== '', 'Judul Tagihan tidak boleh kosong').refine((string) => string.length >= 5, 'Panjang karakter minimal 5'),
    total_tagihan: z.string().refine((num) => num !== '', 'Total tagihan tidak boleh kosong').refine((num) => parseInt(num) >= 10000, 'Tagihan harus lebih dari 10000'),
    tenggat_waktu: z.date({required_error: 'Tenggat waktu tidak boleh kosong'}),
    status: z.union([z.object({name: z.string()}), z.enum(["LUNAS", "BELUM LUNAS"]), z.string()])
})

export type adminSchemaType = z.infer<typeof adminSchema>
export type siswaSchemaType = z.infer<typeof siswaSchema>
export type loginSchemaType = z.infer<typeof loginSchema>
export type tagihanSchemaType = z.infer<typeof tagihanSchema>

