import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b44c493a-a90f-4242-9a95-17cc58fddd62'
    },
})

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsError: string[]
    data: T
}