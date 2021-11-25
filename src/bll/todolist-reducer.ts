import {v1} from 'uuid'

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
type ActionsType =
    AddTodolistActionType
    | RemoveTodolistActionType
    | ChangeFilterActionType
    | ChangeTodolistTitleActionType

export const todolistID_1 = v1()
export const todolistID_2 = v1()

const initialState = [
    {id: todolistID_1, title: 'What to learn', filter: 'all'},
    {id: todolistID_2, title: 'What to buy', filter: 'all'},
] as TodolistType[]

export const todolistReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return [
                {id: action.newTodolistID, title: action.title, filter: 'all'},
                ...state
            ]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistID)
        }
        case 'CHANGE-FILTER': {
            return state.map(tl => tl.id === action.todolistID
                ? {...tl, filter: action.value}
                : tl)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todolistID
                ? {...tl, title: action.newTitle}
                : tl)
        }
        default:
            return state
    }
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title,
        newTodolistID: v1(),
    } as const
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistID,
    } as const
}

export type ChangeFilterActionType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todolistID: string, value: FilterValueType) => {
    return {
        type: 'CHANGE-FILTER',
        todolistID,
        value,
    } as const
}

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistID,
        newTitle,
    } as const
}