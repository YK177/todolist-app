import {AxiosResponse} from 'axios'
import {axiosInstance, ResponseType} from './api-config'

export const todolistApi = {
    getTodolists() {
        return axiosInstance.get<TodolistType[]>('todo-lists',)
    },
    createTodolist(title: string) {
        return axiosInstance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return axiosInstance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return axiosInstance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title})
    },
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}