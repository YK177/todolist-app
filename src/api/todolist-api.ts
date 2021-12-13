import {axiosInstance, CommonResponseType} from './api-config'

export const todolistApi = {
    getTodos() {
        return axiosInstance.get<TodoType[]>('todo-lists',)
    },
    createTodo(title: string) {
        return axiosInstance.post<CommonResponseType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return axiosInstance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return axiosInstance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },
}

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}