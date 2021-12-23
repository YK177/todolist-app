import {taskApi, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../api/task-api'
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolist-reducer'
import {AppThunkType} from './store'

const initialState = {} as TasksType

export const taskReducer = (state: TasksType = initialState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'ADD-TODOLIST':
            return {[action.todolist.id]: [], ...state}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default:
            return state
    }
}

// ACTIONS
export const setTasks = (todolistId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS',
    todolistId,
    tasks,
} as const)
export const addTask = (task: TaskType) => ({type: 'ADD-TASK', task,} as const)
export const removeTask = (todolistId: string, taskId: string) => ({
    type: 'REMOVE-TASK',
    todolistID: todolistId,
    taskID: taskId,
} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => ({
    type: 'UPDATE-TASK',
    todolistId,
    taskId,
    model,
} as const)

// THUNK
export const fetchTasks = (todolistId: string): AppThunkType => async dispatch => {
    const response = await taskApi.getTasks(todolistId)
    dispatch(setTasks(todolistId, response.data.items))
}
export const createTask = (todolistId: string, title: string): AppThunkType => async dispatch => {
    const response = await taskApi.createTask(todolistId, title)
    dispatch(addTask(response.data.data.item))
}
export const deleteTask = (todolistId: string, taskId: string): AppThunkType => async dispatch => {
    await taskApi.deleteTask(todolistId, taskId)
    dispatch(removeTask(todolistId, taskId))
}
export const updateTask = (todolistId: string, taskId: string, domainTaskModel: UpdateDomainTaskModelType): AppThunkType => {
    return async (dispatch, getState) => {

        const state = getState()
        const task = state.tasks[todolistId].find(({id}) => id === taskId)

        if (task) {
            const apiTaskModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...domainTaskModel
            }

            await taskApi.updateTask(todolistId, taskId, apiTaskModel)
            dispatch(updateTaskAC(todolistId, taskId, apiTaskModel))
        }
    }
}

// TYPES
export type TasksType = {
    [id: string]: TaskType[]
}

export type TasksActionsType =
    | ReturnType<typeof setTasks>
    | ReturnType<typeof addTask>
    | ReturnType<typeof removeTask>
    | ReturnType<typeof updateTaskAC>
    | SetTodolistsActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}