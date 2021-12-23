import {todolistApi, TodolistType} from '../api/todolist-api'
import {AppThunkType} from './store'

const initialState = [] as TodolistDomainType[]

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.todolistId
                ? {...tl, filter: action.value}
                : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId
                ? {...tl, title: action.title}
                : tl)
        default:
            return state
    }
}

// ACTIONS
export const setTodolists = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists,} as const)
export const addTodolist = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist,} as const)
export const removeTodolist = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId,} as const)
export const changeFilter = (todolistId: string, value: FilterValueType,) => ({
    type: 'CHANGE-FILTER',
    todolistId,
    value,
} as const)
export const changeTodolistTitle = (todolistId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    title,
} as const)

// THUNK
export const fetchTodolists = (): AppThunkType => async dispatch => {
    const response = await todolistApi.getTodolists()
    dispatch(setTodolists(response.data))
}
export const deleteTodolist = (todolistID: string): AppThunkType => async dispatch => {
    await todolistApi.deleteTodolist(todolistID)
    dispatch(removeTodolist(todolistID))
}
export const createTodolist = (title: string): AppThunkType => async dispatch => {
    const response = await todolistApi.createTodolist(title)
    dispatch(addTodolist(response.data.data.item))
}
export const updateTodolistTitle = (todolistId: string, title: string): AppThunkType => async dispatch => {
    await todolistApi.updateTodolistTitle(todolistId, title)
    dispatch(changeTodolistTitle(todolistId, title))
}

// TYPES
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}

export type SetTodolistsActionType = ReturnType<typeof setTodolists>
export type AddTodolistActionType = ReturnType<typeof addTodolist>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolist>

export type TodolistsActionsType =
    | SetTodolistsActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ReturnType<typeof changeFilter>
    | ReturnType<typeof changeTodolistTitle>
