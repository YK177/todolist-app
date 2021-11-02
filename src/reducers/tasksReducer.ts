import {TasksType} from '../App';
import {v1} from 'uuid';

export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'DELETE-TASK':
            return {
                ...state,
                [action.id]: state[action.id].filter(task => task.id !== action.taskID)
            }

        case 'ADD-TASK':
            return {
                ...state,
                [action.id]: [
                    {id: v1(), title: action.title, isDone: false},
                    ...state[action.id]]
            }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.id]: state[action.id]
                    .map(task => task.id === action.taskID
                        ? {...task, isDone: action.isDone}
                        : task)
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.id]: state[action.id]
                    .map(task => task.id === action.taskID
                        ? {...task, title: action.title}
                        : task)
            }

        case 'ADD-TASKS-FOR-NEW-TODOLIST':
            return {...state, [action.id]: []}

        default:
            return state
    }
}

type ActionsType =
    DeleteTaskActionType
    | AddTaskActionType
    | ChangeTasksStatusActionType
    | ChangeTaskTitleActionType
    | AddTasksForNewTodolistActionType

type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>

export const deleteTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'DELETE-TASK',
        id: todolistID,
        taskID: taskID
    } as const
}

type AddTaskActionType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        id: todolistID,
        title: newTitle
    } as const
}

type ChangeTasksStatusActionType = ReturnType<typeof changeTasksStatusAC>

export const changeTasksStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id: todolistID,
        taskID: taskID,
        isDone: isDone
    } as const
}

type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (taskID: string, newTitle: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskID: taskID,
        title: newTitle,
        id: todolistID
    } as const
}

type AddTasksForNewTodolistActionType = ReturnType<typeof addTasksForNewTodolistAC>

export const addTasksForNewTodolistAC = (newTodolistID: string) => {
    return {
        type: 'ADD-TASKS-FOR-NEW-TODOLIST',
        id: newTodolistID
    } as const
}