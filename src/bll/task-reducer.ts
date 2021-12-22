import {taskApi, TaskStatuses, TaskType} from '../api/task-api'
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolist-reducer'
import {Dispatch} from 'redux'
import {AppRootStateType} from './store'


export type TasksType = {
    [id: string]: TaskType[]
}
type ActionsType =
    AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState = {} as TasksType

export const taskReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'SET-TASKS': {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId
                        ? {...t, status: action.status}
                        : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId
                        ? {...t, title: action.title}
                        : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                [action.todolist.id]: [],
                ...state
            }
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default:
            return state
    }
}

export type SetTasksActionType = ReturnType<typeof setTasks>

export const setTasks = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        todolistId,
        tasks
    } as const
}

export type AddTaskActionType = ReturnType<typeof addTask>

export const addTask = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const
}

export type RemoveTaskActionType = ReturnType<typeof removeTask>

export const removeTask = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistID: todolistId,
        taskID: taskId,
    } as const
}

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>

export const changeTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistId,
        taskId,
        status,
    } as const
}

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>

export const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todolistId,
        taskId,
        title,
    } as const
}

// THUNK
export const fetchTasks = (todolistId: string) => (dispatch: Dispatch): void => {
    taskApi.getTasks(todolistId)
        .then(response => response.data.items)
        .then(items => {
            dispatch(setTasks(todolistId, items))
        })
}

export const createTask = (todolistId: string, title: string) => (dispatch: Dispatch): void => {
    taskApi.createTask(todolistId, title)
        .then(response => {
            dispatch(addTask(response.data.data.item))
        })
}

export const deleteTask = (todolistId: string, taskId: string) => (dispatch: Dispatch): void => {
    taskApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTask(todolistId, taskId))
        })
}

export const updateTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const allTasksFromState = getState().tasks
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)

        if (task) {
            taskApi.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            })
                .then(() => {
                    dispatch(changeTaskStatus(todolistId, taskId, status))
                })
        }
    }
}

export const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const allTasksFromState = getState().tasks
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)

        if (task) {
            taskApi.updateTask(todolistId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            })
                .then(() => {
                    dispatch(changeTaskTitle(todolistId, taskId, title))
                })
        }
    }
}