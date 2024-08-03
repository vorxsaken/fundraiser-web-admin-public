import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Storage, Drivers } from "@ionic/storage";
import { API_URL, secret } from "./variables";
import Compressor from "compressorjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { jwtVerify } from 'jose'
import CryptoJS from 'crypto-js'
import { Preferences } from "@capacitor/preferences";
import { LocalNotifications } from "@capacitor/local-notifications"
import { Toast } from "@capacitor/toast";

// types interfaces
interface checkAuthReturnType { isAuthenticated: boolean, status: string, error?: any, id?: string };
interface successLoginRes { message: string, JWT: string, id: string };
interface fetchWithTokenReturnType { status: number, json: { message?: string } }

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function fetchWithToken(url: string, body?: any): Promise<fetchWithTokenReturnType> {
    return new Promise(async (resolve, reject) => {
        const token = await Preferences.get({ key: 'token_admin' });
        const bodyWithToken = {
            token: token.value?.toString(),
            ...body
        }

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(bodyWithToken)
            }).catch(err => { throw err })

            const jsonData = await res.json();
            resolve({ status: res.status, json: jsonData })
        } catch (error) {
            reject(error)
        }
    })
}

export const checkAuth = async (): Promise<checkAuthReturnType> => {
    let status, id: any = null;
    let isAuthenticated = false;
    let token = await Preferences.get({ key: "token_admin" });
    let secretKey = new TextEncoder().encode(secret);

    return new Promise((resolve, reject) => {
        fetchWithToken(`${API_URL}/api/user/read/siswa`).then(async (res) => {
            status = 'fullfilled'
            if (res.status === 200) {
                isAuthenticated = true;
                let { payload } = await jwtVerify(token.value?.toString() as string, secretKey);
                id = payload.id;
            }
            resolve({ isAuthenticated, status, error: res.json.message, id });
        }).catch((error) => {
            reject({ isAuthenticated, status: 'fullfilled with error', error });
        })
    })
}

export async function signIn(username: string, password: string) {
    const sess = await fetch(API_URL + '/api/user/read/signinadmin', {
        method: 'POST',
        body: JSON.stringify({
            'username': username,
            'password': password,
        })
    });

    const result = await sess.json() as successLoginRes;
    return { result, status: sess.status }
}

export async function signOut() {
    await Preferences.remove({ key: 'token_admin' });
}

export const parseCurrency = (number: number) => new Intl.NumberFormat('de-DE').format(number);
export const parseDate = (text: string) => {
    const date = new Date(text);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const getMonthString = (month: number) => {
    const monthStrings = {
        1: 'Januari',
        2: 'Februari',
        3: 'Maret',
        4: 'April',
        5: 'Mei',
        6: 'Juni',
        7: 'Juli',
        8: 'Agustus',
        9: 'September',
        10: 'Oktober',
        11: 'November',
        12: 'Desember'
    }
    const monthKey = month as keyof typeof monthStrings
    return monthStrings[monthKey];
}

export const standartDate = (date: string) => {
    const dateString = parseDate(date);
    const dateArray = dateString.split('/');
    dateArray[1] = getMonthString(parseInt(dateArray[1]));
    return dateArray.join(' ');
}

export const compressImage = (file: File): Promise<File | Blob> => {
    return new Promise((resolve) => {
        new Compressor(file, {
            quality: 0.6,
            width: 800,
            success(res) {
                resolve(res)
            }
        })
    })
}

export const uploadImagesToFirebase = (image: any) => {
    return new Promise((resolve, reject) => {
        const imageRef = ref(storage, `images/${Date.now()}-smk-csk`);
        uploadBytes(imageRef, image).then(async () => {
            const imageUrl = await getDownloadURL(imageRef);
            resolve(imageUrl)
        }).catch(error => reject(error))
    })
}

export const decryptPassword = (encryptPassword: string) => {
    const decrypt = CryptoJS.AES.decrypt(encryptPassword, secret).toString(CryptoJS.enc.Utf8)
    return decrypt
}

export const sendLocalNotification = async (title: string, description: string) => {
    await LocalNotifications.schedule({
        notifications: [
            {
                title,
                body: description,
                id: 1,
                schedule: { at: new Date(Date.now() + 100) },
                actionTypeId: '',
                extra: null,
            },
        ],
    });
}

export const showToast = async (text: string) => {
    await Toast.show({
        text,
        duration: "long"
    })
}