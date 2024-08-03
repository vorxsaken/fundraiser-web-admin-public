import { fetchWithToken } from "./utils";

export async function useSendForm<T>(addUrl: string, editUrl: string, isEdit: boolean, body: any): Promise<{ result: T | null, error: any | null }> {
    try {
        const result = await fetchWithToken(isEdit ? editUrl : addUrl, { ...body })
        return { result: result.json as T, error: null }
    } catch (error) {
        return { result: null, error }  
    }
}