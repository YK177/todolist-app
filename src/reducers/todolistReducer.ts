import {FilterValueType, TodolistType} from '../App';

export const todolistReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'DELETE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.id)

        case 'ADD-TODOLIST':
            return [{id: action.id, title: action.title, filter: 'all'}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.id
                ? {...todolist, title: action.title}
                : todolist)

        case 'CHANGE-FILTER':
            return state.map(todolist => todolist.id === action.id
                ? {...todolist, filter: action.filter}
                : todolist)

        default:
            return state
    }
}

type ActionsType = DeleteTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeFilterActionType

type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>

export const deleteTodolistAC = (todolistID: string) => {
    return {
        type: 'DELETE-TODOLIST',
        id: todolistID
    } as const
}

type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (newTodolistID: string, newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        id: newTodolistID,
        title: newTitle
    } as const
}

type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistID,
        title: newTitle
    } as const
}

type ChangeFilterActionType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todolistID: string, filterValue: FilterValueType) => {
    return {
        type: 'CHANGE-FILTER',
        id: todolistID,
        filter: filterValue
    } as const
}