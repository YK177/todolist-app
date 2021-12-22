import {axiosInstance, ResponseType} from './api-config'
import {AxiosResponse} from 'axios'

export const taskApi = {
    getTasks(todolistId: string) {
        return axiosInstance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return axiosInstance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, tasksId: string) {
        return axiosInstance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${tasksId}`)
    },
    updateTask(todolistId: string, tasksId: string, model: UpdateTaskModelType) {
        return axiosInstance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${tasksId}`, model)
    },
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
    id: string
    todoListId: string
    order: number
}

type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}