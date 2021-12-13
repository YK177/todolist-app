import {axiosInstance, CommonResponseType} from './api-config'

export const taskApi = {
    getTasks(todolistId: string) {
        return axiosInstance.get<ResponseTaskType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return axiosInstance.post<CommonResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, tasksId: string) {
        return axiosInstance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${tasksId}`)
    },
    updateTask(todolistId: string, tasksId: string, model: UpdateTaskType) {
        return axiosInstance.put<CommonResponseType>(`todo-lists/${todolistId}/tasks/${tasksId}`, model)
    },
}

type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
    id: string
    todoListId: string
    order: number
}

type ResponseTaskType = {
    items: TaskType[]
    totalCount: number
    error: string
}

type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}