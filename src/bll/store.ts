import {applyMiddleware, combineReducers, createStore} from 'redux'
import {todolistReducer, TodolistsActionsType} from './todolist-reducer'
import {taskReducer, TasksActionsType} from './task-reducer'
import thunk, {ThunkAction} from 'redux-thunk'

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = TodolistsActionsType | TasksActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>