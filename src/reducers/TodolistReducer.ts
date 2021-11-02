import {FilterValueType, TodolistType} from '../App';

export const TodolistReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'DELETE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistID)

        case 'ADD-TODOLIST':
            const newTodolist = {id: action.newTodolistID, title: action.newTitle, filter: action.filter}
            return [newTodolist, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.todolistID
                ? {...todolist, title: action.newTitle}
                : todolist)

        case 'CHANGE-FILTER':
            return state.map(todolist => todolist.id === action.todolistID
                ? {...todolist, filter: action.filterValue}
                : todolist)

        default:
            return state
    }
}

type ActionType = DeleteTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeFilterACType

type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>

export const deleteTodolistAC = (todolistID: string) => {
    return {
        type: 'DELETE-TODOLIST',
        todolistID: todolistID
    } as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (newTodolistID: string, newTitle: string, filter: FilterValueType) => {
    return {
        type: 'ADD-TODOLIST',
        newTodolistID: newTodolistID,
        newTitle: newTitle,
        filter: filter
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistID: todolistID,
        newTitle: newTitle
    } as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todolistID: string, filterValue: FilterValueType) => {
    return {
        type: 'CHANGE-FILTER',
        todolistID: todolistID,
        filterValue: filterValue
    } as const
}