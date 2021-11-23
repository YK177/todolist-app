import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, todolistID_1, todolistID_2} from './todolist-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
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

const initialState = {
    [todolistID_1]: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ],
    [todolistID_2]: [
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Bread', isDone: false},
        {id: v1(), title: 'Salt', isDone: true},
    ],
} as TasksType

export const taskReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistID]: [
                    {id: v1(), title: action.title, isDone: false},
                    ...state[action.todolistID]
                ]
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
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID
                        ? {...t, isDone: action.isDone}
                        : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID
                        ? {...t, title: action.newTitle}
                        : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                [action.newTodolistID]: [],
                ...state
            }
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistID]
            return stateCopy
        }
        default:
            return state
    }
}

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        todolistID,
        title,
    } as const
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistID,
        taskID,
    } as const
}

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistID,
        taskID,
        isDone,
    } as const
}

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (todolistID: string, taskID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todolistID,
        taskID,
        newTitle,
    } as const
}