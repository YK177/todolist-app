import {TasksType} from '../App';
import {v1} from 'uuid';

export const TasksReducer = (state: TasksType, action: ActionType) => {
    switch (action.type) {
        case 'DELETE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)
            }

        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistID]: [
                    {id: v1(), title: action.newTitle, isDone: false},
                    ...state[action.todolistID]]
            }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(task => task.id === action.taskID
                        ? {...task, isDone: action.isDone}
                        : task)
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(task => task.id === action.taskID
                        ? {...task, title: action.newTitle}
                        : task)
            }

        case 'ADD-TASKS-FOR-NEW-TODOLIST':
            return {
                ...state,
                [action.newTodolistID]: []
            }

        default:
            return state
    }
}

type ActionType =
    DeleteTaskACType
    | AddTaskAC
    | ChangeTasksStatusACType
    | ChangeTaskTitleAC
    | AddTasksForNewTodolistACType

type DeleteTaskACType = ReturnType<typeof deleteTaskAC>

export const deleteTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'DELETE-TASK',
        todolistID: todolistID,
        taskID: taskID
    } as const
}

type AddTaskAC = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        todolistID: todolistID,
        newTitle: newTitle
    } as const
}

type ChangeTasksStatusACType = ReturnType<typeof changeTasksStatusAC>

export const changeTasksStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistID: todolistID,
        taskID: taskID,
        isDone: isDone
    } as const
}

type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (taskID: string, newTitle: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskID: taskID,
        newTitle: newTitle,
        todolistID: todolistID
    } as const
}

type AddTasksForNewTodolistACType = ReturnType<typeof addTasksForNewTodolistAC>

export const addTasksForNewTodolistAC = (newTodolistID: string) => {
    return {
        type: 'ADD-TASKS-FOR-NEW-TODOLIST',
        newTodolistID: newTodolistID
    } as const
}