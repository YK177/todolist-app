import {todolistApi, TodolistType} from '../api/todolist-api'
import {Dispatch} from 'redux'


export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}

type ActionsType =
    AddTodolistActionType
    | RemoveTodolistActionType
    | ChangeFilterActionType
    | ChangeTodolistTitleActionType
    | SetTodolistsActionType

const initialState = [] as TodolistDomainType[]

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        case 'ADD-TODOLIST': {
            return [
                {...action.todolist, filter: 'all'},
                ...state
            ]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'CHANGE-FILTER': {
            return state.map(tl => tl.id === action.todolistId
                ? {...tl, filter: action.value}
                : tl)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todolistId
                ? {...tl, title: action.title}
                : tl)
        }
        default:
            return state
    }
}

export type SetTodolistsActionType = ReturnType<typeof setTodolists>

export const setTodolists = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const
}

export type AddTodolistActionType = ReturnType<typeof addTodolist>

export const addTodolist = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    } as const
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolist>

export const removeTodolist = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId,
    } as const
}

export type ChangeFilterActionType = ReturnType<typeof changeFilter>

export const changeFilter = (todolistId: string, value: FilterValueType) => {
    return {
        type: 'CHANGE-FILTER',
        todolistId,
        value,
    } as const
}

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitle>

export const changeTodolistTitle = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId,
        title,
    } as const
}

// THUNK
export const fetchTodolists = () => (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then(response => {
            dispatch(setTodolists(response.data))
        })
}

export const deleteTodolist = (todolistID: string) => (dispatch: Dispatch): void => {
    todolistApi.deleteTodolist(todolistID)
        .then(() => {
            dispatch(removeTodolist(todolistID))
        })
}

export const createTodolist = (title: string) => (dispatch: Dispatch): void => {
    todolistApi.createTodolist(title)
        .then(response => {
            dispatch(addTodolist(response.data.data.item))
        })
}

export const updateTodolistTitle = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.updateTodolistTitle(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitle(todolistId, title))
        })
}